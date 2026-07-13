import { translationsPtBr } from "./translation/portuguese.js";
import { translationsEnUs } from "./translation/english.js";

const traducoes = {
    "pt-br": translationsPtBr,
    "en-us": translationsEnUs
};

// --- APLICA A TRADUÇÃO ---
function aplicarTraducao(idioma) {
    console.log("Aplicando tradução para:", idioma);

    if (traducoes[idioma] && traducoes[idioma]["title"]) {
        document.title = traducoes[idioma]["title"];
    }

    document.querySelectorAll("[data-key]").forEach(elemento => {
        const chave = elemento.getAttribute("data-key");
        if (traducoes[idioma] && traducoes[idioma][chave]) {
            if (elemento.tagName === "INPUT" || elemento.tagName === "TEXTAREA") {
                elemento.placeholder = traducoes[idioma][chave];
            } else {
                elemento.textContent = traducoes[idioma][chave];
            }
        }
    });

    atualizarTitulosSecao(idioma);

    atualizarElementosPorClasse(idioma);

    localStorage.setItem("preferredLanguage", idioma);
    console.log("Tradução aplicada com sucesso!");
}

// --- ATUALIZA O TÍTULO DA SEÇÃO DE MÚSICA ---
function atualizarTitulosSecao(idioma) {
    const tituloSecaoMusica = document.querySelector("#music-section .section-title");
    if (tituloSecaoMusica && traducoes[idioma] && traducoes[idioma]["music-title"]) {
        const spanDestaque = tituloSecaoMusica.querySelector(".highlight");
        if (spanDestaque) {
            tituloSecaoMusica.innerHTML = traducoes[idioma]["music-title"].replace("Agora", "<span class='highlight'>Agora</span>");
        } else {
            tituloSecaoMusica.textContent = traducoes[idioma]["music-title"];
        }
    }
}

// --- ATUALIZA OS ITENS DE NAVEGAÇÃO ---
function atualizarElementosPorClasse(idioma) {
    const classesNavegacao = [
        "nav-home",
        "nav-sobre",
        "nav-musica",
        "nav-skills",
        "nav-certifications",
        "nav-projetos",
        "nav-contatos"
    ];

    classesNavegacao.forEach(nomeClasse => {
        const elementos = document.getElementsByClassName(nomeClasse);
        if (elementos.length > 0 && traducoes[idioma] && traducoes[idioma][nomeClasse]) {
            for (let elemento of elementos) {
                elemento.textContent = traducoes[idioma][nomeClasse];
            }
        }
    });
}

window.translations = traducoes;
window.applyTranslation = aplicarTraducao;
window.updateSectionTitles = atualizarTitulosSecao;
window.updateElementsByClass = atualizarElementosPorClasse;
