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
    contenu: texte,
    date: new Date()
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

    nouveauPoi.classList.add("poi");

    nouveauPoi.innerHTML = `
      <p class="poi-contenu">${poi.contenu}</p>
    `;

    listePoi.appendChild(nouveauPoi);
  });
}

function sauvegarderPois() {
  localStorage.setItem("pois", JSON.stringify(pois));
}

// --- Événements ---

chargerPois();
afficherPois();

bouton.addEventListener("click",ouvrirFormulaire);
boutonEnregistrer.addEventListener("click", enregistrerPoi);