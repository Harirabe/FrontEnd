let urlApi = "http://localhost:5678/api/"
let token = sessionStorage.getItem("token")
    //console.log(token);

async function listeCategories() {
    let response = await fetch("http://localhost:5678/api/categories")
    let infoCategorie = await response.json()
        // console.table(infoCategorie);
    let position = document.querySelector(".gallery");
    let portfolio = document.querySelector("#portfolio");
    let blocBouton = document.createElement("div");
    blocBouton.setAttribute("class", "bloc-bouton");
    let btn = affichageBouton(0, "Tous");
    blocBouton.append(btn);
    portfolio.insertBefore(blocBouton, position);
    for (let i = 0; i < infoCategorie.length; i++) {
        nom = infoCategorie[i].name;
        id = infoCategorie[i].id;
        let btn = affichageBouton(id, nom);
        blocBouton.append(btn);
        portfolio.insertBefore(blocBouton, position);
    }
}

listeCategories()

function affichageBouton(id, nom) {
    let btn = document.createElement("button");
    btn.setAttribute("class", "bouton");
    // console.log(btn);
    btn.innerText = nom;
    btn.addEventListener("click", function() {
        listeProjet(id);
    })
    return btn;
}

async function listeProjet(idCategorie = 0) {
    let response = await fetch("http://localhost:5678/api/works");
    let infoProjet = await response.json();
    //console.table(infoProjet);
    let gallery = document.querySelector(".gallery");
    nettoyage(gallery);
    for (let i = 0; i < infoProjet.length; i++) {
        if (infoProjet[i].categoryId == idCategorie) {
            srcValue = infoProjet[i].imageUrl;
            figCaptionValue = infoProjet[i].title;
            affichageProjet(srcValue, figCaptionValue);
        } else if (idCategorie == 0) {
            // console.log("idCategorie" + idCategorie)
            srcValue = infoProjet[i].imageUrl;
            figCaptionValue = infoProjet[i].title;
            idValue = infoProjet[i].id;
            affichageProjet(srcValue, figCaptionValue);
        }
    }
}

// affichage des images dans la premiere modal //
async function listeProjetModal(idCategorie = 0) {
    let response = await fetch("http://localhost:5678/api/works")
    let infoProjet = await response.json()

    // console.table(infoProjet);
    let GalerieImage = document.createElement("div");
    GalerieImage.setAttribute("class", "galerie-image");
    for (let i = 0; i < infoProjet.length; i++) {
        if (infoProjet[i].categoryId == idCategorie) {
            srcValue = infoProjet[i].imageUrl;
            figCaptionValue = infoProjet[i].title;
            affichageGalerie(srcValue);
        } else if (idCategorie == 0) {
            //console.log("idCategorie" + idCategorie)
            srcValue = infoProjet[i].imageUrl;
            figCaptionValue = infoProjet[i].title;
            idValue = infoProjet[i].id;
            affichageGalerie(srcValue, idValue);
        }
    }
}

listeProjetModal();

listeProjet(0);

function affichageProjet(srcValue, figCaptionValue) {
    let gallery = document.querySelector(".gallery");
    // console.log(gallery);
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figCaption = document.createElement("figCaption");
    img.setAttribute("src", srcValue);
    figCaption.textContent = figCaptionValue;
    gallery.append(figure);
    figure.append(img, figCaption);
}

function nettoyage(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

let modal = null
const openModal = function(e) {
    e.preventDefault()
    const target = document.querySelector("#modal1")
    const target2 = document.querySelector("#modal2")
    target.style.display = "flex"
    target.removeAttribute("aria-hidden")
    target.setAttribute("aria-modal", "true")
    target2.style.display = "none"
    modal = target
    modal.addEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").addEventListener("click", stopPropagation)
    modal = null
}

const closeModal = function(e) {
    const modal = document.querySelector("#modal1")
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
    modal.removeAttribute("aria-modal")
    modal.removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal.querySelector(".js-modal-stop").removeEventListener("click", stopPropagation)
        // modal = null
}

const stopPropagation = function(e) {
    e.stopPropagation()
}

const modal1 = document.querySelector(".js-modal")
modal1.addEventListener("click", openModal)

const openModal2 = function(e) {
    e.preventDefault()
    const target2 = document.querySelector("#modal2")
    const target1 = document.querySelector("#modal1")
    target2.style.display = "flex"
    target2.removeAttribute("aria-hidden")
    target2.setAttribute("aria-modal", "true")
    target1.style.display = "none"
    modal = target2
    modal.addEventListener("click", closeModal2)
    modal.querySelector(".js-modal-close2").addEventListener("click", closeModal2)
    modal.querySelector(".js-modal-stop2").addEventListener("click", stopPropagation)
    modal = null
}

const closeModal2 = function(e) {
    const modal2 = document.querySelector("#modal2")
    if (modal2 === null) return
    e.preventDefault()
    modal2.style.display = "none"
    modal2.setAttribute("aria-hidden", "true")
    modal2.removeAttribute("aria-modal")
    modal2.removeEventListener("click", closeModal2)
        //modal.querySelector(".js-modal-close").removeEventListener("click", closeModal2)
        //modal2.querySelector(".js-modal-stop").removeEventListener("click",stopPropagation)
        //modal2 = null
}

const modal2 = document.querySelector(".js-modal2")
modal2.addEventListener("click", openModal2)

//retour vers modal 1 //

const retourModal1 = document.querySelector(".retour-modal1");
retourModal1.addEventListener("click", openModal)

// java input// 
const input = document.querySelector("input")
const output = document.querySelector("output")
const imagePreview = document.querySelector(".test")
let imagesArray = []

//supprimer l'image de l'apperçu//
function deleteImage(index) {
    imagesArray.splice(index, 1)
    displayImages()
}

// afficher l'image//
function displayImages() {
    let images = ""
    imagesArray.forEach((image, index) => {
        images += `<div class="image">
                <img src="${URL.createObjectURL(image)}" alt="image">
                <span onclick="deleteImage(${index})">&times;</span>
              </div>`

    })
    output.innerHTML = images
}


input.addEventListener("change", function() {
    const file = input.files
    imagesArray.push(file[0])
    displayImages()

})

// creation const pour index modifier//
const headModifier = document.querySelector(".head-modifier");
const login = document.querySelector(".login");
const logout = document.querySelector(".logout");
const sousPhoto = document.querySelector(".sous-photo");
const jsModal = document.querySelector(".js-modal");
const jsModal2 = document.querySelector(".js-modal2");


// fonction pour afficher index modifier en cas de token//
function loginIndex() {

    if (sessionStorage.getItem("token")) {
        headModifier.style.display = "inherit"
        login.style.display = "none"
        logout.style.display = "inherit"
        sousPhoto.style.display = "inherit"
        jsModal.style.display = "inherit"
        jsModal2.style.display = "inherit"

    }
    /*else {
           //console.error("Pas de token");
       }*/

}

loginIndex()



let GalerieImage = document.createElement("div");
GalerieImage.setAttribute("class", "galerie-image");

// affichage des images dans la modale
function affichageGalerie(srcValue, idValue) {

    let titreModal = document.querySelector(".titre-modal");
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figCaption = document.createElement("figCaption");
    let iconeCorbeille = document.createElement("button");
    iconeCorbeille.setAttribute("class", "icone-supprimer");
    iconeCorbeille.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    figure.setAttribute("class", "image-modal");

    img.setAttribute("src", srcValue);
    img.setAttribute("class", idValue);
    figCaption.textContent = "éditer";
    GalerieImage.append(figure);
    figure.append(img, figCaption, iconeCorbeille);
    titreModal.insertAdjacentElement("afterend", GalerieImage);

    iconeCorbeille.addEventListener("click", function() {

        fetch(urlApi + "works/" + idValue, {

            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            },
        })

        .then(e => {

            nettoyage(figure)

        })
    })





}





// faire le select des categories//

document.addEventListener('DOMContentLoaded', () => {
    const selectCategorie = document.querySelector("#categories");

    fetch("http://localhost:5678/api/categories")
        .then(res => {
            return res.json();
        })
        .then(data => {
            let output = "";
            data.forEach(categorie => {
                // console.log(categorie);
                output += `<option value="${categorie.id}">${categorie.name}</option>`;
            })
            selectCategorie.innerHTML = output;
        })
        .catch(err => {
            console.log(err);
        })
});





const boutonSubmit = document.querySelector(".bouton-valider")
const formTitre = document.getElementById("titre-requis")
const formSelect = document.getElementById("categories")
const formPhoto = document.getElementById("form-photo")


// pour verifier si il y a des inputs dans les forms 
formTitre.addEventListener("keyup", boutonActiver);
formSelect.addEventListener("keyup", boutonActiver);




// bouton submit desactiver de base 
function boutonDesactiver() {
    boutonSubmit.disabled = true;
}

boutonSubmit.addEventListener("click", boutonDesactiver);



//fonction pour changer la couleur du bouton submit si le form est rempli
formTitre.addEventListener("keyup", boutonActiver);
formSelect.addEventListener("keyup", boutonActiver);

function boutonActiver() {

    if ((formTitre.value === null && formTitre.value === "") || (formSelect.value === null && formSelect.value === "") || (formPhoto.value === null && formPhoto.value === "")) {

        return
    } else {
        boutonSubmit.removeEventListener("click", boutonDesactiver);
        boutonSubmit.style.backgroundColor = "#1D6154";

    }

}



// envoie des donnees modal 2//

const form = document.getElementById("form-photo");
const titre = document.getElementById("titre-requis");
const image = document.getElementById("upload-image");
const boutonValider = document.querySelector("bouton-valide");
const categories = document.getElementById("categories");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let formData = new FormData(form);

    // console.log([...formData, ])
    formData.append("title", titre.value);
    // formData.append("image",image.files[0]);
    formData.append("category", categories.value);

    fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
        })
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            listeProjet(0);
            let galery = document.querySelector(".galerie-image");
            nettoyage(galery);
            listeProjetModal(0);
            closeModal2(e);
            // document.location.reload(); 

        })
        /*
        .then(document.location.reload())
        .then(affichageProjet());
        */

})