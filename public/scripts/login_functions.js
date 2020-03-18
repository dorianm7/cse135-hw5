let auth = firebase.auth();

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


const moveToDashboard = () => {window.location = '../dashboard.html';};
