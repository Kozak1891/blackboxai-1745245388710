// Form Validation
document.addEventListener('DOMContentLoaded', function() {
    // Login Form Validation
    const loginForm = document.querySelector('form[action="#"]');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('email-address').value;
            const password = document.getElementById('password').value;

            if (!email || !password) {
                showNotification('Veuillez remplir tous les champs', 'error');
                return;
            }

            // Simulate login - In real application, this would be an API call
            showNotification('Connexion réussie', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard-actor.html';
            }, 1500);
        });
    }

    // Registration Form Validation
    const registerForm = document.querySelector('form[action="#"]');
    if (registerForm && document.title.includes('Inscription')) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email-address').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('password-confirm').value;
            const terms = document.getElementById('terms').checked;

            if (!name || !email || !password || !confirmPassword) {
                showNotification('Veuillez remplir tous les champs', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showNotification('Les mots de passe ne correspondent pas', 'error');
                return;
            }

            if (!terms) {
                showNotification('Veuillez accepter les conditions d\'utilisation', 'error');
                return;
            }

            // Simulate registration - In real application, this would be an API call
            showNotification('Inscription réussie', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard-actor.html';
            }, 1500);
        });
    }

    // Casting Post Form Validation
    const castingForm = document.querySelector('form');
    if (castingForm && document.title.includes('Publier un Casting')) {
        castingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const title = document.querySelector('input[placeholder="Titre du projet"]').value;
            const description = document.querySelector('textarea').value;

            if (!title || !description) {
                showNotification('Veuillez remplir au moins le titre et la description', 'error');
                return;
            }

            // Simulate casting creation - In real application, this would be an API call
            showNotification('Casting publié avec succès', 'success');
            setTimeout(() => {
                window.location.href = 'dashboard-director.html';
            }, 1500);
        });
    }
});

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-500 translate-y-[-100%] opacity-0`;
    
    // Set style based on type
    switch(type) {
        case 'success':
            notification.classList.add('bg-green-500', 'text-white');
            break;
        case 'error':
            notification.classList.add('bg-red-500', 'text-white');
            break;
        default:
            notification.classList.add('bg-blue-500', 'text-white');
    }

    notification.textContent = message;

    // Add to DOM
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.classList.remove('translate-y-[-100%]', 'opacity-0');
    }, 100);

    // Remove after delay
    setTimeout(() => {
        notification.classList.add('translate-y-[-100%]', 'opacity-0');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}

// Mobile Menu Toggle
const mobileMenuButton = document.querySelector('button.md\\:hidden');
if (mobileMenuButton) {
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'md:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-40 hidden';
    mobileMenu.innerHTML = `
        <div class="fixed inset-y-0 right-0 max-w-xs w-full bg-white shadow-xl z-50 transform transition-transform duration-300 translate-x-full">
            <div class="p-6">
                <div class="flex items-center justify-between mb-8">
                    <h2 class="text-2xl font-bold text-gray-800">Menu</h2>
                    <button class="text-gray-600 hover:text-gray-800">
                        <i class="fas fa-times text-2xl"></i>
                    </button>
                </div>
                <nav class="space-y-4">
                    <a href="#" class="block text-gray-600 hover:text-blue-600">Accueil</a>
                    <a href="#" class="block text-gray-600 hover:text-blue-600">Castings</a>
                    <a href="#" class="block text-gray-600 hover:text-blue-600">À propos</a>
                    <a href="#" class="block text-gray-600 hover:text-blue-600">Contact</a>
                    <a href="pages/login.html" class="block px-4 py-2 text-center text-white bg-blue-600 rounded-md hover:bg-blue-700">Connexion</a>
                </nav>
            </div>
        </div>
    `;

    document.body.appendChild(mobileMenu);

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('hidden');
        requestAnimationFrame(() => {
            mobileMenu.querySelector('div').classList.remove('translate-x-full');
        });
    });

    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu || e.target.closest('button')) {
            mobileMenu.querySelector('div').classList.add('translate-x-full');
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
        }
    });
}

// Search and Filter Functionality
const searchInput = document.querySelector('input[placeholder="Rechercher un casting..."]');
if (searchInput) {
    searchInput.addEventListener('input', debounce(function(e) {
        // In a real application, this would trigger an API call
        console.log('Searching for:', e.target.value);
    }, 300));
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle Casting Application
const applyButtons = document.querySelectorAll('button:not([type="submit"])');
applyButtons.forEach(button => {
    if (button.textContent.trim() === 'Postuler') {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // In a real application, this would trigger an API call
            const wasApplied = this.classList.contains('bg-gray-600');
            
            if (wasApplied) {
                this.classList.remove('bg-gray-600');
                this.classList.add('bg-blue-600');
                this.textContent = 'Postuler';
                showNotification('Candidature retirée', 'info');
            } else {
                this.classList.remove('bg-blue-600');
                this.classList.add('bg-gray-600');
                this.textContent = 'Candidature envoyée';
                showNotification('Candidature envoyée avec succès', 'success');
            }
        });
    }
});
