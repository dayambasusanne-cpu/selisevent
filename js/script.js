// script.js

// Smooth scrolling pour les liens d'ancrage
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du défilement fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Effets d'animation au survol des éléments du portfolio
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.12)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
        });
    });

    // Animation des cartes de service au survol
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animation des boutons au survol
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            if(this.classList.contains('btn-primary') || this.classList.contains('btn-secondary')) {
                this.style.transform = 'translateY(-3px)';
            }
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Animation des liens sociaux au survol
    const socialLinks = document.querySelectorAll('.social-links a');
    
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.backgroundColor = '#2ecc71';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        });
    });

    // Mise en évidence de l'élément de navigation actif lors du défilement
    const sections = document.querySelectorAll('section, .container > h2');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if(scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    // Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des valeurs
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation basique
        if (!firstName || !lastName || !message) {
            showMessage('Veuillez remplir tous les champs', 'error');
            return;
        }
        
        // Simulation d'envoi
        simulateSendMessage(firstName, lastName, message);
    });
    
    // Fonction de simulation d'envoi
    function simulateSendMessage(firstName, lastName, message) {
        // Sauvegarde du texte original du bouton
        const originalHTML = submitBtn.innerHTML;
        
        // Animation de chargement
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
        submitBtn.disabled = true;
        
        // Simulation d'attente (2 secondes)
        setTimeout(() => {
            // Ici, vous devriez envoyer les données à votre serveur
            // Exemple avec fetch :
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    message: message
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showMessage(`Merci ${firstName} ${lastName} ! Votre message a été envoyé.`, 'success');
                    contactForm.reset();
                } else {
                    showMessage('Une erreur est survenue. Veuillez réessayer.', 'error');
                }
            })
            .catch(error => {
                showMessage('Erreur de connexion. Veuillez réessayer.', 'error');
            })
            .finally(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            });
            */
            
            // Pour l'exemple, simulation réussie
            showMessage(`Merci ${firstName} ${lastName} ! Votre message a été envoyé. Je vous répondrai bientôt.`, 'success');
            
            // Réinitialisation du formulaire
            contactForm.reset();
            
            // Restauration du bouton
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            
        }, 2000);
    }
    
    // Fonction pour afficher des messages
    function showMessage(text, type) {
        // Supprime les anciens messages
        const oldMessage = document.querySelector('.message-alert');
        if (oldMessage) {
            oldMessage.remove();
        }
        
        // Crée le nouveau message
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-alert message-${type}`;
        messageDiv.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${text}</span>
            <button class="close-message"><i class="fas fa-times"></i></button>
        `;
        
        // Style du message
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#e8f5e9' : '#ffebee'};
            color: ${type === 'success' ? '#2e7d32' : '#c62828'};
            padding: 15px 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
            max-width: 400px;
        `;
        
        // Bouton de fermeture
        const closeBtn = messageDiv.querySelector('.close-message');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
            margin-left: 10px;
            font-size: 14px;
            opacity: 0.7;
            transition: opacity 0.2s;
        `;
        
        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.opacity = '1';
        });
        
        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.opacity = '0.7';
        });
        
        closeBtn.addEventListener('click', () => {
            messageDiv.remove();
        });
        
        // Ajoute le message à la page
        document.body.appendChild(messageDiv);
        
        // Animation CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Suppression automatique après 5 secondes
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.style.animation = 'slideOut 0.3s ease-out';
                
                // Ajoute l'animation de sortie
                const slideOutStyle = document.createElement('style');
                slideOutStyle.textContent = `
                    @keyframes slideOut {
                        from {
                            transform: translateX(0);
                            opacity: 1;
                        }
                        to {
                            transform: translateX(100%);
                            opacity: 0;
                        }
                    }
                `;
                document.head.appendChild(slideOutStyle);
                
                setTimeout(() => {
                    if (messageDiv.parentNode) {
                        messageDiv.remove();
                    }
                }, 300);
            }
        }, 5000);
    }
    
    // Animation des champs au focus
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
});

    // Effet de fondu au chargement de la page
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // === Menu hamburger (☰) ===
    const toggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-links');

    if(toggle && navMenu){
        toggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }
});