export const fetcher = async() => { //on crée une fonction async (pour pouvoir utiliser await)
    let rawData = await fetch("https://character-database.becode.xyz/characters"); // on va chercher les données et on utilise await parce que fetch prend plus de temps pour télécharger qu'il n'en faut au code pour passer a la ligne suivante 
    //Always create the variable before returning a non-existing variable.
    let data = await rawData.json(); //on convertit les données en un objet json et encore une fois on utilise await car la conversion prend plus de temps
    return data;
}

 export const fetcherSingle = async (currentId) => {
     //on crée une fonction async (pour pouvoir utiliser await)
     let rawData = await fetch(`https://character-database.becode.xyz/characters/${currentId[1]}`); // on va chercher les informations qui correspondent au bon id. On précise [1] parce que split crée une array de deux éléments, un avec ce qu'il y a avant le # et un avec ce qu'il y a après 
  
     let character = await rawData.json(); //on convertit les données en un objet json et encore une fois on utilise await car la conversion prend plus de temps
     return character;
   }; //console.log(await fetcher()) //afin de ne pas afficher les données pendant qu'elles sont manipulées, on ajoute un await (tu peux enlever l'await si tu veux voir ce qu'il se passe)
