let auth = firebase.auth();
let userRole;
let userEmail;


//Here call all functions
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
        //setUserRole(user, 'admin');
        printUserProfile(user);
        updateGreetingText();
    } else {
      // No user is signed in.
    }
  });
 
const printUserProfile = (user) => {
    if(user != null){
        user.providerData.forEach(function (profile) {
            console.log("Sign-in provider: " + profile.providerId);
            console.log("  Provider-specific UID: " + profile.uid);
            console.log("  Name: " + profile.displayName);
            console.log("  Email: " + profile.email);
            userRole = profile.displayName;
            userEmail = profile.email;
          });
    }
    else{
        textEl.innerText = 'User is null';
    }
};

const setUserRole = (user, roleType) => {
    user.updateProfile({
        displayName : String (roleType)
    }).then(function() {
        console.log('Successfully updated user role to ' + roleType);
    }).catch(function(e) {
        console.log(e);
    })
};

const updateGreetingText = () => {
    let greetingEl = document.getElementById('nav-greeting');
    greetingEl.innerText = greetingEl.innerText + ' ' +  userEmail + ' (' + userRole + ')';
    console.log(greetingEl.value);
}

const signout = () => {
firebase.auth().signOut().then(function() {
    console.log('Signed Out');
    moveToLogIn();
  }, function(error) {
    console.error('Sign Out Error', error);
  });
};

const moveToLogIn = () => {window.location = '../index.html';};

logOutEl = document.getElementById('logOutBtn');
logOutEl.addEventListener('click', signout);

