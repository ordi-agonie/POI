let modeFormulaire = "creation";
let poiEnCoursId = null;

// --- Éléments HTML ---

const bouton = document.getElementById("nouveau-poi");
const formulaire = document.getElementById("formulaire-poi");
const contenuPoi = document.getElementById("contenu-poi");
const listePoi = document.getElementById("liste-poi");
const boutonEnregistrer = document.getElementById("enregistrer-poi");
const boutonAnnuler = document.getElementById("annuler-poi");
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

  if (modeFormulaire === "modification") {
    const poi = pois.find((poi) => poi.id === poiEnCoursId);
    
    if (!poi) {
      return;
    }

    poi.contenu = texte;
  } else {
    const nouveauPoi = {
      id: Date.now(),
      contenu: texte,
      createdAt: new Date()
    };
  
    pois.push(nouveauPoi);
  }
  sauvegarderPois();

  fermerFormulaire();
}

function annulerFormulaire() {
  fermerFormulaire();
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

  if (index === -1) {
    return;
  }
  
  pois.splice(index, 1);

  sauvegarderPois();
  afficherPois();
}

function modifierPoi(id) {
  const poi = pois.find((poi) => poi.id === id);

  if (!poi) {
    return;
  }
  
  //const nouveauTexte = prompt("Modifier la citation :", poi.contenu);

  modeFormulaire = "modification";
  poiEnCoursId = id;

  contenuPoi.value = poi.contenu;
  formulaire.hidden = false;
  contenuPoi.focus();
  
  /*if (nouveauTexte !== null && nouveauTexte !== "") {
    poi.contenu = nouveauTexte;

    sauvegarderPois();
    afficherPois();
  }*/
}

function fermerFormulaire() {
  contenuPoi.value = "";
  formulaire.hidden = true;

  modeFormulaire = "creation";
  poiEnCoursId = null;
}

// --- Événements ---

chargerPois();
afficherPois();

bouton.addEventListener("click",ouvrirFormulaire);
boutonEnregistrer.addEventListener("click", enregistrerPoi);
boutonAnnuler.addEventListener("click", annulerFormulaire);
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