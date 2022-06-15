firebase.auth().languageCode = "pt-BR";

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
        showError('Falha no acesso:', error)
      });
  } else {
    firebase
      .auth()
      .createUserWithEmailAndPassword(
        authForm.email.value,
        authForm.password.value
      )
      .catch((error) => {
        showError('Falha no cadastro:', error)
      });
  }
};

//  Funçao que centraliza e trata a autentificaçao
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
    .catch((error) => {
      showError('Falha ao sair da conta:', error)
    });
}

// Funçao que permite usuario enviar email de verificaçao

function sendEmailVerification() {
  showItem(loading);
  var user = firebase.auth().currentUser;
  user
    .sendEmailVerification(actionCodeSettings)
    .then(() => {
      alert(`Email de verificação enviado para ${user.email}`);
    })
    .catch((error) => {
      showError('Falha ao enviar mensagem de email:', error)
    })
    .finally(() => {
      hideItem(loading);
    });
}

// Funcçao que permite o usuario redefinir a senha dele
function sendPasswordResetEmail() {
  var email = prompt(
    `Redefinir senha! Informe seu endereço de email ${authForm.email.value}`
  );

  if (email) {
    showItem(loading);
    firebase
      .auth()
      .sendPasswordResetEmail(email, actionCodeSettings)
      .then(() => {
        alert(`Email de redefinição de senha enviado para ${email}.`);
      })
      .catch((error) => {
        showError('Falha ao enviar email de redefiniçao de senha:', error)
      })
      .finally(() => {
        hideItem(loading);
      });
  } else {
    alert("Preencha o campo");
  }
}

// Funçao que permite autentificaçao pelo google
function signInWithGoogle() {
  showItem(loading);
  firebase
    .auth()
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .catch((error) => {
      showError('Falha ao autenticar com o Google:', error)
      hideItem(loading);
    });
}

// Funçao que permite autentificaçao pelo github
function signInWithGitHub() {
  showItem(loading);
  firebase
    .auth()
    .signInWithPopup(new firebase.auth.GithubAuthProvider())
    .catch((error) => {
      showError('Falha ao autenticar com o Github:', error)
      hideItem(loading);
    });
}

// Funçao que permite autentificaçao pelo facebook
function signInWithFacebook() {
  showItem(loading);
  firebase
    .auth()
    .signInWithPopup(new firebase.auth.FacebookAuthProvider())
    .catch((error) => {
      showError('Falha ao autenticar com o Facebook:', error)
      hideItem(loading);
    });
}
// Funçao que permite Atualizar nome de usuario
function updateUserName() {
  var newUserName = prompt(
    `Informe um novo nome de usuario ${userName.innerHTML}`
  );
  if (newUserName && newUserName != "") {
    userName.innerHTML = newUserName;
    showItem(loading);
    firebase
      .auth()
      .currentUser.updateProfile({
        displayName: newUserName,
      })
      .catch((error) => {
        showError('Falha ao atualizar o nome de usuario', error)
      })
      .finally(() => {
        hideItem(loading);
      });
  } else {
    alert("insira algo");
  }
}

// Funçao que permite Remover contas de usuario
function deleteUserAccount() {
  var confirmation = confirm("Realmente deseja excluir sua conta");
  if (confirmation) {
    showItem(loading);
    firebase
      .auth()
      .currentUser.delete()
      .then(() => {
        alert("Conta excluida com sucesso");
      })
      .catch((error) => {
        showError('Falha ao remover sua conta:', error)
      })
      .finally(() => {
        hideItem(loading);
      });
  }
}
