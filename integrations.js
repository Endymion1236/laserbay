// Intégration PayPal
function initPayPalButton() {
    if (document.getElementById('paypal-button-container')) {
        paypal.Buttons({
            style: {
                shape: 'rect',
                color: 'blue',
                layout: 'vertical',
                label: 'pay',
            },

            createOrder: function(data, actions) {
                // Récupérer les informations du formulaire de réservation
                const formule = document.getElementById('formule').value;
                const participants = document.getElementById('participants').value;
                
                // Calculer le prix total
                let prixUnitaire = 0;
                switch(formule) {
                    case 'Standard (1h)':
                        prixUnitaire = 20;
                        break;
                    case 'Premium (2h)':
                        prixUnitaire = 35;
                        break;
                    case 'VIP (3h)':
                        prixUnitaire = 45;
                        break;
                    default:
                        prixUnitaire = 20;
                }
                
                const total = prixUnitaire * participants;
                
                return actions.order.create({
                    purchase_units: [{
                        description: 'Réservation LaserBay - ' + formule,
                        amount: {
                            currency_code: 'EUR',
                            value: total
                        }
                    }]
                });
            },

            onApprove: function(data, actions) {
                return actions.order.capture().then(function(orderData) {
                    // Afficher un message de confirmation
                    const confirmationMessage = document.createElement('div');
                    confirmationMessage.classList.add('alert', 'alert-success');
                    confirmationMessage.innerHTML = 'Paiement effectué avec succès ! Votre réservation est confirmée.';
                    
                    const paypalButtonContainer = document.getElementById('paypal-button-container');
                    paypalButtonContainer.innerHTML = '';
                    paypalButtonContainer.appendChild(confirmationMessage);
                    
                    // Envoyer les données de réservation au serveur (à implémenter)
                    console.log('Réservation confirmée:', orderData);
                });
            },

            onError: function(err) {
                console.log(err);
                alert('Une erreur est survenue lors du traitement du paiement. Veuillez réessayer.');
            }
        }).render('#paypal-button-container');
    }
}

// Intégration Google Maps
function initMap() {
    if (document.getElementById('map')) {
        // Coordonnées d'Agon-Coutainville
        const agonCoutainville = { lat: 49.0481, lng: -1.5978 };
        
        // Créer la carte
        const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: agonCoutainville,
            mapTypeId: 'roadmap',
            styles: [
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        { "color": "#2b97a8" }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [
                        { "color": "#f5f0e3" }
                    ]
                }
            ]
        });
        
        // Ajouter un marqueur pour LaserBay
        const marker = new google.maps.Marker({
            position: agonCoutainville,
            map: map,
            title: 'LaserBay - LaserTag en plein air',
            animation: google.maps.Animation.DROP
        });
        
        // Ajouter une infobulle
        const infowindow = new google.maps.InfoWindow({
            content: '<div><strong>LaserBay</strong><br>LaserTag en plein air<br>Plage d\'Agon-Coutainville<br>50230 Agon-Coutainville</div>'
        });
        
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
        
        // Ouvrir l'infobulle par défaut
        infowindow.open(map, marker);
    }
}
