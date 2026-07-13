async function carregarMusicasSpotify() {
    try {
        const resposta = await fetch("spotify_data.json?t=" + new Date().getTime());
        
        if (!resposta.ok) {
            throw new Error(`HTTP error! status: ${resposta.status}`);
        }
        
        const musicas = await resposta.json();
        const corpoTabela = document.getElementById("spotify-tracks-tbody");
        
        if (!corpoTabela) {
            console.warn("Elemento #spotify-tracks-tbody não encontrado");
            return;
        }
        
        corpoTabela.innerHTML = ""; 
        
        musicas.forEach(musica => {
            const linha = document.createElement("tr");
            
            const numeroMusica = String(musica.number).padStart(2, "0");
            
            linha.innerHTML = `
                <td>
                    ${numeroMusica}
                </td>

                <td>
                    <a href="${musica.url}" target="_blank" class="spotify-track-link" title="Abrir no Spotify">
                        ${escaparHtml(musica.name)}
                    </a>
                </td>

                <td>
                    ${escaparHtml(musica.artist)}
                </td>

                <td>
                    ${escaparHtml(musica.album)}
                </td>

                <td>    
                    ${musica.duration}
                </td>
            `;
            
            corpoTabela.appendChild(linha);
        });
        
        console.log(`Carregadas ${musicas.length} músicas do Spotify`);
        
        atualizarUltimaSincronizacao();
        
    } catch (erro) {
        console.error("Erro ao carregar Spotify:", erro);
        
        const corpoTabela = document.getElementById("spotify-tracks-tbody");
        if (corpoTabela) {
            corpoTabela.innerHTML = `
                <tr>
                    <td colspan="5" class="error-message">
                        Erro ao carregar dados do Spotify. 
                        <a href="javascript:location.reload()">Recarregue a página</a>
                    </td>
                </tr>
            `;
        }
    }
}

function escaparHtml(texto) {
    const mapa = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&quot;",
        "'": "&#039;"
    };
    return texto.replace(/[&<>""]/g, caractere => mapa[caractere]);
}

function atualizarUltimaSincronizacao() {
    const elementoSincronizacao = document.getElementById("spotify-last-sync");
    if (elementoSincronizacao) {
        const agora = new Date();
        const horaFormatada = agora.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        });
        elementoSincronizacao.textContent = horaFormatada;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarMusicasSpotify();
    
    const ehDesenvolvimento = window.location.hostname === "localhost";
    const intervaloAtualizacao = ehDesenvolvimento ? 60000 : 300000;
    
    setInterval(carregarMusicasSpotify, intervaloAtualizacao);
    
    if (ehDesenvolvimento) {
        console.log("Atualizando Spotify a cada 1 minuto (desenvolvimento)");
    }
});

window.loadSpotifyTracks = carregarMusicasSpotify;
