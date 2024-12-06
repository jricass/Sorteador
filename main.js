document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-button');
    const contents = document.querySelectorAll('.tab-content');
    const historico = document.getElementById('lista-historico');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    function adicionarAoHistorico(tipo, resultado) {
        const item = document.createElement('li');
        item.textContent = `${tipo}: ${resultado}`;
        historico.prepend(item);
        salvarHistorico();
    }

    function salvarHistorico() {
        localStorage.setItem('historicoSorteios', historico.innerHTML);
    }

    function carregarHistorico() {
        const historicoSalvo = localStorage.getItem('historicoSorteios');
        if (historicoSalvo) {
            historico.innerHTML = historicoSalvo;
        }
    }

    document.getElementById('sortear-numeros').addEventListener('click', () => {
        const min = parseInt(document.getElementById('num-min').value);
        const max = parseInt(document.getElementById('num-max').value);
        const quantidade = parseInt(document.getElementById('num-quantidade').value);
        const resultado = [];
        for (let i = 0; i < quantidade; i++) {
            resultado.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        document.getElementById('resultado-numeros').textContent = resultado.join(', ');
        adicionarAoHistorico('Números', resultado.join(', '));
    });

    document.getElementById('sortear-nomes').addEventListener('click', () => {
        const nomes = document.getElementById('lista-nomes').value.split('\n').filter(nome => nome.trim() !== '');
        const quantidade = parseInt(document.getElementById('nomes-quantidade').value);
        const resultado = [];
        for (let i = 0; i < quantidade && nomes.length > 0; i++) {
            const index = Math.floor(Math.random() * nomes.length);
            resultado.push(nomes.splice(index, 1)[0]);
        }
        document.getElementById('resultado-nomes').textContent = resultado.join(', ');
        adicionarAoHistorico('Nomes', resultado.join(', '));
    });

    document.getElementById('sortear-moeda').addEventListener('click', () => {
        const resultado = Math.random() < 0.5 ? 'Cara' : 'Coroa';
        document.getElementById('resultado-moeda').textContent = resultado;
        adicionarAoHistorico('Moeda', resultado);
    });

    document.getElementById('sortear-dado').addEventListener('click', () => {
        const resultado = Math.floor(Math.random() * 6) + 1;
        document.getElementById('resultado-dado').textContent = resultado;
        adicionarAoHistorico('Dado', resultado);
    });

    carregarHistorico();
});