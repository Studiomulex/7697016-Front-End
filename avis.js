export async function fetchAvis(id) {
  try {
    const response = await fetch(`http://localhost:8081/pieces/${id}/avis`, {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: '{"Commentaires":"Top produit !"}'
    });
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
 //  fonction pour publier de nous avis
 export function ajoutListenersEnvoyerAvis(){
 try{
  const formulaireAvis=document.querySelector('.formulaire-avis')
  formulaireAvis.addEventListener("submit",function(event){
    event.preventDefault()
    // const 
  })
 }catch(error){
  console.log(error)
 }
 }
 //fonction pour afficher et cacher les avis
export function ajoutListenersAvis() {
  const buttons = document.querySelectorAll(".fiches .produit button");

  buttons.forEach((button) => {
    // Définir le texte initial du bouton
    button.textContent = "Afficher les commentaires";

    button.addEventListener("click", async function (event) {
      const pieceElement = event.target.parentElement;
      const avisContainer = pieceElement.querySelector(".avis");

      // Si les avis sont déjà affichés, on les cache et change le texte du bouton
      if (avisContainer) {
        avisContainer.remove();
        button.textContent = "Afficher les commentaires";
        return; // Stoppe la fonction ici
      }
      try {
        const id = event.target.dataset.id;
        const avis = await fetchAvis(id);

        // Créer un conteneur pour les avis
        const avisElement = document.createElement("div");
        avisElement.classList.add("avis");

        // Ajouter les avis ou un message si aucun avis
        avisElement.innerHTML = avis.length
          ? avis
              .map(
                (a) =>
                  `<p><strong>${a.utilisateur}</strong>: ${a.commentaire}</p>`
              )
              .join("")
          : "<p>Aucun avis pour ce produit.</p>";

        // Insérer dans le DOM
        pieceElement.appendChild(avisElement);

        // Changer le texte du bouton
        button.textContent = "Cacher les commentaires";
      } catch (error) {
        console.error("Erreur lors de la récupération des avis:", error);
      }
    });
  });
}
