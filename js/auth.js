firebase.auth().languageCode = 'pt-BR'

authForm.onsubmit = (event) => {
  if (authForm.email.value || authForm.password.value != "") {
    showItem(loading);
  }

  event.preventDefault();
  if (authForm.submitAuthForm.innerHTML === "Acessar") {
    firebase
      .auth()
      .signInWithEmailAndPassword(authForm.email.value, authForm.password.value)
      .catch((error) => {
        hideItem(loading);
      });
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        authForm.email.value,
        authForm.password.value
      )
      .catch((error) => {
        hideItem(loading);

      });
  }
};

//  Funçao que centraliza e trara a autentificaçao
firebase.auth().onAuthStateChanged((user) => {
  hideItem(loading);
  if (user) {
    showUserContent(user);
  } else {
    showAuth();
  }
});

//  Funcao para deslogar
function signOut() {
  firebase
    .auth()
    .signOut()
    .catch((error) => {});
}

// Funçao que permite usuario enviar email de verificaçao

function sendEmailVerification() {
    showItem(loading);
    var user = firebase.auth().currentUser;
    user.sendEmailVerification(actionCodeSettings).then(() => {
        alert(`Email de verificação enviado para ${user.email}`);
    }).catch ((error) => {
        alert('error');
    }).finally(() => {
        hideItem(loading);
    });
}
