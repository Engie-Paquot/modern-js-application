(async() =>  {
    const loading = document.getElementById("loading")
    const addButton = document.getElementById("btn-character-add")
    const searchBar = document.getElementById("search-bar")
    const cards = document.getElementsByClassName("character-card")
    const template = document.getElementById("tpl-character")
    const target = document.getElementById("target")
    const fetcher = async() => { //on crée une fonction async (pour pouvoir utiliser await)
        let rawData = await fetch("https://character-database.becode.xyz/characters") // on va chercher les données et on utilise await parce que fetch prend plus de temps pour télécharger qu'il n'en faut au code pour passer a la ligne suivante 
        return data = await rawData.json() //on convertit les données en un objet json et encore une fois on utilise await car la conversion prend plus de temps
    }

    
    await fetcher()
    await data.forEach(character => {
        const clone = template.content.cloneNode(true)
        const documentName = clone.getElementById("character-name")
        const documentShortDescription = clone.getElementById("character-small-description")
        const documentImage = clone.getElementById("character-img")
        const documentForm = clone.getElementById("formGet")

        documentName.innerHTML = character.name
        documentShortDescription.innerHTML = character.shortDescription
        documentImage.setAttribute("src", `data:image/jpeg;base64,${character.image}`) //on définit l'attribut "src" de l'image en ajoutant "data:image/jpeg;base64," (qui permet d'afficher l'url fourni dans l'objet) suivi de l'url fourni dans l'objet (data[0].image)
        documentForm.setAttribute("action", `pages/single.html#${character.id}`) //l'url du lien contient l'id du personnage arpès un #, pour qu'on puisse aller le rechercer sur la page single
        target.appendChild(clone)
    });


     if (document. readyState === 'complete')  {
         loading.style.display = "none"
     }
    console.log(cards)
    addButton.addEventListener("click", function(){
        document.location.href = "pages/create.html"
    })
    console.log(cards[1].children[1].getAttribute("action"))
    searchBar.addEventListener("input", ()=>{
            for (let card of cards) {
                let cardIdLong = card.children[1].getAttribute("action").split("#")
                let cardId = cardIdLong[1]
                if (!card.children[0].children[1].innerHTML.toLowerCase().includes(searchBar.value.toLowerCase()) && !cardId.toLowerCase().includes(searchBar.value.toLowerCase())){
                    card.style.display = "none"
                } else {
                    card.style.display = "flex"
                }
            }

         })
    
})();
