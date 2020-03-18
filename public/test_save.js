const USER_COOKIES = 'user-cookies';
const SESSION_COOKIES = 'session-cookies';

const ourFirebaseConfig = {
            apiKey: "AIzaSyCIkY6yraiOhUx9eYp6YuiIzxzvnSxM4IE",
            authDomain: "cse135-hw3-6edc9.firebaseapp.com",
            databaseURL: "https://cse135-hw3-6edc9.firebaseio.com",
            projectId: "cse135-hw3-6edc9",
            storageBucket: "cse135-hw3-6edc9.appspot.com",
            messagingSenderId: "623262042083",
            appId: "1:623262042083:web:78c333c2912c96e1cd42d6",
            measurementId: "G-S72SNM3V75" };

if (!firebase.apps.length) {
    firebase.initializeApp(ourFirebaseConfig);
}
firebase.analytics();

var firestore = firebase.firestore();
console.log('firebase-firestore initialized');
const collection = firestore.collection('test-collection');//this has to match a firestore collection name
const userCookiesCollection = firestore.collection(USER_COOKIES);
const sessionCookiesCollection = firestore.collection(SESSION_COOKIES);
const docRef = collection.doc('anything2');

//can create a new collection by using the add function on "db"

//Working with input field and button
const el = document.getElementById('index-test-save-button');
const elText = document.getElementById('test-text-save');
el.addEventListener('click', saveMessage);

//Testing how to store input from a text field
function saveMessage(){
//    console.log('Inside saveMessage');
    docRef.set(
        {
            demo: elText.value
        })
        .then(function(){
            console.log("string saved");
        })
        .catch(function(error){
            console.log("error thrown");
        });
}



//call to cloud function
function reqListener() {
    console.log(this.responseText);
}

const getData = () => {
   let oReq = new XMLHttpRequest();
   oReq.addEventListener('load', reqListener);
   oReq.open('GET', 'http://localhost:5001/cse135-hw3-6edc9/us-central1/passData', true);
   oReq.send();
};

window.onload = getData;