
//Função para acessar a aplicação com o email e senha cadastrados
function acessar(){
    let email = document.querySelector('#email');

    let senha = document.querySelector('#password');

    let listaUser = [];

    let userValid = {
        email: '',
        senha: ''
    };
    
    listaUser = JSON.parse(localStorage.getItem('listaUser'));


    listaUser.forEach((item) => {
        if(email.value === item.emailUser && senha.value === item.senhaUser){
            userValid = {
                nome: item.nomeUser,
                email: item.emailUser,
                senha: item.senhaUser
            };
        }
    });

    if(email.value === userValid.email && senha.value === userValid.senha){
        window.location.href='../Dashboard/dashboard.html';

        //criando token unico para cada usuario ao acessar o sistema e através dele posso fazer o usuario ser deslogado
        let token = Math.random().toString(14).substring(2) + Math.random().toString(14).substring(2);
        localStorage.setItem('token', token);

        localStorage.setItem('userLogado', JSON.stringify(userValid)); 
        
    }else{
        alert('Email e senha incorretos');
    }
    
    
    
}
 

    



