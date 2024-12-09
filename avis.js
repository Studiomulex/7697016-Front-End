export function ajoutListenerAvis() {
  const pieceElems = document.querySelectorAll(".fiches article button");

  for (let i = 0; i < pieceElems.length; i++) {
    pieceElems[i].addEventListener("click", async function (event) {
        const id = event.target.dataset.id;
        fetch(`http://localhost:8081/pieces/${id}/avis`);
 
    });
  }
}
