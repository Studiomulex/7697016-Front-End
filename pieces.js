const sectionFiches = document.querySelector(".fiches");
const sectionAbordables = document.querySelector(".abordables");
const sectionDisponibles = document.querySelector(".disponibles");
let pieces = [];

// Fonction principale pour afficher les articles
const afficherArticles = async () => {
  const response = await fetch("pieces-autos.json");
  pieces = await response.json();

  // Générer les fiches des articles
  sectionFiches.innerHTML = "";
  genererPieces(pieces);

  // Générer la liste des articles abordables
  const nomsAbordables = pieces
    .filter((piece) => piece.prix < 35)
    .map((piece) => piece.nom);

  sectionAbordables.innerHTML = "<h3>Articles abordables</h3>";
  const abordableElem = document.createElement("ul");
  nomsAbordables.forEach((nom) => {
    const nomElem = document.createElement("li");
    nomElem.innerText = nom;
    abordableElem.appendChild(nomElem);
  });
  sectionAbordables.appendChild(abordableElem);

  // Générer la liste des articles disponibles
  const disponibles = pieces
    .filter((piece) => piece.disponibilite)
    .map((piece) => `${piece.nom} - ${piece.prix} €`);

  sectionDisponibles.innerHTML = "<h3>Pièces disponibles</h3>";
  const elemDispo = document.createElement("ul");
  disponibles.forEach((item) => {
    const nomElement = document.createElement("li");
    nomElement.innerText = item;
    elemDispo.appendChild(nomElement);
  });
  sectionDisponibles.appendChild(elemDispo);
};

// Fonction pour générer les fiches produits
function genererPieces(pieces) {
  sectionFiches.innerHTML = pieces
    .map(
      ({ image, nom, prix, categorie, description, disponibilite }) => `
      <div>
        <img src="${image}" alt="${nom}">
        <h2>${nom}</h2>
        <p>Prix: ${prix} € (${prix < 35 ? "€" : "€€€"})</p>
        <p>${categorie ?? "(aucune catégorie)"}</p>
        <p>${description ?? "Pas de description pour le moment."}</p>
        <p>${disponibilite ? "En stock" : "Rupture de stock"}</p>
      </div>
    `
    )
    .join("");
}

// Charger les articles au démarrage
afficherArticles();

// Gestion des boutons
document.querySelector(".btn-trier").addEventListener("click", () => {
  const piecesOrdonnees = [...pieces].sort((a, b) => a.prix - b.prix);
  genererPieces(piecesOrdonnees);
});

document.querySelector(".btn-filtrer").addEventListener("click", () => {
  const piecesFiltrees = pieces.filter((piece) => piece.prix <= 35);
  genererPieces(piecesFiltrees);
});

document.querySelector(".btn-decroissant").addEventListener("click", () => {
  const piecesOrdonnees = [...pieces].sort((a, b) => b.prix - a.prix);
  genererPieces(piecesOrdonnees);
});

document.querySelector(".btn-nodesc").addEventListener("click", () => {
  const piecesFiltrees = pieces.filter((piece) => !piece.description);
  genererPieces(piecesFiltrees);
});
