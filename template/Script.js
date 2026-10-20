let nome = document.querySelector(".nome");
let personagem = document.querySelector(".personagem");

console.log(nome);
console.log(personagem);
console.log("Script carregado com sucesso!");

function escolherPersonagem(nomePersonagem, imagem) {
    nome.textContent = nomePersonagem;
    personagem.src = imagem;
}