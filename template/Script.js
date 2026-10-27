let nome = document.querySelector(".nome");
let personagem = document.querySelector(".personagem");
const botaoEscolher = document.querySelector(".voce");
const entradaImagem = document.querySelector(".entrada-imagem");
const statusGeracao = document.querySelector(".status-geracao");
const API_ENDPOINT = "/api/gerar";

console.log(nome);
console.log(personagem);
console.log("Script carregado com sucesso!");

function escolherPersonagem(nomePersonagem, imagem, corPersonagem) {
    nome.textContent = nomePersonagem;
    personagem.src = imagem;
    nome.style.color = corPersonagem;
}

botaoEscolher.addEventListener("click", () => {
    entradaImagem.click();
});

entradaImagem.addEventListener("change", async () => {
    const imagemSelecionada = entradaImagem.files[0];
    if (!imagemSelecionada) {
        return;
    }

    if (!imagemSelecionada.type.startsWith("image/")) {
        statusGeracao.textContent = "Selecione um arquivo de imagem válido.";
        entradaImagem.value = "";
        return;
    }

    const dados = new FormData();
    dados.append("image", imagemSelecionada);

    botaoEscolher.disabled = true;
    statusGeracao.textContent = "Transformando sua foto...";

    try {
        const resposta = await fetch(API_ENDPOINT, {
            method: "POST",
            body: dados
        });

        if (!resposta.ok) {
            throw new Error(`O serviço respondeu com erro (${resposta.status}).`);
        }

        let resultado;
        try {
            resultado = await resposta.json();
        } catch {
            throw new Error("O serviço retornou uma resposta inválida.");
        }

        if (!resultado || typeof resultado.imageUrl !== "string" || !resultado.imageUrl.trim()) {
            throw new Error("A resposta do serviço não contém uma imagem gerada.");
        }

        const urlImagem = resultado.imageUrl.trim();
        if (urlImagem.startsWith("data:image/")) {
            personagem.src = urlImagem;
        } else {
            const urlSegura = new URL(urlImagem, window.location.href);
            if (urlSegura.protocol !== "http:" && urlSegura.protocol !== "https:") {
                throw new Error("O serviço retornou um endereço de imagem inválido.");
            }
            personagem.src = urlSegura.href;
        }

        personagem.alt = "Personagem gerado a partir da sua foto";
        nome.textContent = "Você";
        nome.style.color = "#ffd319";
        statusGeracao.textContent = "Sua versão personagem está pronta!";
    } catch (erro) {
        statusGeracao.textContent = `Não foi possível transformar a foto: ${erro.message}`;
    } finally {
        botaoEscolher.disabled = false;
        entradaImagem.value = "";
    }
});