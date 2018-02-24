/* global FIREBASE_API_KEY,
          FIREBASE_AUTH_DOMAIN,
          FIREBASE_DATABASE_URL,
          FIREBASE_PROJECT_ID,
          FIREBASE_STORAGE_BUCKET,
          FIREBASE_MESSEGING_SENDER_ID
*/
import firebase from 'firebase';
import {url} from 'config';

const firebaseOptions = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSEGING_SENDER_ID
};

firebase.initializeApp(firebaseOptions);

const provider = new firebase.auth.TwitterAuthProvider();
const database = firebase.database();

window.writeKey = () => {
  const userId = firebase.auth().currentUser.uid;
  console.log(userId); // eslint-disable-line no-console
  database.ref(`users/${userId}`).set({
    foo: 'bar'
  });
};

window.readKey = () => {
  const userId = firebase.auth().currentUser.uid;
  return database.ref(`users/${userId}`).once('value').then(snapshot => {
    console.log(snapshot.val()); // eslint-disable-line no-console
  });
};

// Function writeUserData(userId, photoURL) {
//   firebase.database().ref(`users/${userId}`).set({
//     photo: photoURL
//   });
// }
// window.signInTwitter = () => {
//   firebase.auth().signInWithPopup(provider).then(result => {
//     // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
//     // You can use these server side with your app's credentials to access the Twitter API.
//     const token = result.credential.accessToken;
//     const secret = result.credential.secret;
//     // The signed-in user info.
//     const user = result.user;
//     console.log(token, secret, user);
//     writeUserData(user.uid, user.photoURL);
//   }).catch(error => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     const credential = error.credential;
//     console.log(errorCode, errorMessage, email, credential);
//   });
// };
// window.signOutTwitter = () => {
//   firebase.auth().signOut().then(() => {
//     // Sign-out successful.
//   }).catch(error => {
//     console.log(error);
//     // An error happened.
//   });
// };

export const logoutAction = () => dispatch => {
  firebase.auth().signOut().then(() => {
    dispatch({
      type: 'LOGOUT'
    });
  }).catch(error => {
    console.error(error); // eslint-disable-line no-console
    // An error happened.
  });
};

export const timerAction = time => dispatch => {
  const type = time ? 'RESET' : 'START';
  const startTime = time ? 0 : (new Date()).getTime();

  // LocalStorage.setItem('startTime', startTime);
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      database.ref(`users/${user.uid}`).set({
        startTime
      });
    }
  });
  dispatch({
    type,
    startTime
  });
};

export const saveTime = time => dispatch => {
  const userId = firebase.auth().currentUser.uid;
  database.ref(`users/${userId}`).set({
    time
  });
  dispatch({
    type: 'WRITE-TIME'
  });
};

export const readTime = () => dispatch => {
  const userId = firebase.auth().currentUser.uid;
  return database.ref(`users/${userId}`).once('value').then(snapshot => {
    console.log(snapshot.val()); // eslint-disable-line no-console
    dispatch({
      type: 'READ-TIME'
    });
  });
};

export const checkAuth = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      database.ref(`users/${user.uid}`).once('value').then(snapshot => {
        const startTime = snapshot.val().startTime;
        dispatch(user ? {
          type: 'AUTHORIZED',
          name: user.displayName,
          photo: user.photoURL,
          startTime
        } : {
          type: 'UNAUTHORIZED'
        });
      });
    }
  });
};

export const loginAction = () => dispatch => {
  firebase.auth().signInWithPopup(provider).then(result => {
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    // const token = result.credential.accessToken;
    // const secret = result.credential.secret;
    // The signed-in user info.
    const user = result.user;
    // Console.log(token, secret, user);
    // console.log(user.photoURL);
    dispatch({
      type: 'LOGIN',
      name: user.name,
      photo: user.photoURL
    });
    //  TODO refactor this
    database.ref(`users/${user.uid}`).once('value').then(snapshot => {
      const startTime = snapshot.val().startTime;
      dispatch({
        type: 'AUTHORIZED',
        startTime
      });
    });
  }).catch(error => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    console.log(errorCode, errorMessage, email, credential); // eslint-disable-line no-console
  });
};

export const loadWeerAction = () => dispatch => {
  // Simplified=1
  // https://api.apifier.com/v1/bf2sc3BAivRhKYniR/crawlers/buienradar/lastExec/results?token=FNnGvnYTXCkQEc9DH5DHt2bme&simplified=1
  console.log('url', url); // eslint-disable-line no-console
  fetch(url)
  // fetch('https://api.apifier.com/v1/execs/H43ga4uKtWgHu6rbG/results?format=json')
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: 'LOAD',
        data: data[0].pageFunctionResult.data
      });
    });
};
