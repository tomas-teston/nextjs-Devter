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

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL } = user;

  return {
    avatar: photoURL,
    username: displayName,
    email,
  };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = mapUserFromFirebaseAuthToUser(user);
    onChange(normalizedUser);
  });
};

export const loginWithGithub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider();

  return firebase.auth().signInWithPopup(githubProvider);
};
