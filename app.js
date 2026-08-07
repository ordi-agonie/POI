const bouton = document.getElementById("nouveau-poi");
const formulaire = document.getElementById("formulaire-poi");
const contenuPoi = document.getElementById("contenu-poi");
const listePoi = document.getElementById("liste-poi");
const boutonEnregistrer = document.getElementById("enregistrer-poi");

function ouvrirFormulaire() {
  formulaire.hidden = false;
}

function enregistrerPoi() {
  const texte = contenuPoi.value;

  if (texte === "") {
    return;
  }

  const nouveauPoi = document.createElement("article");

  nouveauPoi.classList.add("poi");

  nouveauPoi.innerHTML = `
    <p class="poi-contenu">${texte}</p>
  `;

  listePoi.appendChild(nouveauPoi);

  contenuPoi.value = "";
  formulaire.hidden = true;
}

bouton.addEventListener("click",ouvrirFormulaire);
boutonEnregistrer.addEventListener("click", enregistrerPoi);