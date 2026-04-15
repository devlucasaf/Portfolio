function initLanguageSelector() {
    const languageSelect = document.getElementById("idiomaSite");
    const customSelector = document.querySelector(".language-selector-custom");
    
    if (!customSelector) {
        console.warn("Seletor de idiomas customizado não encontrado");
        return;
    }

    const currentLanguage = customSelector.querySelector(".current-language");
    const currentFlag = customSelector.querySelector(".current-language .flag-img");
    const currentText = customSelector.querySelector(".current-language .language-text");
    const languageOptions = customSelector.querySelectorAll(".language-option");
    const chevronIcon = customSelector.querySelector(".current-language i");
    const dropdown = customSelector.querySelector(".language-dropdown");

    const languageData = {
        "pt-br": {
            flag: "./assets/flags/br_flag.png",
            name: "Português",
            fullName: "Português (BR)",
            alt: "Brazil flag"
        },
        "en-us": {
            flag: "./assets/flags/us_flag.png",
            name: "English",
            fullName: "English (US)",
            alt: "US flag"
        }
    };

    function updateCurrentLanguageDisplay(selectedValue) {
        const data = languageData[selectedValue];
        
        if (!data) {
            return;
        }
        
        currentFlag.src = data.flag;
        currentFlag.alt = data.alt;
        
        currentText.textContent = data.name;
        
        languageOptions.forEach(option => {
            option.classList.remove("active");
            if (option.dataset.value === selectedValue) {
                option.classList.add("active");
            }
        });
    }

    function openDropdown() {
        dropdown.style.opacity = "1";
        dropdown.style.visibility = "visible";
        dropdown.style.transform = "translateY(0)";
        chevronIcon.style.transform = "rotate(180deg)";
    }

    function closeDropdown() {
        dropdown.style.opacity = "0";
        dropdown.style.visibility = "hidden";
        dropdown.style.transform = "translateY(-10px)";
        chevronIcon.style.transform = "rotate(0deg)";
    }

    function toggleDropdown() {
        if (dropdown.style.opacity === "1") {
            closeDropdown();
        } 
        else {
            openDropdown();
        }
    }

    function closeDropdownOnClickOutside(event) {
        if (!customSelector.contains(event.target)) {
            closeDropdown();
        }
    }

    function setupEventListeners() {
        currentLanguage.addEventListener("click", function(e) {
            e.stopPropagation();
            toggleDropdown();
        });

        languageOptions.forEach(option => {
            option.addEventListener("click", function(e) {
                e.stopPropagation();
                const selectedValue = this.dataset.value;
                
                if (languageSelect) {
                    languageSelect.value = selectedValue;
                    
                    const changeEvent = new Event("change");
                    languageSelect.dispatchEvent(changeEvent);
                }
                
                updateCurrentLanguageDisplay(selectedValue);
                
                closeDropdown();
            });
        });

        document.addEventListener("click", closeDropdownOnClickOutside);

        document.addEventListener("keydown", function(e) {
            if (e.key === "Escape") {
                closeDropdown();
            }
        });
    }

    function init() {
        const savedLanguage = localStorage.getItem("preferredLanguage") || "pt-br";
        updateCurrentLanguageDisplay(savedLanguage);
        
        setupEventListeners();
        
        closeDropdown();
        
        console.log("Seletor de idiomas customizado inicializado");
    }

    init();
}

function initializePage() {
    console.log("Inicializando página...");

    initLanguageSelector();

    const languageSelect = document.getElementById("idiomaSite");
    if (languageSelect) {
        languageSelect.addEventListener("change", function() {
            console.log("Idioma alterado para:", this.value);
            
            if (typeof applyTranslation === "function") {
                applyTranslation(this.value);
            } 
            
            else {
                console.error("Função applyTranslation não encontrada");
            }
        });
    } 
    else {
        console.error("Select de idioma não encontrado");
    }

    const savedLanguage = localStorage.getItem("preferredLanguage") || "pt-br";
    console.log("💾 Idioma salvo:", savedLanguage);
    
    if (languageSelect) {
        languageSelect.value = savedLanguage;
    }

    if (typeof applyTranslation === "function") {
        applyTranslation(savedLanguage);
    }

    if (typeof translations !== "undefined") {
        console.log(`Traduções disponíveis: pt-br (${Object.keys(translations["pt-br"]).length} itens), en-us (${Object.keys(translations["en-us"]).length} itens)`);
    }

    console.log("Página inicializada com sucesso!");
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("📄 DOM completamente carregado");
    
    setTimeout(() => {
        initializePage();
    }, 100);
});

function checkFileExists(url) {
    return fetch(url, { method: "HEAD" })
        .then(response => response.ok)
        .catch(() => false);
}

function verifyFlags() {
    const flags = ["./assets/flags/br_flag.png", "./assets/flags/us_flag.png"];
    
    flags.forEach(flag => {
        checkFileExists(flag).then(exists => {
            if (!exists) {
                console.warn(`Bandeira não encontrada: ${flag}`);
            } 
            else {
                console.log(`Bandeira encontrada: ${flag}`);
            }
        });
    });
}

window.addEventListener("load", function() {
    setTimeout(verifyFlags, 500);
});

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section[id]");

    function activateLink(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${sectionId}`) {
                link.classList.add("active");
            }
        });
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    activateLink(entry.target.id);
                }
            });
        },
        {
            root: null,
            threshold: 0.2,
            rootMargin: "-100px 0px 0px 0px"
        }
    );

    sections.forEach(section => observer.observe(section));
});

// Contact Form Handler with EmailJS
document.addEventListener("DOMContentLoaded", () => {
    // Inicializar EmailJS
    emailjs.init("Ky9cHPuZRfL3lS1jY");
    
    const contactForm = document.getElementById("contact-form");
    
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            
            const nameInput = document.getElementById("name");
            const emailInput = document.getElementById("email");
            const messageInput = document.getElementById("message");
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            // Validação
            if (!nameInput.value.trim() || !emailInput.value.trim() || !messageInput.value.trim()) {
                alert("Por favor, preencha todos os campos!");
                return;
            }
            
            // Validação de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value)) {
                alert("Por favor, insira um email válido!");
                return;
            }
            
            // Desabilitar botão durante envio
            const originalText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.textContent = "Enviando...";
            
            try {
                // Enviar email usando EmailJS
                const response = await emailjs.send("service_portifolio_lucas", "template_contact_form", {
                    from_name: nameInput.value,
                    from_email: emailInput.value,
                    message: messageInput.value,
                    to_email: "freitas.lucasaf@gmail.com"
                });
                
                if (response.status === 200) {
                    alert("Mensagem enviada com sucesso! Obrigado pelo contato!");
                    contactForm.reset();
                    submitButton.textContent = "Mensagem Enviada! ✓";
                    
                    setTimeout(() => {
                        submitButton.textContent = originalText;
                        submitButton.disabled = false;
                    }, 3000);
                } 
                else {
                    throw new Error("Erro ao enviar mensagem");
                }
            } 
            catch (error) {
                console.error("Erro:", error);
                alert("Erro ao enviar mensagem. Por favor, tente novamente!");
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }
});


