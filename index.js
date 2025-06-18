document.getElementById("searchform").addEventListener('submit', async function(event) {
    event.preventDefault();

    const termo = document.getElementById("campoBusca").value;
    const resultadosContainer = document.getElementById("resultados");

    if (!termo) {
        return;
    }

    const DeezerAPIUrl = `https://api.deezer.com/search/track?q=${termo}`;
    const url = `https://corsproxy.io/?${encodeURIComponent(DeezerAPIUrl)}`;

    resultadosContainer.innerHTML = '<p>Buscando...</p>';

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const dados = await response.json();

        console.log("Dados recebidos do nosso servidor:", dados);

        resultadosContainer.innerHTML = '';

        if (dados.data && dados.data.length > 0) {
            dados.data.forEach(function(musica) {
                const divCard = document.createElement("div");
                divCard.classList.add("song_card");

                const paragrafo = document.createElement("p");
                const imagemalbum = document.createElement("img");

                paragrafo.textContent = `Título: ${musica.title} | Artista: ${musica.artist.name}`;
                imagemalbum.src = musica.album.cover_medium;
                imagemalbum.alt = `Capa do álbum ${musica.title}`;

                divCard.appendChild(imagemalbum);
                divCard.appendChild(paragrafo);
                resultadosContainer.appendChild(divCard);
            });
        } else {
            resultadosContainer.innerHTML = '<p>Nenhum resultado encontrado para sua busca.</p>';
        }

    } catch (error) {
        console.error("Falha ao buscar os dados:", error);
        resultadosContainer.innerHTML = '<p>Ocorreu um erro ao buscar. Tente novamente.</p>';
    }
});
