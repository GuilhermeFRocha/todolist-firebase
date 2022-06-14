authForm.onsubmit = (event) =>{
    showItem(loading)
    event.preventDefault()
    if (authForm.submitAuthForm.innerHTML === 'Acessar') {
        firebase.auth().signInWithEmailAndPassword(authForm.email.value, authForm.password.value).catch((error) => {
            console.log(error);
         })
    } else {
        firebase.auth().createUserWithEmailAndPassword(authForm.email.value, authForm.password.value).catch((error) => {
            console.log(error);
         })
    }
 }

 firebase.auth().onAuthStateChanged((user) => {
    hideItem(loading)
    if (user) {
      showUserContent (user) 
    } else {
        showAuth ()
    }
 })

//  Funcao para deslogar
function signOut () {
    firebase.auth().signOut().catch((error) => {
    
    })
}