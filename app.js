// --- Éléments HTML ---

const bouton = document.getElementById("nouveau-poi");
const formulaire = document.getElementById("formulaire-poi");
const contenuPoi = document.getElementById("contenu-poi");
const listePoi = document.getElementById("liste-poi");
const boutonEnregistrer = document.getElementById("enregistrer-poi");
const pois = [];

// --- Fonctions ---

function chargerPois() {
  const donnees = localStorage.getItem("pois");

  if (donnees) {
    pois.push(...JSON.parse(donnees));
  }
}

function ouvrirFormulaire() {
  formulaire.hidden = false;
}

function enregistrerPoi() {
  
  const texte = contenuPoi.value;
  
  if (texte === "") {
    return;
  }
  
  const nouveauPoi = {
    id: Date.now(),
    contenu: texte,
    createdAt: new Date()
  };
  
  pois.push(nouveauPoi);
  sauvegarderPois();

  afficherPois();

  contenuPoi.value = "";
  formulaire.hidden = true;
}

function afficherPois() {
  listePoi.innerHTML = "";

  pois.forEach((poi) => {
    const nouveauPoi = document.createElement("article");

    nouveauPoi.dataset.id = poi.id;
    nouveauPoi.classList.add("poi");

    nouveauPoi.innerHTML = `
      <p class="poi-contenu">${poi.contenu}</p>
      <small>${new Date(poi.createdAt).toLocaleString()}</small>
      <button class="modifier-poi">Modifier</button>
      <button class="supprimer-poi">Supprimer</button>
    `;


    listePoi.appendChild(nouveauPoi);
  });
}

function sauvegarderPois() {
  localStorage.setItem("pois", JSON.stringify(pois));
}

function supprimerPoi(id) {
  const index = pois.findIndex((poi) => poi.id === id);

  pois.splice(index, 1);

  sauvegarderPois();
  afficherPois();
}

function modifierPoi(id) {
  const poi = pois.find((poi) => poi.id === id);

  const nouveauTexte = prompt("Modifier la citation :", poi.contenu);

  if (nouveauTexte !== null && nouveauTexte !== "") {
    poi.contenu = nouveauTexte;

    sauvegarderPois();
    afficherPois();
  }
}

// --- Événements ---

chargerPois();
afficherPois();

bouton.addEventListener("click",ouvrirFormulaire);
boutonEnregistrer.addEventListener("click", enregistrerPoi);
listePoi.addEventListener("click", (event) => {
  const bouton = event.target;

  const article = bouton.closest(".poi");

  if (!article) {
    return;
  }
  
  const id = Number(article.dataset.id);
  if (event.target.classList.contains("supprimer-poi")) {
    supprimerPoi(id);
  }
  if (event.target.classList.contains("modifier-poi")) {
    modifierPoi(id);
  }
});