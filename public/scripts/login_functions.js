let auth = firebase.auth();
// const sessCookiesColl = 'sessCookies';
// const userDataColl = 'userData';

// const firebase = require("firebase");
// Required for side-effects
// require("firebase/firestore");

const db = firebase.firestore();

//write something to the db to make sure it works
//example of how to read from db
/*db.collection(userDataColl).get()
  .then( (querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    })
  })
  .catch((e) => {
    console.log('Error message ' + e);
  });*/

document.getElementById('loginBtn').addEventListener("click", (e) => {
    e.preventDefault();
    let uEmail = document.getElementById('email').value;
    let uPassword = document.getElementById('password').value;

    signIn(uEmail, uPassword);
});

const signIn = (email, password) => {
  auth.signInWithEmailAndPassword(email, password)
    .then(moveToDashboard)  
    .catch(function(error){
      //error
      var errorCode = error.code;
      var errorMessage = error.message;
      addPasswordFailText(errorMessage);
    })
}

const addPasswordFailText = (failText) => {
  passEl = document.getElementById('password');
  passEl.value = '';
  passEl.setAttribute('placeholder', failText);
}


const moveToDashboard = () => {
    window.location = '../dashboard.html';
};


//function to collect all of the users values and then send them to the firebase database
  //here