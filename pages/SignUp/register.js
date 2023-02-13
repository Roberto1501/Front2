let nome = document.getElementById('nome');
let nomeKey = document.querySelector('#nome');
let validNome = false;

let email = document.getElementById('email');
let emailKey = document.querySelector('#email');
let validEmail = false;

let senha = document.getElementById('password');
let senhaKey = document.querySelector('password');
let validSenha = false;


//verifica se o nome digitado é menor do que 3
nome.addEventListener('keyup', () => {
    if(nome.value.length < 2){
        nomeKey.setAttribute('style', 'border: 2px solid red');
        validNome = false;
    }else {
        nome.setAttribute('style', 'border: 2px solid green');
        validNome = true;
    }
});

//verifica se o email digitado é menor do que 8
email.addEventListener('keyup', () => {
    if(email.value.length < 8){
        emailKey.setAttribute('style', 'border: 2px solid red');
        validEmail = false;
    }else {
        emailKey.setAttribute('style', 'border: 2px solid green');
        validEmail = true;
    }
});

//verifica se a senha digitado é menor do que 6
senha.addEventListener('keyup', () => {
    if(senha.value.length < 6){
        senhaKey.setAttribute('style', 'border: 2px solid red');
        validSenha = false;
    }else {
        emailKey.setAttribute('style', 'border: 2px solid green');
        validSenha = true;
    }
});

//Funçao para cadastrar um cliente no sistema
function register(){
    if(validNome && validEmail && validSenha){

        let listaUser = JSON.parse(localStorage.getItem('listaUser') || '[]');

        for(let i = 0; i < listaUser.length; i++){

            if(listaUser[i].nomeUser === nome.value || listaUser[i].emailUser === email.value){

                return alert('Nome ou email ja cadastrados!!');
                
            }
        }

        listaUser.push({
            nomeUser: nome.value,
            emailUser: email.value,
            senhaUser: senha.value
        });


        localStorage.setItem('listaUser', JSON.stringify(listaUser));
        window.location.href="../SignIn/login.html";

        alert('cadastrado com sucesso');
        
    }else{
        alert('erro');
    }
}