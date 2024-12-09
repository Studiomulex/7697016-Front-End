const sectionFiches = document.querySelector(".fiches");
let pieces=[]
//recupération des éléments
const afficherArticles = async () => {
  const response = await fetch("pieces-autos.json");
  pieces = await response.json();

  //affichage de tous les éléments de la pieces-auto.json
  sectionFiches.innerHTML = "";
  pieces.forEach(
    ({ image, nom, prix, categorie, disponibilite, description }) => {
      sectionFiches.innerHTML += `
   <div>
    <img src="${image}">
    <h2>${nom}</h2>
    <p>Prix: ${prix} € ${prix < 35 ? "€" : "€€€"}</p>
    <p>${categorie ?? "aucune catégorie"}</p>
    <p>${description ?? "Pas de description pour le moment."}</p>
    <p>${disponibilite ? "En stock" : "Rupture de stock"}</p>
   </div>
`;
    }
  );
};
afficherArticles();
//gestion des bouttons
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
  const piecesOrdonnees = Array.from(pieces);
  piecesOrdonnees.sort(function (a, b) {
    return a.prix - b.prix;
  });
  console.log(piecesOrdonnees);
});

const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", function () {
  const piecesFiltrees = pieces.filter(function (piece) {
    return piece.prix <= 35;
  });
  console.log(piecesFiltrees);
});

//Correction Exercice
const boutonDecroissant = document.querySelector(".btn-decroissant");
boutonDecroissant.addEventListener("click", function () {
  const piecesOrdonnees = Array.from(pieces);
  piecesOrdonnees.sort(function (a, b) {
    return b.prix - a.prix;
  });
  console.log(piecesOrdonnees);
});

const boutonNoDescription = document.querySelector(".btn-nodesc");
boutonNoDescription.addEventListener("click", function () {
  const piecesFiltrees = pieces.filter(function (piece) {
    return piece.description;
  });
  console.log(piecesFiltrees);
});
