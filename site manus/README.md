# LaserBay - Site Web de LaserTag en Plein Air

Ce dépôt contient les fichiers du site web LaserBay, un centre de LaserTag en plein air situé à Agon-Coutainville.

## Structure du Projet

```
laserbay/
├── css/
│   ├── style.css       # Styles principaux du site
│   └── effects.css     # Effets visuels et animations CSS
├── js/
│   ├── main.js         # Fonctionnalités JavaScript principales
│   ├── integrations.js # Intégrations PayPal et Google Maps
│   └── form-handler.js # Gestion des formulaires
├── images/
│   ├── logo.svg        # Logo LaserBay
│   └── hero-background.jpeg # Image d'arrière-plan principale
├── index.html          # Page d'accueil
├── experience.html     # Page Notre Expérience
├── formules.html       # Page Formules & Tarifs
├── evenements.html     # Page Événements
├── reservation.html    # Page Réservation
└── contact.html        # Page Contact
```

## Technologies Utilisées

- HTML5
- CSS3 (avec animations et effets visuels)
- JavaScript
- PayPal API pour les paiements
- Google Maps API pour la localisation
- Font Awesome pour les icônes

## Fonctionnalités Implémentées

- Design responsive adapté à tous les appareils
- Navigation intuitive
- Intégration PayPal pour les paiements en ligne
- Intégration Google Maps pour la localisation
- Formulaires de contact et de réservation
- Effets visuels et animations CSS
- Optimisation des performances

## Instructions de Déploiement

### Prérequis

- Un hébergeur web supportant HTML, CSS et JavaScript
- Un compte PayPal Business pour les paiements en ligne
- Une clé API Google Maps pour l'intégration de la carte

### Étapes de Déploiement

1. **Obtenir une clé API Google Maps**
   - Rendez-vous sur [Google Cloud Platform](https://console.cloud.google.com/)
   - Créez un projet et activez l'API Maps JavaScript
   - Générez une clé API
   - Remplacez `YOUR_API_KEY` dans le fichier `contact.html` par votre clé API

2. **Configurer PayPal**
   - Votre Client ID PayPal est déjà intégré dans le fichier `reservation.html`
   - Assurez-vous que votre compte PayPal est configuré pour recevoir des paiements

3. **Configurer l'envoi des formulaires**
   - Pour une solution simple, vous pouvez utiliser un service comme Formspree ou Netlify Forms
   - Pour une solution personnalisée, modifiez le fichier `form-handler.js` pour envoyer les données à votre serveur

4. **Télécharger les fichiers sur votre hébergeur**
   - Utilisez FTP ou le gestionnaire de fichiers de votre hébergeur
   - Conservez la structure des dossiers telle quelle

5. **Tester le site**
   - Vérifiez que toutes les pages s'affichent correctement
   - Testez les formulaires de contact et de réservation
   - Vérifiez l'intégration PayPal en effectuant un paiement test
   - Assurez-vous que la carte Google Maps s'affiche correctement

## Personnalisation

### Modifier les Couleurs

Les couleurs principales du site sont définies dans le fichier `css/style.css` :

```css
:root {
    --primary-color: #2b97a8;    /* Bleu-vert */
    --secondary-color: #0e3b55;  /* Bleu marine */
    --accent-color: #e0523a;     /* Orange-rouge */
    --dark-color: #0e3b55;       /* Bleu marine (même que secondary) */
    --light-color: #f5f0e3;      /* Beige clair */
    --text-color: #333333;       /* Gris foncé */
    --bg-light: #ffffff;         /* Blanc */
}
```

### Ajouter des Images

Pour ajouter de nouvelles images :
1. Placez les images dans le dossier `images/`
2. Référencez-les dans les fichiers HTML avec le chemin relatif `images/nom-de-l-image.jpg`

### Modifier le Contenu

Chaque page HTML peut être modifiée directement pour mettre à jour le contenu :
- Textes
- Images
- Tarifs
- Horaires
- Coordonnées

## Maintenance

### Mises à Jour Régulières

- Mettez à jour les informations de contact si nécessaire
- Actualisez les tarifs et les formules
- Ajoutez de nouvelles images pour maintenir le site frais et attractif

### Sécurité

- Gardez votre clé API Google Maps privée
- Mettez régulièrement à jour les bibliothèques externes (comme Font Awesome)
- Surveillez les transactions PayPal pour détecter toute activité suspecte

## Support

Pour toute question ou assistance technique, contactez le développeur du site.

---

© 2025 LaserBay - Tous droits réservés
