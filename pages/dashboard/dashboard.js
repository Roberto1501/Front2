
let btn = document.getElementById('btn-sub');

btn.addEventListener('click', () => {

    let descricao = document.getElementById('descricao');
    let detalhamento = document.getElementById('detalhamento');

    //verificando se os inputs de descricao ou detalhamento estao vazios
    if(descricao.value === '' || detalhamento.value === ''){
        return alert('preencha a descricao ou detalhamento');
    }

    //criando uma key no localstorage e adicionando os valores digitados no input no localstorage
    let data = JSON.parse(localStorage.getItem('data') || '[]');

    data.push({
        id: Date.now(),
        descricao: descricao.value,
        detalhamento: detalhamento.value
    })

    localStorage.setItem('data', JSON.stringify(data));

    //Pegando a tag tbody e renderizando na tabela os valores digitados no input
    let show = document.getElementById('mostrarLinha');
    show.innerHTML = '';

    let getData = JSON.parse(localStorage.getItem('data'));
    // console.log(getData);

    
    getData.forEach((item, index, array) => {
        show.innerHTML += `
        <tr>
            <td data-label="#" id="count">${index + 1}</td>
            <td data-label="Descricao" id="description">${item.descricao}</td>
            <td data-label="Detalhamento" id="detalhes" >${item.detalhamento}</td>
            <td data-label="Acao" >
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="btn-apagar" onclick=showConfirmModal(${item.id})>Apagar</button>
            <button type="button" id="btn-edit" onclick=editarItem(${item.id}) >Editar</button>
            </td>
        </tr> 
        `;
    });

    
    localStorage.setItem('data', JSON.stringify(data));
    
    document.getElementById('descricao').value = '';
    document.getElementById('detalhamento').value = '';

})

//Passando o id do item clicado para uma variavel global
let itemId;
function showConfirmModal(id){
    itemId = id;
}

//Removendo o item da tabela ao clicar no botao 'sim' do modal, verificamos se o id passando para a funçao showConfirModal é igual a algum dos id de 'data' caso seja removera da tabela e atualizara o localstorage
let removeItem = document.getElementById('removeItem');
removeItem.addEventListener('click', () => {
    let data = JSON.parse(localStorage.getItem('data'));

    let indexData = data.findIndex(item => item.id === itemId);
    data.splice(indexData, 1);
    localStorage.setItem('data', JSON.stringify(data));

    atualizarTabela();
});

//Funçao para editar um item, voce digita os valores no inputs vai no item que quer editar e clica no botao editar para atualizar com os valroes novos
function editarItem(id){
    let data = JSON.parse(localStorage.getItem('data'));
    // console.log(data);
    data.map((item) => {
        if(item.id === id){
            item.descricao = descricao.value;
            item.detalhamento = detalhamento.value;
        }
        return item;
    });

    localStorage.setItem('data', JSON.stringify(data));
    descricao.value = '';
    detalhamento.value = '';
    atualizarTabela();
}

//Funçao para atualizar a tabela apos remover um item ou editar um item
function atualizarTabela(){

    let show = document.getElementById('mostrarLinha');
    show.innerHTML = '';

    let getData = JSON.parse(localStorage.getItem('data'));
    // console.log(getData);

    
    getData.forEach((item, index, array) => {
        show.innerHTML += `
        <tr>
            <td data-label="#" id="count">${index + 1}</td>
            <td data-label="Descricao" id="description">${item.descricao}</td>
            <td data-label="Detalhamento" id="detalhes" >${item.detalhamento}</td>
            <td data-label="Acao" >
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" id="btn-apagar" onclick=showConfirmModal(${item.id})>Apagar</button>
            <button type="button" id="btn-edit" onclick=editarItem(${item.id}) >Editar</button>
            </td>
        </tr> 
        `;
    });

}

//Busca no localstorage o usuario que esta logado no momento e imprime o nome no header
let userLogado = JSON.parse(localStorage.getItem('userLogado'));
        
let logado = document.getElementById('h1');

logado.innerHTML = `Lista de recados: ${userLogado.nome}`;

//Verificaçao de segurança para previnir que nenhum usuario acesse sem suas credenciais
if(localStorage.getItem('token') === null){
    alert('Você precisar estar logado para acessar essa página');
    window.location.href="../SignIn/login.html";
}
if(userLogado.email == '' || userLogado.senha == ''){
    alert('Você precisar estar logado para acessar essa página');
    window.location.href="../SignIn/login.html";
}

//Funçao para sair do sistema
function sair(){
    localStorage.removeItem('data');
    localStorage.removeItem('token');
    localStorage.removeItem('userLogado');
    window.location.href="../SignIn/login.html";
}


//Toaast para alerta que um item foi excluido ou nao
const toastTrigger = document.getElementById('removeItem')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
    
    toastTrigger.addEventListener('click', () => {
        const toast = new bootstrap.Toast(toastLiveExample)
        
        toast.show()
    })
}

const toastTrigger2 = document.getElementById('cancelButton')
const toastLiveExample2 = document.getElementById('liveToastCancel')
if (toastTrigger2) {
    toastTrigger2.addEventListener('click', () => {
        const toast = new bootstrap.Toast(toastLiveExample2)
        
        toast.show()
  })
}










