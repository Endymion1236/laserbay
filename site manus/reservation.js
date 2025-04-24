document.addEventListener('DOMContentLoaded', function() {
    // Liste des créneaux bloqués (à modifier selon vos besoins)
    const blockedSlots = {
        '2025-04-20': ['10:00', '11:00'], // 20 avril : bloquer 10h et 11h
        '2025-04-21': ['14:00', '15:00']  // 21 avril : bloquer 14h et 15h
    };
    
    // Éléments du formulaire
    const dateInput = document.getElementById('date');
    const timeSelect = document.getElementById('time');
    
    // Mettre à jour les créneaux disponibles quand la date change
    dateInput.addEventListener('change', function() {
        const selectedDate = this.value;
        updateAvailableSlots(selectedDate);
    });
    
    // Fonction pour mettre à jour les créneaux
    function updateAvailableSlots(selectedDate) {
        // Récupérer la liste des heures bloquées pour cette date
        const blockedHours = blockedSlots[selectedDate] || [];
        
        // Parcourir toutes les options d'heures
        Array.from(timeSelect.options).forEach(option => {
            if (option.value === '') return; // Ignorer l'option vide
            
            // Vérifier si cette heure est bloquée
            if (blockedHours.includes(option.value)) {
                option.disabled = true;
                option.text = `${option.value} (Non disponible)`;
            } else {
                option.disabled = false;
                option.text = option.value;
            }
        });
    }
});