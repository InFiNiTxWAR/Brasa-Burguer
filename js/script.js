const TEMPO_BASE_ENTREGA = 10;
let carrinho = [];
function formatarPreco(valor) {
    return valor.toFixed(2).replace('.', ',');
}
function gerarId() {
    return Math.random().toString(36).substr(2, 9);
}
function abrirModalProduto(nome, descricao, preco, tempo) {
    const modal = document.getElementById("modalProduto");
    modal.innerHTML = `
        <div class="modal-content">
            <h2>${nome}</h2>
            <p>${descricao}</p>
            <p><strong>Preço:</strong> R$ ${formatarPreco(preco)}</p>
            <p><strong>Tempo de preparo:</strong> ${tempo} min</p>

            <button onclick="adicionarCarrinho('${nome}', ${preco}, ${tempo})" class="btn">Adicionar ao Carrinho</button>
            <button onclick="fecharModal()" class="btn">Fechar</button>
        </div>
    `;
    modal.style.display = "flex";
}
function fecharModal() {
    document.getElementById("modalProduto").style.display = "none";
}
function adicionarCarrinho(nome, preco, tempo) {
    carrinho.push({
        id: gerarId(),
        nome,
        preco,
        tempo
    });
    fecharModal();
    atualizarCarrinho();
}
function removerItem(id) {
    carrinho = carrinho.filter(item => item.id !== id);
    atualizarCarrinho();
}
function atualizarCarrinho() {
    const lista = document.getElementById("listaCarrinho");
    const totalEl = document.getElementById("totalCarrinho");

    lista.innerHTML = "";
    let total = 0;
    carrinho.forEach(item => {
        total += item.preco;
        lista.innerHTML += `
            <li>
                ${item.nome} - R$ ${formatarPreco(item.preco)}
                <button onclick="removerItem('${item.id}')">X</button>
            </li>
        `;
    });
    totalEl.innerText = `Total: R$ ${formatarPreco(total)}`;
}
function finalizarPedido() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }
    const endereco = prompt("Digite seu endereço:");
    if (!endereco) return;
    const pagamento = prompt("Forma de pagamento (dinheiro, pix, cartão):");
    if (!pagamento) return;
    let maiorTempo = 0;
    carrinho.forEach(item => {
        if (item.tempo > maiorTempo){
            maiorTempo = item.tempo;
        }
    });
    const tempoTotal = TEMPO_BASE_ENTREGA + maiorTempo;

    let resumo = "Pedido:\n\n";

    carrinho.forEach(item => {
        resumo += `- ${item.nome}\n`;
    });

    resumo += `\nEndereço: ${endereco}`;
    resumo += `\nPagamento: ${pagamento}`;
    resumo += `\nTempo estimado: ${tempoTotal} minutos`;

    alert(resumo);

    carrinho = [];
    atualizarCarrinho();
}

function ativarCards() {
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
        card.addEventListener("click", () =>{
            const nome = card.querySelector("h3").innerText;
            const descricao = card.querySelector("p").innerText;
            const precoTexto = card.querySelector(".preco")?.innerText || card.querySelector("span").innerText;

            const preco = parseFloat(precoTexto.replace("R$", "").replace(",", "."));

            let tempo = 15;

            if (nome.includes("Duplo") || nome.includes("Monster")) tempo = 25;
            else if (nome.includes("Chicken")) tempo = 20;
            else if (nome.includes("Batata")) tempo = 10;
            else if (nome.includes("Coca") || nome.includes("Guaraná") || nome.includes("Fanta") || nome.includes("Sprite")) tempo = 5;

            abrirModalProduto(nome, descricao, preco, tempo);
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    ativarCards();
});