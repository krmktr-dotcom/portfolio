// Gestion du menu burger avec overlay
function initBurgerMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (burgerMenu && navLinks) {
        // Fonction pour ouvrir le menu
        function openMenu() {
            burgerMenu.classList.add('active');
            navLinks.classList.add('active');
            body.classList.add('menu-open');
        }
        
        // Fonction pour fermer le menu
        function closeMenu() {
            burgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
        
        // Toggle du menu au clic sur le burger
        burgerMenu.addEventListener('click', function(event) {
            event.stopPropagation();
            
            if (navLinks.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });
        
        // Fermer le menu quand on clique sur un lien
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });
        
        // Fermer le menu si on clique sur l'overlay (en dehors du menu)
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnBurger = burgerMenu.contains(event.target);
            
            // Si le menu est ouvert et qu'on clique ni sur le menu ni sur le burger
            if (!isClickInsideNav && !isClickOnBurger && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
        
        // Empêcher la propagation des clics à l'intérieur du menu
        navLinks.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
}

// Données des projets
const projectsData = [
    {
        title: "Pipeline ETL Météo",
        description: "Extraction, transformation et chargement de données météorologiques depuis l'API OpenWeather vers PostgreSQL avec Python.",
        categories: ["etl", "db"],
        tech: "Python, Pandas, PostgreSQL, Airflow",
        icon: "🌤️",
        link: "#"
    },
    {
        title: "Dashboard Power BI - Ventes",
        description: "Création d'un tableau de bord interactif pour analyser les performances commerciales d'une entreprise fictive.",
        categories: ["viz"],
        tech: "Power BI, DAX, SQL Server",
        icon: "📊",
        link: "#"
    },
    {
        title: "Prédiction de Prix Immobilier",
        description: "Modèle de Machine Learning pour prédire les prix immobiliers basé sur des données de transactions réelles.",
        categories: ["ml"],
        tech: "Python, scikit-learn, XGBoost, Jupyter",
        icon: "🏠",
        link: "#"
    },
    {
        title: "API REST pour Analytics",
        description: "Développement d'une API RESTful pour exposer des données analytiques avec authentification JWT.",
        categories: ["web", "db"],
        tech: "Flask, PostgreSQL, JWT, Docker",
        icon: "🔌",
        link: "#"
    },
    {
        title: "Data Warehouse Université",
        description: "Conception et implémentation d'un entrepôt de données pour l'analyse des résultats académiques.",
        categories: ["db", "etl"],
        tech: "PostgreSQL, Python, DBT, Talend",
        icon: "🎓",
        link: "#"
    },
    {
        title: "Visualisation D3.js - COVID",
        description: "Application web interactive de visualisation de l'évolution du COVID-19 avec graphiques animés.",
        categories: ["viz", "web"],
        tech: "JavaScript, D3.js, HTML/CSS",
        icon: "📈",
        link: "#"
    },
    {
        title: "Clustering de Clients",
        description: "Segmentation de clients avec K-means pour identifier des groupes comportementaux distincts.",
        categories: ["ml"],
        tech: "Python, scikit-learn, Matplotlib, Seaborn",
        icon: "👥",
        link: "#"
    },
    {
        title: "Scraper de Données Web",
        description: "Script Python pour extraire automatiquement des données de sites e-commerce et les stocker dans une base.",
        categories: ["etl", "web"],
        tech: "Python, BeautifulSoup, Selenium, MongoDB",
        icon: "🕷️",
        link: "#"
    },
    {
        title: "Tableau de Bord Temps Réel",
        description: "Dashboard en temps réel affichant des métriques de serveurs avec Grafana et InfluxDB.",
        categories: ["viz", "db"],
        tech: "Grafana, InfluxDB, Python, Telegraf",
        icon: "⚡",
        link: "#"
    },
    {
        title: "Analyse Sentiment Twitter",
        description: "Analyse de sentiments sur des tweets en temps réel avec traitement du langage naturel.",
        categories: ["ml", "etl"],
        tech: "Python, NLTK, Tweepy, Spark",
        icon: "💬",
        link: "#"
    },
    {
        title: "Optimisation SQL Complexes",
        description: "Projet d'optimisation de requêtes SQL et création d'index pour améliorer les performances de 70%.",
        categories: ["db"],
        tech: "PostgreSQL, Query Planning, Indexation",
        icon: "⚙️",
        link: "#"
    },
    {
        title: "Data Pipeline Apache Kafka",
        description: "Mise en place d'un pipeline de streaming de données avec Kafka pour traitement en temps réel.",
        categories: ["etl"],
        tech: "Apache Kafka, Python, Docker, Zookeeper",
        icon: "🚀",
        link: "#"
    }
];

// Fonction pour créer une carte de projet
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-categories', project.categories.join(','));
    
    card.innerHTML = `
        <div class="project-image">
            ${project.icon}
        </div>
        <div class="project-content">
            <h3 class="project-title">${project.title}</h3>
            <div class="project-tags">
                ${project.categories.map(cat => `<span class="project-tag">${getCategoryName(cat)}</span>`).join('')}
            </div>
            <p class="project-description">${project.description}</p>
            <p class="project-tech"><strong>Technologies:</strong> ${project.tech}</p>
            <a href="${project.link}" class="project-link">Voir le projet →</a>
        </div>
    `;
    
    return card;
}

// Fonction pour obtenir le nom complet d'une catégorie
function getCategoryName(category) {
    const names = {
        'etl': 'ETL & Pipelines',
        'viz': 'Visualisation',
        'ml': 'Machine Learning',
        'db': 'Bases de données',
        'web': 'Web & API'
    };
    return names[category] || category;
}

// Fonction pour afficher les projets
function displayProjects(filter = 'all') {
    const container = document.getElementById('projectsContainer');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    projectsData.forEach(project => {
        if (filter === 'all' || project.categories.includes(filter)) {
            const card = createProjectCard(project);
            container.appendChild(card);
        }
    });
}

// Fonction pour gérer le filtrage
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Obtenir la catégorie du filtre
            const filterCategory = this.getAttribute('data-filter');
            
            // Afficher les projets filtrés
            displayProjects(filterCategory);
        });
    });
}

// Animation au scroll pour les cartes de projets
function animateOnScroll() {
    const cards = document.querySelectorAll('.project-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s, transform 0.5s';
        observer.observe(card);
    });
}

// Fonction d'initialisation
function init() {
    // Initialiser le menu burger
    initBurgerMenu();
    
    // Si on est sur la page projets, afficher les projets et configurer les filtres
    if (document.getElementById('projectsContainer')) {
        displayProjects();
        setupFilters();
        
        // Petit délai pour l'animation
        setTimeout(() => {
            animateOnScroll();
        }, 100);
    }
    
    // Smooth scroll pour tous les liens internes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Lancer l'initialisation quand le DOM est chargé
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
