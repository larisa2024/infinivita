# InfiniVita — prototype V3 (nom de travail)

Site vitrine statique de démonstration du projet **InfiniVita** : un journal de vie chiffré et daté, transmis selon les volontés de son auteur — jamais celles d'un algorithme.

**Démo en ligne :** https://larisa2024.github.io/infinivita/

## Statut

- Prototype de démonstration : **rien n'est envoyé**, les formulaires du journal restent dans le navigateur du visiteur.
- Publication provisoire (`noindex`) — nom de travail, textes légaux en cours de validation.
- V1 « Mémoire Vivante » et V2 « Fil Vivant » ont précédé cette version.

## Structure

| Fichier | Rôle |
|---|---|
| `index.html` | Accueil : hero, confiance, les trois temps, coffre, liste d'attente |
| `journal.html` | Le présent — météo du jour, journée, mémoire, projections |
| `futur.html` | L'avenir — créations, assistant d'écriture, se faire relire son histoire |
| `transmission.html` | L'héritage — proches, causes, notaire, jumeau numérique |
| `tarifs.html` | Les quatre offres |
| `faq.html` | 45 questions en huit chapitres |
| `espace.html` | Espace personnel (démonstration, session uniquement) |
| `legal.html` | Mentions légales · Confidentialité (RGPD) · CGU — gabarits à valider par un juriste |
| `styles.css` | Design « Le fil d'améthyste » |
| `app.js` | Interactions (date dynamique, FAQ, formulaires de démonstration) |

## À brancher (comptes à créer par la fondatrice)

- **Rendez-vous 30 min** : branché sur Calendly (`calendly.com/larisa-kr-interargus/30min`). Un événement dédié « rendez-vous notarial » pourra être créé plus tard.
- **Liste d'attente** : coller le lien du formulaire Tally (format `https://tally.so/r/XXXX`) dans `data-tally-url` (`index.html`) — le formulaire s'affiche alors à la place du bouton email.

## Lancer en local

```bash
python3 -m http.server 8000
```

puis ouvrir http://localhost:8000
