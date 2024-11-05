const sectionFiches = document.querySelector(".fiches");

//recupération des éléments
const afficherArticles = async () => {
  const response = await fetch("pieces-autos.json");
  const pieces = await response.json();

  //affichage de tous les éléments de la pieces-auto.json
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

// bouton de tri
const boutonTrier = document.querySelector(".btn-trier");
boutonTrier.addEventListener("click", function () {
  pieces.sort(function (a, b) {
    return a.prix - b.prix;
  });
  console.log(pieces);
});

//btn de filtrage
const boutonFiltrer = document.querySelector(".btn-filtrer");
boutonFiltrer.addEventListener("click", () => {
  const filteredPieces = pieces.filter((piece) => {
    return piece.prix<=35;
  });
});
