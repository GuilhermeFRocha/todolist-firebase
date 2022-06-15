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

// Funcçao que permite o usuario redefinir a senha dele
function sendPasswordResetEmail() {
  var email = prompt(`Redefinir senha! Informe seu endereço de email ${authForm.email.value}`)

  if (email) {
    showItem(loading)
    firebase.auth().sendPasswordResetEmail(email, actionCodeSettings).then(() => {
      alert(`Email de redefinição de senha enviado para ${email}.` )
    }).catch((error) => {
      alert(error)
      console.log(actionCodeSettings);
    }).finally(() => {
      hideItem(loading)
    })
  } else {
    alert('Preencha o campo')
  }
}

// Funçao que permite autentificaçao pelo google
function signInWithGoogle () {
  showItem(loading)
  firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch((error) => {
    alert(error)
    hideItem(loading)
  })
}

// Funçao que permite autentificaçao pelo github
function signInWithGitHub() {
  showItem(loading)
  firebase.auth().signInWithPopup(new firebase.auth.GithubAuthProvider()).catch((error) => {
    alert(error)
    hideItem(loading)
  })
}

// Funçao que permite autentificaçao pelo facebook
function signInWithFacebook() {
  showItem(loading)
  firebase.auth().signInWithPopup(new firebase.auth.FacebookAuthProvider()).catch((error) => {
    alert(error)
    hideItem(loading)
  })
}
// Funçao que permite Atualizar nome de usuario
function updateUserName () {
  var newUserName = prompt(`Informe um novo nome de usuario ${userName.innerHTML}`)
  if (newUserName && newUserName != '') { 
    userName.innerHTML = newUserName
    showItem(loading)
    firebase.auth().currentUser.updateProfile({
      displayName: newUserName
    }).catch((error) => {
      alert(error)
    }).finally(() => {  
      hideItem(loading)
    })
  } else {
    alert('insira algo')
  }
}

// Funçao que permite Remover contas de usuario
function deleteUserAccount () {
  var confirmation = confirm('Realmente deseja excluir sua conta')
  if (confirmation) {
    showItem(loading)
    firebase.auth().currentUser.delete().then(() => {alert('Conta excluida com sucesso')}).catch((error) => {alert(error)}).finally(() => {hideItem(loading)})
  }
}