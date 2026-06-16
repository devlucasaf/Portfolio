async function loadSpotifyTracks() {
    try {
        const response = await fetch("spotify_data.json?t=" + new Date().getTime());
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const tracks = await response.json();
        const tbody = document.getElementById("spotify-tracks-tbody");
        
        if (!tbody) {
            console.warn("Elemento #spotify-tracks-tbody não encontrado");
            return;
        }
        
        tbody.innerHTML = ""; 
        
        tracks.forEach(track => {
            const row = document.createElement("tr");
            
            const trackNumber = String(track.number).padStart(2, "0");
            
            row.innerHTML = `
                <td>
                    ${trackNumber}
                </td>

                <td>
                    <a href="${track.url}" target="_blank" class="spotify-track-link" title="Abrir no Spotify">
                        ${escapeHtml(track.name)}
                    </a>
                </td>

                <td>
                    ${escapeHtml(track.artist)}
                </td>

                <td>
                    ${escapeHtml(track.album)}
                </td>

                <td>    
                    ${track.duration}
                </td>
            `;
            
            tbody.appendChild(row);
        });
        
        console.log(`Carregadas ${tracks.length} músicas do Spotify`);
        
        updateLastSync();
        
    } catch (error) {
        console.error("Erro ao carregar Spotify:", error);
        
        const tbody = document.getElementById("spotify-tracks-tbody");
        if (tbody) {
            tbody.innerHTML = `
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

function escapeHtml(text) {
    const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&quot;",
        "'": "&#039;"
    };
    return text.replace(/[&<>""]/g, m => map[m]);
}

function updateLastSync() {
    const syncElement = document.getElementById("spotify-last-sync");
    if (syncElement) {
        const now = new Date();
        const timeString = now.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        });
        syncElement.textContent = timeString;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadSpotifyTracks();
    
    const isDev = window.location.hostname === "localhost";
    const updateInterval = isDev ? 60000 : 300000;
    
    setInterval(loadSpotifyTracks, updateInterval);
    
    if (isDev) {
        console.log("Atualizando Spotify a cada 1 minuto (desenvolvimento)");
    }
});

window.loadSpotifyTracks = loadSpotifyTracks;
