const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/kittens")
    .then((response) => response.json())
    .then((data) => data.forEach(renderKittens))

        function renderKittens(kitten) {
            let card = document.createElement("div");
            card.classList.add("card");
            
            let kittenCollection = document.getElementById("kitten-collection");
            kittenCollection.appendChild(card);

            let kittenImg = document.createElement("img");
            kittenImg.src = `${kitten.image}`;
            card.appendChild(kittenImg);
            kittenImg.classList.add("kitten-avatar");
            kittenImg.setAttribute("id", `kitten${kitten.id}`);

            let likeButton = document.createElement("button");
            likeButton.addEventListener("click", (event) => {
                addLike(event);
            })

            likeButton.classList.add("like-btn");
            likeButton.setAttribute("id", `${kitten.id}`);
            likeButton.textContent = EMPTY_HEART;
            card.appendChild(likeButton);

            function addLike(event) {
                if (event.target.textContent === EMPTY_HEART) {
                    event.target.textContent = FULL_HEART;
                }
                else {
                    event.target.textContent = EMPTY_HEART;
                }
                }
                
            let favoriteKittensArea = document.getElementById("favorite-kittens");
            let favoriteKittensArray = [];
            

            }
        }
)