const EMPTY_HEART = '♡'
const FULL_HEART = '♥'
const allKittens = [];

document.addEventListener("DOMContentLoaded", () => {

    
    fetch("https://api.jsonbin.io/b/658128f41f5677401f0fa12e", {
        headers: {
            'secret-key': '$2a$10$1f3EFonz5mcqbi.r83S4YuxFhSBkJ9CFVVJ5OVEcqlnjF9wIqMIVO'
        }
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(9);
        data.forEach(renderKittens)})
    
        console.log(3);
    
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
                const selectedImage = (document.getElementById(`favorite-kitten${kitten.id}`));
                const selectedKittenCard = document.getElementById(`favorite-kitten-card${kitten.id}`);
                selectedKittenCard.remove();
                selectedImage.remove();
                
            }
        }
        
        
        function renderFavoriteKitten(kitten) {

            
            let card = document.createElement("div");
            card.classList.add("card");
            card.setAttribute("id", `favorite-kitten-card${kitten.id}`);
        
            
            let favoriteKittensArea = document.getElementById("favorite-kittens");
            favoriteKittensArea.appendChild(card);
            
            
            let kittenImg = document.createElement("img");
            kittenImg.src = `${kitten.image}`;
            card.appendChild(kittenImg);
            kittenImg.classList.add("kitten-avatar");
            kittenImg.setAttribute("id", `favorite-kitten${kitten.id}`);
        }

        
        function highlightKittensText() {

            
            const h1 = document.getElementById("kittens");

            
            h1.addEventListener("mouseover", event => {
                h1.style.color = "MediumPurple";
            });

            
            h1.addEventListener("mouseout", event => {
                h1.style.color = "black";
            });
        }

        
        highlightKittensText();
    }

    const kittenColorDropDown = document.getElementById("kitten-color");

    
    kittenColorDropDown.addEventListener("change", (event) => {
        const result = allKittens.filter(kitten => kitten.color === event.target.value);
        let allKittensCollection = document.getElementById("kitten-collection");
        allKittensCollection.textContent = "";
        result.forEach(renderKittens);

    })
})