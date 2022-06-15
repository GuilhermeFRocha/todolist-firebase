// Definindo referências para elementos da página
var authForm = document.getElementById('authForm')
var authFormTitle = document.getElementById('authFormTitle')
var register = document.getElementById('register')
var access = document.getElementById('access')
var loading = document.getElementById('loading')
var auth = document.getElementById('auth')
var userContent = document.getElementById('userContent')
var userEmail = document.getElementById('userEmail')
var sendEmailVerificationDiv  = document.getElementById('sendEmailVerificationDiv')
var emailVerified  = document.getElementById('emailVerified')
var passwordReset = document.getElementById('passwordReset')

// Alterar o formulário de autenticação para o cadastro de novas contas
function toggleToRegister() {
  authForm.submitAuthForm.innerHTML = 'Cadastrar conta'
  authFormTitle.innerHTML = 'Insira seus dados para se cadastrar'
  hideItem(register) // Ocultar o formulário de cadastro
  hideItem(passwordReset) //Ocultar o campo de Reset de senha
  showItem(access) // Exibir o formulário de acesso

}

// Alterar o formulário de autenticação para o acesso de contas já existentes
function toggleToAccess() {
  authForm.submitAuthForm.innerHTML = 'Acessar'
  authFormTitle.innerHTML = 'Acesse a sua conta para continuar'
  hideItem(access)  // Ocultar o formulário de cadastro de conta
  showItem(register) // Exibir o formulário de acesso de conta
  showItem(passwordReset) //Mostrar o campo de Reset de senha

}

// Simpplifica a exibição de elementos da página
function showItem(element) {
  element.style.display = 'block'
}

// Simpplifica a remoção de elementos da página
function hideItem(element) {
  element.style.display = 'none'
}

// Mostrar conteudo para usuarios de autenticação
function showUserContent(user) {
  if (user.providerData[0].providerId != 'password') {
    emailVerified.innerHTML = 'Autentificaçao por provedor confiavel'
    hideItem(sendEmailVerificationDiv)
  } else {
  if (user.emailVerified) {
    emailVerified.innerHTML = 'Seu email está verificado'
    hideItem(sendEmailVerificationDiv)
   } else {
    emailVerified.innerHTML = 'Seu email não está verificado'
    showItem(sendEmailVerificationDiv)
   }
 }
    userImg.src = user.photoURL ?  user.photoURL  : 'img/unknownUser.png'
    userName.innerHTML = user.displayName
    userEmail.innerHTML = user.email
    hideItem(auth)
    showItem(userContent)
}
 

// Mostrar conteudo para usuarios nao autenticação
function showAuth() {
  authForm.email.value = ''
  authForm.password.value = ''
  hideItem(userContent)
  showItem(auth)
}

var actionCodeSettings = {
  url: 'http://localhost:5500/'
}