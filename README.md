# Smart Bâtiment — version GitHub Pages

Site public de cinq pages, sans serveur et sans connexion ChatGPT.
La version inclut l’accueil enrichi : usages du quotidien, équipements et guide de projet.

## Publication recommandée (automatique)

1. Créer un dépôt GitHub PUBLIC nommé `smart-batiment`, sans README automatique.
2. Extraire ce ZIP et ouvrir le dossier `Smart-Batiment-GitHub-Pages` avec VS Code.
3. Dans le terminal de ce dossier :

```powershell
git init
git add .
git commit -m "Création du site Smart Bâtiment"
git branch -M main
git remote add origin https://github.com/maes-k/smart-batiment.git
git push -u origin main
```

L’adresse ci-dessus suppose le compte `maes-k` et le dépôt `smart-batiment`.
Si vous choisissez un autre compte ou nom, utilisez l’adresse affichée par GitHub.

4. Sur GitHub : ouvrir **Settings → Pages → Build and deployment → Source**.
5. Sélectionner **GitHub Actions**.
6. Dans **Actions**, ouvrir **Publier Smart Bâtiment** et cliquer sur **Run workflow** sur `main`.
7. Attendre que le déploiement réussisse. Le lien public apparaît dans **Settings → Pages**.

Le lien attendu est `https://maes-k.github.io/smart-batiment/`.
Il devient utilisable uniquement après un déploiement réussi. Il peut alors être partagé à tous.
Les prochains envois sur `main` reconstruiront et republieront le site automatiquement.
Le dossier `.github` doit bien être envoyé avec les autres fichiers.

## Autre méthode : publier directement le dossier déjà construit

Le dossier `docs` contient également une version prête à afficher.
Dans Settings → Pages, sélectionner **Deploy from a branch**, puis **main** et **/docs**.
Dans ce mode, après avoir modifié `src`, exécuter `npm.cmd run build`, puis envoyer
les fichiers modifiés et le dossier `docs` sur GitHub.
Choisir une seule méthode de publication.

## Utilisation locale

Node.js 22.13 minimum (ou Node.js 24), puis :

```powershell
npm.cmd ci
npm.cmd run dev
```

Ouvrir l’adresse affichée dans le terminal. Pour construire : `npm.cmd run build`.

## Modifier le site

- `src/smart-site.tsx` : contenu des pages, offres, tarifs et interactions.
- `src/home-depth.tsx` : sections supplémentaires de l’accueil.
- `src/styles.css` : couleurs et mise en page.
- `public/images/` : images.
- `index.html`, `solutions.html`, `offres.html`, `univers.html`, `contact.html` : points d’entrée et métadonnées.

Les liens et images utilisent des chemins relatifs compatibles avec les sous-dossiers GitHub Pages.
Le formulaire prépare un message WhatsApp et ne l’envoie pas automatiquement.
Aucune base de données, aucun paiement et aucun espace d’administration ne sont nécessaires.

Documentation GitHub :
https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
