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

    const provenance = document.createElement("div");
    provenance.classList.add("poi-provenance");

    if (poi.provenance?.origine) {
      const origine = document.createElement("p");
      origine.textContent =
        `Origine : ${formaterProvenance(poi.provenance.origine)}`;
      provenance.appendChild(origine);
    }

    if (poi.provenance?.reference) {
      const reference = document.createElement("p");
      reference.textContent =
        `Référence : ${formaterProvenance(poi.provenance.reference)}`;
      provenance.appendChild(reference);
    }

    if (poi.provenance?.decouverte) {
      const decouverte = document.createElement("p");
      decouverte.textContent =
        `Découverte : ${formaterProvenance(poi.provenance.decouverte)}`;
      provenance.appendChild(decouverte);
    }

    if (provenance.children.length > 0) {
      nouveauPoi.appendChild(provenance);
    }

    const contenu = document.createElement("p");
    contenu.classList.add("poi-contenu");
    contenu.textContent = poi.contenu;

    const date = document.createElement("small");
    date.textContent = new Date(poi.createdAt).toLocaleString();

    const boutonModifier = document.createElement("button");
    boutonModifier.classList.add("modifier-poi");
    boutonModifier.textContent = "Modifier";

    const boutonSupprimer = document.createElement("button");
    boutonSupprimer.classList.add("supprimer-poi");
    boutonSupprimer.textContent = "Supprimer";

    nouveauPoi.appendChild(contenu);
    nouveauPoi.appendChild(date);
    nouveauPoi.appendChild(boutonModifier);
    nouveauPoi.appendChild(boutonSupprimer);


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
      origine: normaliserProvenance(poi.provenance?.origine),
      reference: normaliserProvenance(poi.provenance?.reference),
      decouverte: normaliserProvenance(poi.provenance?.decouverte)
    }
  };
}

function normaliserProvenance(provenance) {
  if (!provenance) {
    return null;
  }

  return {
    type: provenance.type ?? "",
    format: provenance.format ?? "",
    source: provenance.source ?? "",
    titre: provenance.titre ?? "",
    auteur: provenance.auteur ?? "",
    date: provenance.date ?? "",
    numero: provenance.numero ?? "",
    lien: provenance.lien ?? ""
  };
}

function lireProvenance(prefixe) {
  const provenance = {
    type: document.getElementById(`${prefixe}-type`).value.trim(),
    format: document.getElementById(`${prefixe}-format`).value,
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
  document.getElementById(`${prefixe}-format`).value = provenance?.format ?? "";
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
  if (!provenance) {
    return "";
  }

  const elements = [
    `${obtenirIconeType(provenance.type)} ${provenance.type}`,
    provenance.format,
    provenance.source,
    provenance.titre,
    provenance.auteur,
    provenance.date
  ];

  return elements
    .filter((element) => element)
    .join(" · ");
}

function obtenirIconeType(type) {
  const icones = {
    article: "📰",
    livre: "📖",
    emission: "🎙️",
    video: "🎬",
    document: "📄",
    site: "🌐"
  };

  return icones[type] ?? "🔗";
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