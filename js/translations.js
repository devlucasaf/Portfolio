// js/translations.js

const translations = {
    'pt-br': {
        // Meta informações
        'title': 'Portfólio - Lucas',
        
        // Navegação (atualizado para usar classes)
        'nav-home': 'Home',
        'nav-sobre': 'Sobre Mim',
        'nav-skills': 'Skills',
        'nav-projetos': 'Meus Projetos',
        'nav-contatos': 'Contatos',
        
        // Seções
        'welcome': 'Bem-vindo ao meu portfólio',
        'about-title': 'Sobre Mim',
        'about-text': 'Sou um desenvolvedor apaixonado por tecnologia...',
        
        // Seção Skills
        'skills-title': 'Minhas Skills',
        'python': 'Python',
        'java': 'Java',
        'ruby': 'Ruby',
        'sql': 'SQL',
        'html': 'HTML',
        'css': 'CSS',
        'javascript': 'JavaScript',
        'pycharm': 'PyCharm',
        'intellij': 'IntelliJ',
        'rubymine': 'RubyMine',
        'vs-code': 'Visual Studio Code',
        'visual-studio': 'Visual Studio',
        'pgadmin4': 'PGAdmin4',
        'git': 'Git',
        'github': 'GitHub',
        'pacote-office': 'Pacote Office 365',
        'excel': 'Excel',
        'word': 'Word',
        'power-point': 'Power Point',
        
        // Seção Projetos (adicione quando criar)
        'projects-title': 'Meus Projetos',
        'java-project-title': 'Estudos em Java',
        'java-project-desc': 'Repositório com exercícios e projetos do curso de Java',
        
        // Seção Contato (adicione quando criar)
        'contact-title': 'Contato',
        'contact-text': 'Entre em contato comigo através das redes sociais.',
        'email-placeholder': 'Seu e-mail',
        'message-placeholder': 'Sua mensagem',
        'send-button': 'Enviar',
        
        // Footer
        'copyright': '© 2024 Lucas. Todos os direitos reservados.'
    },
    
    'en-us': {
        // Meta information
        'title': 'Portfolio - Lucas',
        
        // Navigation (updated for classes)
        'nav-home': 'Home',
        'nav-sobre': 'About Me',
        'nav-skills': 'Skills',
        'nav-projetos': 'My Projects',
        'nav-contatos': 'Contact',
        
        // Sections
        'welcome': 'Welcome to my portfolio',
        'about-title': 'About Me',
        'about-text': 'I am a developer passionate about technology...',
        
        // Skills Section
        'skills-title': 'My Skills',
        'python': 'Python',
        'java': 'Java',
        'ruby': 'Ruby',
        'sql': 'SQL',
        'html': 'HTML',
        'css': 'CSS',
        'javascript': 'JavaScript',
        'pycharm': 'PyCharm',
        'intellij': 'IntelliJ',
        'rubymine': 'RubyMine',
        'vs-code': 'Visual Studio Code',
        'visual-studio': 'Visual Studio',
        'pgadmin4': 'PGAdmin4',
        'git': 'Git',
        'github': 'GitHub',
        'pacote-office': 'Office 365 Suite',
        'excel': 'Excel',
        'word': 'Word',
        'power-point': 'Power Point',
        
        // Projects Section (add when you create it)
        'projects-title': 'My Projects',
        'java-project-title': 'Java Studies',
        'java-project-desc': 'Repository with exercises and projects from Java course',
        
        // Contact Section (add when you create it)
        'contact-title': 'Contact',
        'contact-text': 'Get in touch with me through social media.',
        'email-placeholder': 'Your email',
        'message-placeholder': 'Your message',
        'send-button': 'Send',
        
        // Footer
        'copyright': '© 2024 Lucas. All rights reserved.'
    }
};

// Função para aplicar tradução
function applyTranslation(language) {
    // Atualizar título da página
    if (translations[language] && translations[language]['title']) {
        document.title = translations[language]['title'];
    }
    
    // Atualizar todos os elementos com data-key
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[language] && translations[language][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[language][key];
            } else {
                element.textContent = translations[language][key];
            }
        }
    });
    
    // Atualizar elementos por classe (para seus links de navegação)
    updateElementsByClass(language);
    
    // Atualizar nomes das tecnologias
    updateTechnologyNames(language);
    
    // Salvar preferência
    localStorage.setItem('preferredLanguage', language);
}

// Função para atualizar elementos por classe (navegação)
function updateElementsByClass(language) {
    const navClasses = ['nav-home', 'nav-sobre', 'nav-skills', 'nav-projetos', 'nav-contatos'];
    
    navClasses.forEach(className => {
        const elements = document.getElementsByClassName(className);
        if (elements.length > 0 && translations[language] && translations[language][className]) {
            for (let element of elements) {
                element.textContent = translations[language][className];
            }
        }
    });
    
    // Atualizar título da seção skills (que tem classe "autoDisplay")
    const skillsTitle = document.querySelector('.autoDisplay');
    if (skillsTitle && translations[language] && translations[language]['skills-title']) {
        skillsTitle.textContent = translations[language]['skills-title'];
    }
}

// Função para atualizar nomes das tecnologias
function updateTechnologyNames(language) {
    const techElements = document.querySelectorAll('.tec-name');
    
    techElements.forEach(element => {
        const techKey = getTechKeyFromText(element.textContent);
        if (techKey && translations[language] && translations[language][techKey]) {
            element.textContent = translations[language][techKey];
        }
    });
}

// Função auxiliar para mapear texto para chave de tradução
function getTechKeyFromText(text) {
    const textMap = {
        // Tecnologias
        'Python': 'python',
        'Java': 'java',
        'Ruby': 'ruby',
        'SQL': 'sql',
        'HTML': 'html',
        'CSS': 'css',
        'JavaScript': 'javascript',
        
        // Ferramentas
        'PyCharm': 'pycharm',
        'IntelliJ': 'intellij',
        'RubyMine': 'rubymine',
        'Visual Studio Code': 'vs-code',
        'Visual Studio': 'visual-studio',
        'PGAdmin4': 'pgadmin4',
        'Git': 'git',
        'GitHub': 'github',
        
        // Office
        'Pacote Office 365': 'pacote-office',
        'Excel': 'excel',
        'Word': 'word',
        'Power Point': 'power-point'
    };
    
    return textMap[text];
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Configurar evento no select
    const languageSelect = document.getElementById('idiomaSite');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            applyTranslation(this.value);
        });
    }
    
    // Carregar idioma salvo ou usar padrão
    const savedLanguage = localStorage.getItem('preferredLanguage') || 'pt-br';
    const languageSelectElement = document.getElementById('idiomaSite');
    
    if (languageSelectElement) {
        languageSelectElement.value = savedLanguage;
    }
    
    // Aplicar tradução
    applyTranslation(savedLanguage);
});

// Exportar para uso global
window.translations = translations;
window.applyTranslation = applyTranslation;