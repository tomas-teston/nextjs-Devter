import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDky3t78iarlT6OuGZo09Ittr2oE1s0uyE',
  authDomain: 'devter-1de51.firebaseapp.com',
  databaseURL: 'https://devter-1de51.firebaseio.com',
  projectId: 'devter-1de51',
  storageBucket: 'devter-1de51.appspot.com',
  messagingSenderId: '35380521516',
  appId: '1:35380521516:web:06203ebc442675e67bbf89',
  measurementId: 'G-QD8P0HT8JE',
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user;

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;
    onChange(normalizedUser);
  });
};

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();

  return firebase.auth().signInWithPopup(githubProvider);
};

export const addDevit = ({ avatar, content, userId, userName }) => {
  return db.collection('devits').add({
    avatar,
    content,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    shareCount: 0,
  });
};

export const fetchLatestsDevits = () => {
  return db
    .collection('devits')
    .orderBy('createdAt', 'desc')
    .get()
    .then(({ docs }) => {
      return docs.map((doc) => {
        const data = doc.data();
        const id = doc.id;
        const { createdAt } = data;

        return {
          ...data,
          id,
          createdAt: +createdAt.toDate(),
        };
      });
    });
};
