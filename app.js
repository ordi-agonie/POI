let modeFormulaire = "creation";
let poiEnCoursId = null;

// --- Éléments HTML ---

const bouton = document.getElementById("nouveau-poi");
const formulaire = document.getElementById("formulaire-poi");
const contenuPoi = document.getElementById("contenu-poi");
const raisonConservationPoi = document.getElementById("raison-conservation-poi");
const favoriPoi = document.getElementById("favori-poi");
const listePoi = document.getElementById("liste-poi");
const boutonEnregistrer = document.getElementById("enregistrer-poi");
const boutonAnnuler = document.getElementById("annuler-poi");
const notesPoi = document.getElementById("notes-poi");
const pois = [];

// --- Fonctions ---

function chargerPois() {
  const donnees = localStorage.getItem("pois");

  if (donnees) {
    const poisSauvegardes = JSON.parse(donnees);
    pois.push(
      ...poisSauvegardes.map(normaliserPoi)
    );
    afficherPois();
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
  
  const raisonConservation = raisonConservationPoi.value;
  const favori = favoriPoi.checked;
  const notes = notesPoi.value;

  const origine = lireProvenance("origine");
  const reference = lireProvenance("reference");
  const decouverte = lireProvenance("decouverte");

  

  if (modeFormulaire === "modification") {
    const poi = pois.find((poi) => poi.id === poiEnCoursId);
    
    if (!poi) {
      return;
    }

    poi.contenu = texte;
    poi.raisonConservation = raisonConservation;
    poi.favori = favori;
    poi.notes = notes;
    poi.provenance = {
      origine: origine,
      reference: reference,
      decouverte: decouverte
    };
    
  } else {
    const nouveauPoi = {
      id: Date.now(),
      contenu: texte,
      createdAt: new Date(),
      statut: "a_classer",
      favori: favori,
      raisonConservation: raisonConservation,
      notes: notes,
      provenance: {
        origine: origine,
        reference: reference,
        decouverte: decouverte
      }
    };
  
    pois.push(nouveauPoi);
  }
  sauvegarderPois();
  afficherPois();
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

    let provenanceHtml = "";

    if (poi.provenance?.origine) {
      provenanceHtml += `
        <div class="poi-provenance">
          <strong>Origine :</strong>
          ${formaterProvenance(poi.provenance.origine)}
        </div>
      `;
    }

    if (poi.provenance?.reference) {
      provenanceHtml += `
        <div class="poi-provenance">
          <strong>Référence :</strong>
          ${formaterProvenance(poi.provenance.reference)}
        </div>
      `;
    }

    if (poi.provenance?.decouverte) {
      provenanceHtml += `
        <div class="poi-provenance">
          <strong>Découverte :</strong>
          ${formaterProvenance(poi.provenance.decouverte)}
        </div>
      `;
    }

    nouveauPoi.innerHTML = `
      <p class="poi-contenu">${poi.contenu}</p>
      ${provenanceHtml}
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

  modeFormulaire = "modification";
  poiEnCoursId = id;

  contenuPoi.value = poi.contenu;
  raisonConservationPoi.value = poi.raisonConservation;
  favoriPoi.checked = poi.favori;
  notesPoi.value = poi.notes;
  afficherProvenance("origine", poi.provenance?.origine);
  afficherProvenance("reference", poi.provenance?.reference);
  afficherProvenance("decouverte", poi.provenance?.decouverte);

  contenuPoi.focus();
  formulaire.hidden = false;
}

function fermerFormulaire() {
  
  contenuPoi.value = "";
  raisonConservationPoi.value = "";
  favoriPoi.checked = false;
  notesPoi.value = "";
  
  formulaire.hidden = true;

  modeFormulaire = "creation";
  poiEnCoursId = null;
}

function normaliserPoi(poi) {
  return {
    ...poi,
    statut: poi.statut ?? "a_classer",
    favori: poi.favori ?? false,
    raisonConservation: poi.raisonConservation ?? "",
    notes: poi.notes ?? "",
    provenance: {
      origine: poi.provenance?.origine
        ?? poi.provenance?.principale
        ?? null,
      reference: poi.provenance?.reference ?? null,
      decouverte: poi.provenance?.decouverte ?? null
    }
  };
}

function lireProvenance(prefixe) {
  const provenance = {
    type: document.getElementById(`${prefixe}-type`).value.trim(),
    source: document.getElementById(`${prefixe}-source`).value.trim(),
    titre: document.getElementById(`${prefixe}-titre`).value.trim(),
    auteur: document.getElementById(`${prefixe}-auteur`).value.trim(),
    date: document.getElementById(`${prefixe}-date`).value.trim(),
    numero: document.getElementById(`${prefixe}-numero`).value.trim(),
    lien: document.getElementById(`${prefixe}-lien`).value.trim()
  };

  const estVide = Object.values(provenance).every((valeur) => valeur === "");

  return estVide ? null : provenance;
}

function afficherProvenance(prefixe, provenance) {
  document.getElementById(`${prefixe}-type`).value = provenance?.type ?? "";
  document.getElementById(`${prefixe}-source`).value = provenance?.source ?? "";
  document.getElementById(`${prefixe}-titre`).value = provenance?.titre ?? "";
  document.getElementById(`${prefixe}-auteur`).value = provenance?.auteur ?? "";
  document.getElementById(`${prefixe}-date`).value = provenance?.date ?? "";
  document.getElementById(`${prefixe}-numero`).value = provenance?.numero ?? "";
  document.getElementById(`${prefixe}-lien`).value = provenance?.lien ?? "";

  const details = document.getElementById(`${prefixe}-details`);

  if (details) {
    details.open = provenance !== null && provenance !== undefined;
  }
}

function formaterProvenance(provenance) {
  const elements = [
    provenance.source,
    provenance.titre,
    provenance.auteur,
    provenance.date
  ];

  return elements
    .filter((element) => element)
    .join(" — ");
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