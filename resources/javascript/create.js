(async () => {
  const allInputs = document.querySelectorAll("input");
  const newImage = document.getElementById("character-image-upload");
  const preview = document.getElementById("character-image-preview");
  const previewText = document.getElementById("preview-text");
  const newName = document.getElementById("input-character-name");
  const newSmallDescription = document.getElementById("input-character-small-description");
  const newLongDescription = document.getElementById("input-character-long-description");
  const saveNewCharacter = document.getElementById("button-save");
  const cancelNewCharacter = document.getElementById("button-delete");
  const maxCharacterNameDisplay = document.getElementById("max-character-name");
  const maxCharacterSmallDescriptionDisplay = document.getElementById("max-character-small-description");
  const maxCharacterLongDescriptionDisplay = document.getElementById("max-character-long-description");
  const imageUploader = document.getElementById("image-input-container");
  const imageUploaderText = document.getElementById("image-input-container-text");
  const newCharacter = new Object();
  allInputs.forEach(element => element.value = ""); //on vide tous les inputs

  async function readImage(file) {
    // Check if the file is an image.
    if (file.type && !file.type.startsWith('image/')) {
      console.log('File is not an image.', file.type, file);
      return;
    }

    const reader = new FileReader(); //lis le contenu d'un fichier

    reader.addEventListener('load', event => {
      //l'event se lance après la ligne 16
      const imageDataUrl = reader.result; //result donne le résultat de la ligne 16

      preview.src = imageDataUrl; //on remplace la source par l'url

      previewText.style.opacity = 0;
      const imageUrlSeparator = imageDataUrl.split(",");
      newCharacter.image = imageUrlSeparator[1];
    }); //transforme le fichier en data url

    reader.readAsDataURL(file);
  }

  imageUploader.addEventListener("click", () => {
    document.getElementById("character-image-upload").click();
  });
  imageUploaderText.addEventListener("click", () => {
    document.getElementById("character-image-upload").click();
  });
  newImage.addEventListener("change", async function (event) {
    let file = event.target.files; //on va chercher le fichier qu'on a input qui est enregistré comme une array

    await readImage(file[0]); //on utilise le fichier dans la fonction
  });
  maxCharacterNameDisplay.innerHTML = `${newName.value.length} on max ${newName.maxLength} char.`;
  newName.addEventListener("input", () => {
    maxCharacterNameDisplay.innerHTML = `${newName.value.length} on max ${newName.maxLength} char.`;
  });
  maxCharacterSmallDescriptionDisplay.innerHTML = `${newSmallDescription.value.length} on max ${newSmallDescription.maxLength} char.`;
  newSmallDescription.addEventListener("input", () => {
    maxCharacterSmallDescriptionDisplay.innerHTML = `${newSmallDescription.value.length} on max ${newSmallDescription.maxLength} char.`;
  });
  maxCharacterLongDescriptionDisplay.innerHTML = `0 on max 350 char.`;
  newLongDescription.addEventListener("input", () => {
    maxCharacterLongDescriptionDisplay.innerHTML = `${newLongDescription.children[0].textContent.length} on max 350 char.`;
  });
  saveNewCharacter.addEventListener("click", async () => {
    if (newName.value != "" && newSmallDescription.value != "" && newLongDescription.value != "" && newImage.value != "") {
      newCharacter.name = newName.value;
      newCharacter.shortDescription = newSmallDescription.value;
      newCharacter.description = newLongDescription.children[0].textContent;
      let id = null;
      let name = newCharacter.name;
      let shortDescription = newCharacter.shortDescription;
      let description = newCharacter.description;
      let image = newCharacter.image;
      const postData = await fetch("https://character-database.becode.xyz/characters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id,
          name,
          shortDescription,
          description,
          image
        })
      });
      document.location.href = "../index.html";
    } else {
      alert("erreur");
    }
  });
  cancelNewCharacter.addEventListener("click", function () {
    document.location.href = "../index.html";
  });
})();