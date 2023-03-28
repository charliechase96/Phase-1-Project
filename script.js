const EMPTY_HEART = '♡'
const FULL_HEART = '♥'
const allKittens = [];
const orangeKittens = [];
const blackKittens = [];
const whiteKittens = [];
const grayKittens = [];
const tuxedoKittens = [];

document.addEventListener("DOMContentLoaded", () => {

    // fetch kitten data from db.json file
    fetch("http://localhost:3000/kittens")
    .then((response) => response.json())
    .then((data) => data.forEach(renderKittens))
    
    // grab dropdown
    const kittenColorDropDown = document.getElementById("kitten-color");

    // upon selecting color from dropdown, each kitten is filtered by color to append to the DOM if it matches the dropdown color, via the renderKittens function that renders all kittens to the DOM
    kittenColorDropDown.addEventListener("change", (event) => {
        const result = allKittens.filter(kitten => kitten.color === event.target.value);
        let allKittensCollection = document.getElementById("kitten-collection");
        allKittensCollection.textContent = "";
        result.forEach(renderKittens);

    })

    // renders kitten images to DOM with cards and like buttons
    function renderKittens(kitten) {

        // push all kitten data to allKittens array
        allKittens.push(kitten);
        
        // create cards and give them classes of "card"
        let card = document.createElement("div");
        card.classList.add("card");
        
        //grab div area for all kittens and append cards to it
        let allKittensCollection = document.getElementById("kitten-collection");
        allKittensCollection.appendChild(card);

        // create images via db.json source data and append images to cards, with class and id added
        let kittenImg = document.createElement("img");
        kittenImg.src = `${kitten.image}`;
        card.appendChild(kittenImg);
        kittenImg.classList.add("kitten-avatar");
        kittenImg.setAttribute("id", `kitten${kitten.id}`);
        
        // create like buttons and event listner for like buttons
        let likeButton = document.createElement("button");
        likeButton.addEventListener("click", (event) => {
            addLike(event, kitten);
        })
        
        // add class and id for like buttons and append buttons to cards
        likeButton.classList.add("like-btn");
        likeButton.setAttribute("id", `${kitten.id}`);
        likeButton.textContent = EMPTY_HEART;
        card.appendChild(likeButton);
        
        // function to add like or dislike value to buttons
        function addLike(event, kitten) {
            // if empty heart, fill upon click, then render that kitten to favorite kittens area
            if (event.target.textContent === EMPTY_HEART) {
                event.target.textContent = FULL_HEART;
                renderFavoriteKitten(kitten);
            }
            // else if full heart already, empty the heart, and remove the kitten and card from that area
            else {
                event.target.textContent = EMPTY_HEART;
                const selectedImage = (document.getElementById(`favorite-kitten${kitten.id}`));
                const selectedKittenCard = document.getElementById(`favorite-kitten-card${kitten.id}`);
                selectedKittenCard.remove();
                selectedImage.remove();
                
            }
        }
        
        // renders kittens that area liked to the favorite kittens area
        function renderFavoriteKitten(kitten) {

            // create favorite kitten cards with attributes
            let card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("id", `favorite-kitten-card${kitten.id}`);
        
            // grab favorite kittens area div and append the cards
            let favoriteKittensArea = document.getElementById("favorite-kittens");
            favoriteKittensArea.appendChild(card);
            
            // append the favorited images to the cards (with attributes) that have been appended to this area
            let kittenImg = document.createElement("img");
            kittenImg.src = `${kitten.image}`;
            card.appendChild(kittenImg);
            kittenImg.classList.add("kitten-avatar");
            kittenImg.setAttribute("id", `favorite-kitten${kitten.id}`);
        }
    }
})