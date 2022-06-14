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
       console.log('logado');
       
    } else {
        console.log('Não logado');
    }
 })

 