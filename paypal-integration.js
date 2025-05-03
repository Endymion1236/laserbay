// Attendre que le DOM soit complètement chargé
document.addEventListener('DOMContentLoaded', function() {
    // Vérifier si le script PayPal existe déjà
    let paypalScript = document.getElementById('paypal-script');
    
    // Si le script n'existe pas, le créer et l'ajouter à la page
    if (!paypalScript) {
        paypalScript = document.createElement('script');
        paypalScript.id = 'paypal-script';
        paypalScript.src = 'https://www.paypal.com/sdk/js?client-id=EKhshPdCsRLg1yflOz5_FQLJpf-0m0Gt6l4Ge1SFYQmfac7EqzUhmsfBrsbqqeybROdrHVQERDCsLNkM&currency=EUR';
        document.body.appendChild(paypalScript);
    }
    
    // Attendre que le script PayPal soit chargé
    paypalScript.addEventListener('load', function() {
        console.log('PayPal SDK chargé avec succès');
        initPayPalButton();
    });
    
    // Si PayPal est déjà chargé, initialiser le bouton immédiatement
    if (typeof paypal !== 'undefined') {
        console.log('PayPal est déjà chargé');
        initPayPalButton();
    }
    
    // Fonction pour initialiser le bouton PayPal
    function initPayPalButton() {
        const paypalButtonContainer = document.getElementById('paypal-button-container');
        if (!paypalButtonContainer) {
            console.error("Le conteneur de bouton PayPal n'existe pas");
            return;
        }
        
        // Sélectionnez les éléments nécessaires du formulaire
        const packageSelect = document.getElementById('package');
        const summaryTotal = document.getElementById('summary-total');
        
        // Vider le conteneur avant d'ajouter le bouton
        paypalButtonContainer.innerHTML = '';
        
        // Créer le bouton PayPal
        paypal.Buttons({
            style: {
                layout: 'vertical',
                color: 'blue',
                shape: 'rect',
                label: 'pay'
            },
            
            createOrder: function(data, actions) {
                // Récupérer le montant du résumé ou utiliser une valeur par défaut
                let amount = 0;
                if (summaryTotal) {
                    const amountText = summaryTotal.textContent;
                    amount = parseFloat(amountText.replace('€', '').replace(',', '.')) || 15;
                } else {
                    console.warn("L'élément summary-total n'a pas été trouvé, utilisation du montant par défaut");
                    amount = 15;
                }
                
                // Récupérer la description du package sélectionné
                let description = "Réservation LaserBay";
                if (packageSelect && packageSelect.selectedIndex > 0) {
                    description += " - " + packageSelect.options[packageSelect.selectedIndex].text;
                }
                
                console.log(`Création d'une commande PayPal pour ${amount}€`);
                
                return actions.order.create({
                    purchase_units: [{
                        description: description,
                        amount: {
                            currency_code: 'EUR',
                            value: amount.toFixed(2)
                        }
                    }]
                });
            },
            
            onApprove: function(data, actions) {
                console.log('Paiement approuvé, capture en cours...');
                return actions.order.capture().then(function(details) {
                    console.log('Paiement capturé:', details);
                    alert(`Paiement effectué avec succès! Merci ${details.payer.name.given_name || ''} pour votre réservation. Vous recevrez bientôt un email de confirmation.`);
                    
                    // Réinitialiser le formulaire
                    const form = document.getElementById('reservation-form');
                    if (form) form.reset();
                    
                    // Mise à jour du récapitulatif si nécessaire
                    if (typeof updateSummary === 'function') {
                        updateSummary();
                    }
                });
            },
            
            onError: function(err) {
                console.error('Erreur PayPal:', err);
                alert('Une erreur est survenue lors du traitement du paiement. Veuillez réessayer ou choisir le paiement sur place.');
            }
        }).render('#paypal-button-container');
        
        console.log('Bouton PayPal rendu');
    }
    
    // Gestion des options de paiement
    const onlinePaymentRadio = document.getElementById('online');
    const onsitePaymentRadio = document.getElementById('onsite');
    const submitBtn = document.getElementById('submit-btn');
    
    if (onlinePaymentRadio && submitBtn) {
        onlinePaymentRadio.addEventListener('change', function() {
            if (this.checked) {
                submitBtn.classList.add('hidden');
                const paypalContainer = document.getElementById('paypal-button-container');
                if (paypalContainer) paypalContainer.classList.remove('hidden');
                
                // Initier PayPal si disponible
                if (typeof paypal !== 'undefined') {
                    initPayPalButton();
                } else {
                    console.log('Attente du chargement de PayPal...');
                }
            }
        });
    }
    
    if (onsitePaymentRadio && submitBtn) {
        onsitePaymentRadio.addEventListener('change', function() {
            if (this.checked) {
                submitBtn.classList.remove('hidden');
                const paypalContainer = document.getElementById('paypal-button-container');
                if (paypalContainer) paypalContainer.classList.add('hidden');
            }
        });
    }
    
    // Si le paiement en ligne est déjà sélectionné au chargement
    if (onlinePaymentRadio && onlinePaymentRadio.checked) {
        onlinePaymentRadio.dispatchEvent(new Event('change'));
    }
});