import { ajoutListenersAvis, ajoutListenersEnvoyerAvis } from "./avis.js";

// Fonction pour récupérer les données des pièces
async function fetchingData() {
  try {
    const response = await fetch("http://localhost:8081/pieces/");
    if (!response.ok) {
      throw new Error(`HTTP Erreur: ${response.status}`);
    }
    const datas = await response.json();

    // Sauvegarder les données dans le localStorage
    window.localStorage.setItem("pieces", JSON.stringify(datas));

    // Récupération de l'élément pour afficher les produits
    const listeProduits = document.querySelector(".fiches");

    if (!listeProduits) {
      throw new Error("L'élément '.fiches' n'existe pas dans le DOM");
    }

    // Fonction pour afficher les produits
    function afficherProduits(produits) {
      listeProduits.innerHTML = ""; // On vide l'affichage avant d'ajouter les produits

      produits.forEach((data) => {
        listeProduits.innerHTML += `
          <div class="produit">
            <img src="${data.image}" alt="${data.nom}" />
            <h2>${data.nom}</h2>
            <h3>Prix: ${data.prix} €</h3>
            <p>Catégorie: ${data.categorie ?? "Aucune catégorie"}</p>
            <p>Disponibilité: ${
              data.disponibilite ? "En stock" : "Rupture de stock"
            }</p>
            <p>${data.description ?? "Pas de description"}</p>
            <button type="button" data-id="${
              data.id
            }">Afficher les commentaires</button>
          </div>`;
      });

      // Ajouter les listeners pour les avis
      ajoutListenersAvis();
    }

    // Afficher les produits au chargement initial
    afficherProduits(datas);

    // Bouton Trier (Prix croissant)
    document.querySelector(".btn-trier").addEventListener("click", function () {
      const datasCopies = datas.map((obj) => ({ ...obj })); // Copie profonde
      datasCopies.sort((a, b) => a.prix - b.prix);
      afficherProduits(datasCopies);
    });

    // Bouton Trier (Prix décroissant)
    document
      .querySelector(".btn-decroissant")
      .addEventListener("click", function () {
        const datasCopies = datas.map((obj) => ({ ...obj }));
        datasCopies.sort((a, b) => b.prix - a.prix);
        afficherProduits(datasCopies);
      });

    // Bouton Filtrer (Produits abordables <= 35€)
    document
      .querySelector(".btn-filtrer")
      .addEventListener("click", function () {
        const filteredDatas = datas.filter((data) => data.prix <= 35);
        afficherProduits(filteredDatas);
      });

    // Bouton Filtrer (Produits sans description)
    document
      .querySelector(".btn-nodesc")
      .addEventListener("click", function () {
        const filteredDatas = datas.filter((data) => !data.description);
        afficherProduits(filteredDatas);
      });

    // Fonction pour afficher les noms des produits abordables
    function produitAbordables(items) {
      const nomProduit = items.map((data) => data.nom);
      for (let i = items.length - 1; i >= 0; i--) {
        if (items[i].prix > 35) {
          nomProduit.splice(i, 1);
        }
      }

      const abordablesSection = document.querySelector(".abordables");
      abordablesSection.innerHTML = "<p>Pièces abordables :</p>";

      const listeElem = document.createElement("ul");
      for (let i = 0; i < nomProduit.length; i++) {
        const nomElem = document.createElement("li");
        nomElem.innerText = nomProduit[i];
        listeElem.appendChild(nomElem);
      }
      abordablesSection.appendChild(listeElem);
    }

    produitAbordables(datas);
  } catch (error) {
    console.error("Erreur lors du chargement des données:", error);
  }
}

// Appel de la fonction principale
fetchingData().then(() => {
  ajoutListenersEnvoyerAvis();
});
