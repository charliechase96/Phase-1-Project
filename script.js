const EMPTY_HEART = '♡'
const FULL_HEART = '♥'
const allKittens = [];
const orangeKittens = [];
const blackKittens = [];
const whiteKittens = [];
const grayKittens = [];
const tuxedoKittens = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/kittens")
    .then((response) => response.json())
    .then((data) => data.forEach(renderKittens))
    
    const kittenColorDropDown = document.getElementById("kitten-color");

    kittenColorDropDown.addEventListener("change", (event) => {
        const result = allKittens.filter(kitten => kitten.color === event.target.value);
        let allKittensCollection = document.getElementById("kitten-collection");
        allKittensCollection.textContent = "";
        result.forEach(renderKittens);

    })

    function renderKittens(kitten) {

        allKittens.push(kitten);
        
        let card = document.createElement("div");
        card.classList.add("card");
        
        let allKittensCollection = document.getElementById("kitten-collection");
        allKittensCollection.appendChild(card);
        
        let kittenImg = document.createElement("img");
        kittenImg.src = `${kitten.image}`;
        card.appendChild(kittenImg);
        kittenImg.classList.add("kitten-avatar");
        kittenImg.setAttribute("id", `kitten${kitten.id}`);
        
        let likeButton = document.createElement("button");
        likeButton.addEventListener("click", (event) => {
            addLike(event, kitten);
        })
        
        likeButton.classList.add("like-btn");
        likeButton.setAttribute("id", `${kitten.id}`);
        likeButton.textContent = EMPTY_HEART;
        card.appendChild(likeButton);
        
        
        function addLike(event, kitten) {
            if (event.target.textContent === EMPTY_HEART) {
                event.target.textContent = FULL_HEART;
                renderFavoriteKitten(kitten);
            }
            else {
                event.target.textContent = EMPTY_HEART;
                const selectedImage = (document.getElementById(`${kitten.image}`));
                selectedImage.remove();
            }
        }
        
        function renderFavoriteKitten(kitten) {
            let favoriteKittensArea = document.getElementById("favorite-kittens");
            const image = document.createElement("img");
            image.id = `${kitten.image}`;
            image.src = kitten.image;
            favoriteKittensArea.append(image);
        }
    }
    
})