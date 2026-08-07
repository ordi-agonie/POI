const bouton = document.getElementById("nouveau-poi");
const formulaire = document.getElementById("formulaire-poi");

function ouvrirFormulaire() {
  formulaire.hidden = false;
}

bouton.addEventListener("click",ouvrirFormulaire);