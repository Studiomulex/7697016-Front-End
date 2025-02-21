// Fonction pour récupérer les avis d'une pièce
export async function fetchAvis(id) {
  try {
    const response = await fetch(`http://localhost:8081/pieces/${id}/avis`);
    if (!response.ok) {
      throw new Error(
        `Erreur HTTP: ${response.status} - ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`Erreur lors de la récupération des avis: ${error.message}`);
    throw error;
  }
}

// Fonction pour ajouter les listeners aux boutons "Afficher les commentaires"
export function ajoutListenersAvis() {
  const buttons = document.querySelectorAll(".fiches .produit button");

  buttons.forEach((button) => {
    button.textContent = "Afficher les commentaires";

    button.addEventListener("click", async function (event) {
      event.preventDefault();
      event.stopPropagation();

      const pieceElement = event.target.parentElement;
      const avisContainer = pieceElement.querySelector(".avis");
      // cacher les avis si ils sont affiche
      if (avisContainer) {
        avisContainer.remove();
        button.textContent = "Afficher les commentaires";
        return;
      }

      try {
        const id = event.target.dataset.id;
        const avis = await fetchAvis(id);

        const avisElement = document.createElement("div");
        avisElement.classList.add("avis");
        const avisFiltres = avis.filter(
          (a) => (a.utilisateur || a.user) && (a.commentaire || a.comment)
        );
        avisElement.innerHTML =
          avisFiltres.length > 0
            ? avisFiltres
                .map(
                  (a) =>
                    `<p><strong>${
                      a.utilisateur || a.user || "Anonyme"
                    }</strong>: ${
                      a.commentaire || a.comment || "Aucun commentaire"
                    }</p>`
                )
                .join("")
            : "<p>Aucun avis valide pour ce produit.</p>";

        pieceElement.appendChild(avisElement);
        button.textContent = "Cacher les commentaires";
      } catch (error) {
        console.error("Erreur lors de la récupération des avis:", error);
      }
    });
  });
}

// Fonction pour envoyer un nouvel avis
export function ajoutListenersEnvoyerAvis() {
  const formulaireAvis = document.querySelector(".formulaire-avis");

  formulaireAvis.addEventListener("submit", async function (event) {
    event.preventDefault();

    const avis = {
      pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
      utilisateur: event.target.querySelector("[name=utilisateur]").value,
      commentaire: event.target.querySelector("[name=commentaire]").value,
    };

    const chargeUtile = JSON.stringify(avis);

    try {
      const response = await fetch("http://localhost:8081/avis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile,
      });

      if (!response.ok) {
        throw new Error(
          `Erreur HTTP: ${response.status} - ${response.statusText}`
        );
      }

      alert("Avis envoyé avec succès !");
      event.target.reset(); //nettoie le formulaire
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'avis:", error);
    }
  });
}
