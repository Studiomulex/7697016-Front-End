const sectionFiches = document.querySelector(".fiches");
let pieces = [];

// Récupération des éléments
const afficherArticles = async () => {
  const response = await fetch("pieces-autos.json");
  pieces = await response.json();

  // Affichage de tous les éléments de la pieces-auto.json
  sectionFiches.innerHTML = "";
  pieces.forEach(
    ({ image, nom, prix, categorie, disponibilite, description }) => {
      sectionFiches.innerHTML += `
      <div>
        <img src="${image}" alt="${nom}">
        <h2>${nom}</h2>
        <p>Prix: ${prix} ${prix < 35 ? "€" : "€€€"}</p>
        <p>${categorie ?? "aucune catégorie"}</p>
        <p>${description ?? "Pas de description pour le moment."}</p>
        <p>${disponibilite ? "En stock" : "Rupture de stock"}</p>
      </div>
    `;
    }
  );
};

await afficherArticles(); // S'assurer que les articles sont chargés avant de continuer

// Fonction qui génère toute la page web
function genererPieces(pieces) {
  pieces.forEach(
    ({ image, nom, prix, categorie, description, disponibilite }) => {
      sectionFiches.innerHTML+= `
     <div>
      <img src="${image}" alt="${nom}">
      <h2>${nom}</h2>
      <p>Prix: ${prix} € (${prix < 35 ? "€" : "€€€"})</p>
      <p>${categorie ?? "(aucune catégorie)"}</p>
      <p>${description ?? "Pas de description pour le moment."}</p>
      <p>${disponibilite ? "En stock" : "Rupture de stock"}</p>
     </div>
    `;
    }
  );
}

genererPieces(pieces);

// Gestion des boutons
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
  const piecesOrdonnees = [...pieces]; // Copie du tableau
  piecesOrdonnees.sort((a, b) => a.prix - b.prix);
  sectionFiches.innerHTML = "";
  genererPieces(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
  const piecesFiltrees = pieces.filter((piece) => piece.prix <= 35);
  sectionFiches.innerHTML = "";
  genererPieces(piecesFiltrees);
});

const boutonDecroissant = document.querySelector(".btn-decroissant");
boutonDecroissant.addEventListener("click", function () {
  const piecesOrdonnees = [...pieces];
  piecesOrdonnees.sort((a, b) => b.prix - a.prix);
  sectionFiches.innerHTML = "";
  genererPieces(piecesOrdonnees);
});

const boutonNoDescription = document.querySelector(".btn-nodesc");
boutonNoDescription.addEventListener("click", function () {
  const piecesFiltrees = pieces.filter((piece) => !piece.description);
  sectionFiches.innerHTML = "";
  genererPieces(piecesFiltrees);
});

// Création de la liste des articles abordables
const noms = pieces
  .filter((piece) => piece.prix < 35)
  .map((piece) => piece.nom);

const abordableElem = document.createElement("ul");
noms.forEach((nom) => {
  const nomElem = document.createElement("li");
  nomElem.innerText = nom;
  abordableElem.appendChild(nomElem);
});

document.querySelector(".abordables").appendChild(abordableElem);