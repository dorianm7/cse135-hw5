const MAX_COOKIE_SIZE = 99999999;

function hasCookies(requestCookieList){
    if(typeof(requestCookieList) == undefined){
        return false;
    }
    else{
        return true;
    }
}

function createCookie(){
    //need to get random number
    //need to check random number not in firebase
    //if(!found in firebase)
}

function createUserCookie(){
    userCookie = "uid" + getRandomInt(MAX_COOKIE_SIZE);

}

function getRandomInt(maxVal){
    if(maxVal < 0) {
        throw new RangeError("Can only return positive random values.");
    }
    return int(Math.random() * maxVal);
}

//collection is a Firestore collection reference
//key is what we're looking for in the collection
const entryInFirebaseCollection = (collection, key) => {
    docRef = collection.doc(key);
    return typeof docRef != "undefined";
}