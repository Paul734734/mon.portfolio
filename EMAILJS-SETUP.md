# Configuration EmailJS - Portfolio Etouke Paul Jovani

## Configuration terminée ! 100% EmailJS

### Fichiers configurés :
- **index.html** : CDN EmailJS ajouté avec clé publique
- **main.js** : Formulaire adapté pour EmailJS
- **Fichiers Supabase supprimés** : supabase-config.js, setup_supabase.sql

---

## Template EmailJS requis

Dans votre dashboard EmailJS, assurez-vous que le template utilise ces variables :

```
De : {{from_name}} <{{from_email}}>
Sujet : [Portfolio] {{subject}}
Message : {{message}}

Email de destination : {{to_email}}
```

### Service ID : `service_dloo29d`
### Template ID : `template_b2c85vd`
### Public Key : `VxC0v4uC1hYJrvOUN`

---

## Test du formulaire

1. Ouvrir `http://localhost/Portfolio/`
2. Remplir le formulaire de contact
3. Cliquer "Envoyer"
4. Vérifier que vous recevez l'email sur `pauljovani15@gmail.com`

---

## Avantages EmailJS vs Supabase

- **Direct dans Gmail** : Pas besoin de dashboard externe
- **Simple** : Configuration minimale
- **Fiable** : Service d'email professionnel
- **Gratuit** : 200 emails/mois (suffisant pour un portfolio)

---

Le portfolio est maintenant 100% fonctionnel avec EmailJS !
