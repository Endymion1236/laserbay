// Système d'envoi de formulaires par email
function setupFormSubmission() {
    // Formulaire de contact
    const contactForm = document.querySelector('.reservation-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simuler l'envoi du formulaire
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Envoi en cours...';
            submitButton.disabled = true;
            
            // Simuler un délai d'envoi
            setTimeout(function() {
                // Créer un message de confirmation
                const confirmationMessage = document.createElement('div');
                confirmationMessage.classList.add('alert', 'alert-success');
                confirmationMessage.style.backgroundColor = '#d4edda';
                confirmationMessage.style.color = '#155724';
                confirmationMessage.style.padding = '1rem';
                confirmationMessage.style.marginTop = '1rem';
                confirmationMessage.style.borderRadius = '5px';
                confirmationMessage.innerHTML = 'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.';
                
                // Insérer le message après le formulaire
                contactForm.parentNode.insertBefore(confirmationMessage, contactForm.nextSibling);
                
                // Réinitialiser le formulaire
                contactForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Faire défiler jusqu'au message de confirmation
                confirmationMessage.scrollIntoView({ behavior: 'smooth' });
                
                // Dans une implémentation réelle, le code suivant serait utilisé pour envoyer les données à un serveur
                /*
                const formData = new FormData(contactForm);
                fetch('https://example.com/submit-form', {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    console.log('Success:', data);
                    // Afficher un message de confirmation
                })
                .catch(error => {
                    console.error('Error:', error);
                    // Afficher un message d'erreur
                });
                */
            }, 1500);
        });
    }
}

// Initialiser le système d'envoi de formulaires lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    setupFormSubmission();
});
