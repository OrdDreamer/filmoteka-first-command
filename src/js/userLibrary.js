import { getDatabase, onValue, push, ref } from 'firebase/database';
import { getAuth } from 'firebase/auth';

export default class UserLibrary {

  constructor(apiService) {
    this.apiService = apiService;
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
      this.libraryData = data ? Object.values(data) : [];
      this.onUpdate();
    });
  }

  addToLibrary(id, watched = false) {
    if (this.libraryData.findIndex(e => e.id === id) !== -1) {
      return;
    }
    push(ref(this.db, 'users/' + this.user.uid + '/library'),
      {
        id,
        watched,
      },
    )
      .then(() => {
        console.log(`Film id:${id} added to library (${watched ? 'watched' : 'queue'}).`);
      })
      .catch((error) => {
        console.log(`Film id:${id} not added to library (${watched ? 'watched' : 'queue'}).`);
      });
  }

  async getWatched(page = 1) {
    const allWatched = this.libraryData.filter((e) => e.watched);
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
    const allQueue = this.libraryData.filter((e) => !e.watched);
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

  onUpdate = () => {
    for (const callback of this.updateCallbacks) {
      callback();
    }
  };
}