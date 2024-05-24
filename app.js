function limpar() {
    document.getElementById('nome').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('imagem').value = '';
    document.getElementById('campo-ok').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
    const produtoForm = document.getElementById('produtoForm');
    const produtoLista = document.getElementById('produtoLista');

    function salvarProdutos(produtos) {
        localStorage.setItem('produtos', JSON.stringify(produtos));
    }

    function obterProdutos() {
        return JSON.parse(localStorage.getItem('produtos')) || [];
    }

    function renderizarProdutos() {
        const produtos = obterProdutos();
        produtoLista.innerHTML = '';
        let table;
    
        for (let i = 0; i < produtos.length; i += 3) {
            if (i % 3 === 0) {
                table = document.createElement('table');
                const tbody = document.createElement('tbody');
                const tr = document.createElement('tr');
                table.appendChild(tbody);
                tbody.appendChild(tr);
            }
            
            for (let j = i; j < i + 3 && j < produtos.length; j++) {
                const produto = produtos[j];
                const td = document.createElement('td');
                td.innerHTML = `
                    <img src="${produto.imagem}" alt="Imagem do Produto">
                    <p>${produto.nome}</p>
                    <p><b>$ ${produto.valor}</b></p>
                    <div align="right">
                        <img src="./assets/editar.png" onclick="editarProduto(${j})"/>
                        <img src="./assets/excluir.png" onclick="deletarProduto(${j})"/>
                    </div>
                `;
                table.getElementsByTagName('tr')[0].appendChild(td);
            }
    
            produtoLista.appendChild(table);
        }
    }

    produtoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nome = document.getElementById('nome').value;
        const valor = document.getElementById('valor').value;
        const imagemInput = document.getElementById('imagem');
        
        const reader = new FileReader();
        reader.onload = function(event) {
            const imagem = event.target.result;
            const produtos = obterProdutos();
            produtos.push({ nome, valor, imagem });
            salvarProdutos(produtos);
            renderizarProdutos();
            produtoForm.reset();
            limpar();
        };
        reader.readAsDataURL(imagemInput.files[0]);
    });

    window.editarProduto = (index) => {
        const produtos = obterProdutos();
        const produto = produtos[index];
        document.getElementById('nome').value = produto.nome;
        document.getElementById('valor').value = produto.valor;
        produtos.splice(index, 1);
        salvarProdutos(produtos);
        renderizarProdutos();
    };

    window.deletarProduto = (index) => {
        const produtos = obterProdutos();
        produtos.splice(index, 1);
        salvarProdutos(produtos);
        renderizarProdutos();
    };

    window.limparCampos = () => {
        produtoForm.reset();
    };

    renderizarProdutos();
});

document.addEventListener('DOMContentLoaded', function() {
    const imagemInput = document.getElementById('imagem');
    const campoOk = document.getElementById('campo-ok');
    
    imagemInput.addEventListener('change', function() {
        if (imagemInput.files && imagemInput.files.length > 0) {
            campoOk.style.display = 'block';
        } else {
            campoOk.style.display = 'none';
        }
    });

    campoOk.style.display = 'none';
});


function validarImagem() {
    renderizacaoInterrompida = false;

    const inputImagem = document.getElementById('imagem');

    if (inputImagem.files.length > 0) {
        const imagem = inputImagem.files[0];

        const img = new Image();

        img.onload = function() {
            if (img.width > 176 || img.height > 174) {
                alert("A imagem selecionada é muito grande. As dimensões máximas permitidas são 176x174 pixels.");
                renderizacaoInterrompida = true;
            }
        };

        img.src = URL.createObjectURL(imagem);
    }

    return !renderizacaoInterrompida;
}
