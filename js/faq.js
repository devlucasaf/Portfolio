// --- CONTROLADOR INTERATIVO DA PÁGINA DE PERGUNTAS FREQUENTES (FAQ) ---
document.addEventListener("DOMContentLoaded", () => {
    const campoBusca = document.getElementById("faq-search-input");
    const botaoLimparBusca = document.getElementById("faq-search-clear");
    const botoesCategoria = document.querySelectorAll(".faq-category-btn");
    const itensFaq = document.querySelectorAll(".faq-item");
    const estadoVazio = document.getElementById("faq-empty-state");

    let categoriaAtual = "all";
    let termoBuscaAtual = "";

    // 1. LÓGICA DE ABERTURA E FECHAMENTO DA SANFONA (ACCORDION)
    itensFaq.forEach(item => {
        const botaoPergunta = item.querySelector(".faq-question");
        const resposta = item.querySelector(".faq-answer");

        if (!botaoPergunta || !resposta) {
            return;
        }

        botaoPergunta.addEventListener("click", () => {
            const estaExpandido = botaoPergunta.getAttribute("aria-expanded") === "true";

            // Fecha outros itens para manter o efeito sanfona limpo e organizado
            itensFaq.forEach(outroItem => {
                if (outroItem !== item) {
                    const outroBotao = outroItem.querySelector(".faq-question");
                    const outraResposta = outroItem.querySelector(".faq-answer");
                    if (outroBotao && outraResposta) {
                        outroBotao.setAttribute("aria-expanded", "false");
                        outraResposta.hidden = true;
                        outroItem.classList.remove("is-open");
                    }
                }
            });

            // Alterna o estado do item clicado
            if (estaExpandido) {
                botaoPergunta.setAttribute("aria-expanded", "false");
                resposta.hidden = true;
                item.classList.remove("is-open");
            } else {
                botaoPergunta.setAttribute("aria-expanded", "true");
                resposta.hidden = false;
                item.classList.add("is-open");
            }
        });
    });

    // 2. LÓGICA COMBINADA DE FILTRO POR CATEGORIA E BUSCA POR TEXTO
    function filtrarFaq() {
        let totalVisiveis = 0;
        const termo = termoBuscaAtual.toLowerCase().trim();

        itensFaq.forEach(item => {
            const categoria = item.dataset.category;
            const texto = item.textContent.toLowerCase();

            const correspondeCategoria = categoriaAtual === "all" || categoria === categoriaAtual;
            const correspondeBusca = !termo || texto.includes(termo);

            if (correspondeCategoria && correspondeBusca) {
                item.style.display = "";
                totalVisiveis++;
            } else {
                item.style.display = "none";
            }
        });

        if (estadoVazio) {
            estadoVazio.hidden = totalVisiveis > 0;
        }
    }

    // 3. EVENTOS DOS BOTÕES DE CATEGORIA
    botoesCategoria.forEach(botao => {
        botao.addEventListener("click", () => {
            botoesCategoria.forEach(b => {
                b.classList.remove("active");
                b.setAttribute("aria-selected", "false");
            });
            botao.classList.add("active");
            botao.setAttribute("aria-selected", "true");

            categoriaAtual = botao.dataset.category;
            filtrarFaq();
        });
    });

    // 4. EVENTO DO CAMPO DE BUSCA EM TEMPO REAL
    if (campoBusca) {
        campoBusca.addEventListener("input", (evento) => {
            termoBuscaAtual = evento.target.value;
            if (botaoLimparBusca) {
                botaoLimparBusca.hidden = termoBuscaAtual.length === 0;
            }
            filtrarFaq();
        });
    }

    // 5. BOTÃO PARA LIMPAR A BUSCA
    if (botaoLimparBusca && campoBusca) {
        botaoLimparBusca.addEventListener("click", () => {
            campoBusca.value = "";
            termoBuscaAtual = "";
            botaoLimparBusca.hidden = true;
            filtrarFaq();
            campoBusca.focus();
        });
    }
});
