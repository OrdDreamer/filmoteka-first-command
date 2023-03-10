import { getDatabase, onValue, push, ref, remove, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export default class UserLibrary {

  constructor(apiService, notiflix) {
    this.apiService = apiService;
    this.notiflix = notiflix;
    this.updateCallbacks = new Set();
    this.libraryData = [];

    this.db = getDatabase();
    this.user = null;
    this.ref = null;
    this.auth = getAuth();

    this.auth.onAuthStateChanged(() => {
      this.user = this.auth.currentUser;
      if (!this.user) {
        this.unsubscribe();
        this.libraryData = [];
      }
      this.ref = ref(this.db, 'users/' + this.user.uid + '/library');
      this.initLibrary();
    });
  }

  initLibrary() {
    this.unsubscribe = onValue(this.ref, (snapshot) => {
      const data = snapshot.val();
      this.libraryData = data ? Object.entries(data) : [];
      this.onUpdate();
    });
  }

  addToLibrary(id, title, watched = false) {
    if (this.libraryData.findIndex(e => e[1].id === id) !== -1) {
      return;
    }
    push(this.ref,
      {
        id,
        watched,
      }
    )
      .then(() => {
        this.notiflix.showSuccess(`Film "${title}" added to library (${watched ? 'watched' : 'queue'}).`);
      })
      .catch((error) => {
        this.notiflix.showFailure(`Film "${title}" not added to library (${watched ? 'watched' : 'queue'}).`);
      });
  }

  updateInLibrary(id, title, watched = false) {
    const index = this.libraryData.findIndex(e => e[1].id === id);
    if (index === -1) {
      return;
    }
    update(ref(this.db, 'users/' + this.user.uid + '/library/' + this.libraryData[index][0]),
      {
        id,
        watched,
      }
    )
      .then(() => {
        this.notiflix.showSuccess(`Film "${title}" updated in library (${watched ? 'watched' : 'queue'}).`);
      })
      .catch((error) => {
        this.notiflix.showFailure(`Film "${title}" not updated in library (${watched ? 'watched' : 'queue'}).`);
      });
  }

  removeFromLibrary(id, title) {
    const index = this.libraryData.findIndex(e => e[1].id === id);
    if (index === -1) {
      return;
    }
    remove(ref(this.db, 'users/' + this.user.uid + '/library/' + this.libraryData[index][0]))
      .then(() => {
        this.notiflix.showInfo(`Film "${title}" removed from library.`);
      })
      .catch((error) => {
        this.notiflix.showFailure(`Film "${title}" not removed from library.`);
      });
  }

  isWatched(id) {
    return this.libraryData.findIndex((e) => {
      return !!(e[1].id === id && e[1].watched);
    }) !== -1;
  }

  isQueue(id) {
    return this.libraryData.findIndex((e) => {
      return !!(e[1].id === id && !e[1].watched);
    }) !== -1;
  }

  async getWatched(page = 1) {
    const allWatched = this.libraryData
      .filter((e) => e[1].watched)
      .map(e => e[1]);
    const itemsData = allWatched.slice((page - 1) * 20, page * 20);

    const promises = itemsData
      .map((element) => {
        return this.apiService.getFilmInfo(element.id)
          .then((data) => {
            const index = itemsData.findIndex(e => e.id === element.id);
            itemsData[index] = {
              ...data,
              id: element.id,
            };
          });
      });

    return await Promise.all(promises)
      .then(() => {
        return {
          results: itemsData,
          totalResults: allWatched.length,
          page,
          totalPages: Math.ceil(allWatched.length / 20),
        };
      });
  }

  async getQueue(page = 1) {
    const allQueue = this.libraryData
      .filter((e) => !e[1].watched)
      .map(e => e[1]);
    const itemsData = allQueue.slice((page - 1) * 20, page * 20);

    const promises = itemsData
      .map((element) => {
        return this.apiService.getFilmInfo(element.id)
          .then((data) => {
            const index = itemsData.findIndex(e => e.id === element.id);
            itemsData[index] = {
              ...data,
              id: element.id,
            };
          });
      });

    return await Promise.all(promises)
      .then(() => {
        return {
          results: itemsData,
          totalResults: allQueue.length,
          page,
          totalPages: Math.ceil(allQueue.length / 20),
        };
      });
  }

  addListenerOnUpdate(callback) {
    if (typeof callback === 'function') {
      this.updateCallbacks.add(callback);
    }
  }

  removeListenerOnUpdate(callback) {
    if (typeof callback === 'function') {
      this.updateCallbacks.delete(callback);
    }
  }

  onUpdate = () => {
    for (const callback of this.updateCallbacks) {
      callback();
    }
  };
}