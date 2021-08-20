import { fetcherSingle } from "./fetcher.js"

(async () => {
    // const template = document.getElementById("tpl-character")
    // const target = document.getElementById("target")
    const img = document.getElementById("character-img");
    const name = document.getElementById("character-name");
    const smallDescription = document.getElementById("character-small-description");
    const longueDescription = document.getElementById("character-long-description");
    const currentId = window.location.hash.split('#'); // on va chercher une information dans l'url, à partir du #, et split sert à se débarasser du #
  
    const deleteButton = document.getElementById("button-character-delete");
    const updateButton = document.getElementById("button-character-update");
  
  // const fetcher = async () => {
  //   //on crée une fonction async (pour pouvoir utiliser await)
  //   let rawData = await fetch(`https://character-database.becode.xyz/characters/${currentId[1]}`); // on va chercher les informations qui correspondent au bon id. On précise [1] parce que split crée une array de deux éléments, un avec ce qu'il y a avant le # et un avec ce qu'il y a après 
  
  //   return character = await rawData.json(); //on convertit les données en un objet json et encore une fois on utilise await car la conversion prend plus de temps
  // }; //console.log(await fetcher()) //afin de ne pas afficher les données pendant qu'elles sont manipulées, on ajoute un await (tu peux enlever l'await si tu veux voir ce qu'il se passe)

  
    
    const character = await fetcherSingle(currentId);
    img.setAttribute("src", `data:image/jpeg;base64,${character.image}`); // pour les img il faut changer la src d'où setAttribute, `data:image/jpeg;base64,${data.image}` convertir un url de données en images
  
    name.innerHTML = character.name;
    smallDescription.innerHTML = character.shortDescription;
    longueDescription.innerHTML = character.description;
    deleteButton.addEventListener("click", async () => {
      if (confirm('Really')) {
        await fetch(`https://character-database.becode.xyz/characters/${currentId[1]}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        });
        document.location.href = "../index.html";
      } else {}
    });
    updateButton.addEventListener("click", () => {
      document.location.href = `update.html#${currentId[1]}`;
    });
  })();