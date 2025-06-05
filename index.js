// Adiciona um event listener ao formulário
// Ele será acionado quando o formulário for enviado (botão de submit clicado ou Enter pressionado)
document.getElementById('formBusca').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário e o recarregamento da página
    buscador(); // Chama sua função assíncrona para buscar os dados
});

async function buscador() {
    // Pega o termo de busca usando o ID correto
    const termoBuscaInput = document.getElementById('campoBuscaInput').value;
    const saidaDiv = document.getElementById("resultado"); // Pega a div onde o resultado será mostrado

    // Limpa resultados anteriores e mostra mensagem de carregamento
    saidaDiv.innerHTML = "<p>Buscando...</p>";

    if (!termoBuscaInput.trim()) {
        saidaDiv.innerHTML = "<p style='color:red;'>Por favor, digite algo para buscar.</p>";
        return;
    }
    
    const termoBusca = encodeURIComponent(termoBuscaInput.trim());

    const deezerApiUrl = `https://api.deezer.com/search/track?q=${termoBusca}`;
    const url = `https://corsproxy.io/?${encodeURIComponent(deezerApiUrl)}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.status} - ${response.statusText}`);
        }

        const dados = await response.json();

        if (dados.data && dados.data.length > 0) {
            const primeiraMusica = dados.data[0];
            const urlCapa = primeiraMusica.album.cover_big; // Usando cover_big para melhor resolução

            if (urlCapa) {
                // Constrói o HTML para a imagem e as informações
                saidaDiv.innerHTML = `
                    <img src="${urlCapa}" alt="Capa do álbum de ${primeiraMusica.title}" style="max-width: 250px; margin-top: 10px;">
                    <p><strong>Música:</strong> ${primeiraMusica.title}</p>
                    <p><strong>Artista:</strong> ${primeiraMusica.artist.name}</p>
                    <p><strong>Álbum:</strong> ${primeiraMusica.album.title}</p>
                `;
            } else {
                saidaDiv.innerHTML = '<p style="color:orange;">Capa do álbum não encontrada para esta música.</p>';
            }
        } else {
            saidaDiv.innerHTML = '<p>Nenhuma música encontrada com esse termo.</p>';
        }
    } catch (error) {
        console.error("Erro ao buscar capa:", error);
        saidaDiv.innerHTML = `<p style='color:red;'>Ocorreu um erro: ${error.message}</p>`;
    }
}