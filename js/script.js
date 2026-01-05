function initLanguageButtons() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    if (!langButtons.length) return; 
    
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');

            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            applyTranslation(lang);

            const select = document.getElementById('idiomaSite');
            if (select) select.value = lang;
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    
    initLanguageButtons(); 
});

const translations = {
    'pt-br': {
        // Meta informações
        'title': 'Portfólio - Lucas',
        
        // Navegação
        'nav-home': 'Home',
        'nav-sobre': 'Sobre Mim',
        'nav-skills': 'Skills',
        'nav-projetos': 'Meus Projetos',
        'nav-contatos': 'Contatos',
        
        // Hero Section
        'welcome': 'Bem-vindo ao meu portfólio',
        'hero-subtitle': 'Desenvolvedor Full Stack | Java | Python | Ruby',
        'view-projects': 'Ver Projetos',
        'contact-me': 'Contate-me',
        'scroll-down': 'Role para baixo',
        
        // About Section
        'about-title': 'Sobre Mim',
        'about-text': 'Sou um desenvolvedor apaixonado por tecnologia, com foco em criar soluções inovadoras e eficientes. Atualmente estou aprofundando meus conhecimentos em Java, Python e desenvolvimento web.',
        'about-text-2': 'Meu objetivo é me tornar um desenvolvedor full stack de excelência, contribuindo para projetos desafiadores que impactem positivamente a vida das pessoas.',
        'projects-completed': 'Projetos Concluídos',
        'languages': 'Linguagens Dominadas',
        'courses': 'Cursos em Andamento',
        
        // Skills Section
        'skills-title': 'Minhas Skills',
        'programming-languages': 'Linguagens de Programação',
        'web-technologies': 'Tecnologias Web',
        'tools-technologies': 'Ferramentas & Tecnologias',
        
        // Tecnologias
        'python': 'Python',
        'java': 'Java',
        'ruby': 'Ruby',
        'javascript': 'JavaScript',
        'html': 'HTML',
        'css': 'CSS',
        'sql': 'SQL',
        
        // Ferramentas
        'git': 'Git',
        'github': 'GitHub',
        'vs-code': 'VS Code',
        'intellij': 'IntelliJ',
        'pycharm': 'PyCharm',
        'rubymine': 'RubyMine',
        'visual-studio': 'Visual Studio',
        'pgadmin4': 'PGAdmin4',
        
        // Projects Section
        'projects-title': 'Meus Projetos',
        'java-project-title': 'Estudos em Java',
        'java-project-desc': 'Repositório com exercícios e projetos do curso de Java, incluindo programação orientada a objetos e estruturas de dados.',
        'portfolio-project-title': 'Portfólio Online',
        'portfolio-project-desc': 'Este portfólio responsivo desenvolvido com HTML, CSS e JavaScript, com suporte a múltiplos idiomas e tema escuro/claro.',
        'coming-soon-title': 'Em Breve',
        'coming-soon-desc': 'Novo projeto em desenvolvimento utilizando tecnologias modernas e melhores práticas de desenvolvimento.',
        'view-project': 'Ver Projeto',
        'coming-soon': 'Em Breve',
        
        // Contact Section
        'contact-title': 'Entre em Contato',
        'contact-text': 'Estou sempre aberto a novas oportunidades e conversas sobre tecnologia. Vamos construir algo incrível juntos!',
        'email': 'E-mail',
        'github': 'GitHub',
        'location': 'Localização',
        'brazil': 'Brasil',
        'name-label': 'Nome',
        'email-label': 'E-mail',
        'message-label': 'Mensagem',
        'send-message': 'Enviar Mensagem',
        
        // Footer
        'footer-text': 'Desenvolvido com ❤️ e muito código',
        'copyright': '© 2025 Lucas. Todos os direitos reservados.'
    },
    
    'en-us': {
        // Meta information
        'title': 'Portfolio - Lucas',
        
        // Navigation
        'nav-home': 'Home',
        'nav-sobre': 'About Me',
        'nav-skills': 'Skills',
        'nav-projetos': 'My Projects',
        'nav-contatos': 'Contact',
        
        // Hero Section
        'welcome': 'Welcome to my portfolio',
        'hero-subtitle': 'Full Stack Developer | Java | Python | Ruby',
        'view-projects': 'View Projects',
        'contact-me': 'Contact Me',
        'scroll-down': 'Scroll Down',
        
        // About Section
        'about-title': 'About Me',
        'about-text': 'I am a developer passionate about technology, focused on creating innovative and efficient solutions. I am currently deepening my knowledge in Java, Python and web development.',
        'about-text-2': 'My goal is to become an excellent full stack developer, contributing to challenging projects that positively impact people\'s lives.',
        'projects-completed': 'Projects Completed',
        'languages': 'Languages Mastered',
        'courses': 'Courses in Progress',
        
        // Skills Section
        'skills-title': 'My Skills',
        'programming-languages': 'Programming Languages',
        'web-technologies': 'Web Technologies',
        'tools-technologies': 'Tools & Technologies',
        
        // Technologies
        'python': 'Python',
        'java': 'Java',
        'ruby': 'Ruby',
        'javascript': 'JavaScript',
        'html': 'HTML',
        'css': 'CSS',
        'sql': 'SQL',
        
        // Tools
        'git': 'Git',
        'github': 'GitHub',
        'vs-code': 'VS Code',
        'intellij': 'IntelliJ',
        'pycharm': 'PyCharm',
        'rubymine': 'RubyMine',
        'visual-studio': 'Visual Studio',
        'pgadmin4': 'PGAdmin4',
        
        // Projects Section
        'projects-title': 'My Projects',
        'java-project-title': 'Java Studies',
        'java-project-desc': 'Repository with exercises and projects from the Java course, including object-oriented programming and data structures.',
        'portfolio-project-title': 'Online Portfolio',
        'portfolio-project-desc': 'This responsive portfolio developed with HTML, CSS and JavaScript, with support for multiple languages and dark/light theme.',
        'coming-soon-title': 'Coming Soon',
        'coming-soon-desc': 'New project under development using modern technologies and best development practices.',
        'view-project': 'View Project',
        'coming-soon': 'Coming Soon',
        
        // Contact Section
        'contact-title': 'Get in Touch',
        'contact-text': 'I am always open to new opportunities and conversations about technology. Let\'s build something amazing together!',
        'email': 'Email',
        'github': 'GitHub',
        'location': 'Location',
        'brazil': 'Brazil',
        'name-label': 'Name',
        'email-label': 'Email',
        'message-label': 'Message',
        'send-message': 'Send Message',
        
        // Footer
        'footer-text': 'Built with ❤️ and lots of code',
        'copyright': '© 2025 Lucas. All rights reserved.'
    }
};
