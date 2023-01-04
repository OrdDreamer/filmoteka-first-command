import { getDatabase, onValue, push, ref } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const db = getDatabase();

let user = null;
const auth = getAuth();
getAuth().onAuthStateChanged(() => {
  user = auth.currentUser;
});



function getLibraryData() {
  const r = ref(db, 'users/' + user.uid + "/library");
  onValue(r, (snapshot) => {
    const data = snapshot.val();
    console.log(data);
    let markup = "";
    if (data) {
      markup = Object.values(data).map((item) => {
        return `
      <li class="main-list-item">
        <p><b>${item.id}</b></p>
        <p>Wathced: ${item.watched}</p>
      </li>
    `
      }).join("");
    }
    elements.list.innerHTML = markup;
    console.log("Read => Done!");
  });
}



export function addToLibrary(id, watched = false) {
  push(ref(db, 'users/' + user.uid + "/library"),
    {
      id,
      watched
    }
  )
    .then(() => {
      console.log(`Film id:${id} added to library (${watched ? "watched" : "queue"}).`);
    })
    .catch((error) => {
      console.log(`Film id:${id} not added to library (${watched ? "watched" : "queue"}).`);
    });
}