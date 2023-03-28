const EMPTY_HEART = '♡'
const FULL_HEART = '♥'
const allKittens = [];

document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/kittens")
    .then((response) => response.json())
    .then((data) => data.forEach(renderKittens))

    function renderKittens(kitten) {

            const orangeKittens = [];
            const blackKittens = [];
            const whiteKittens = [];
            const grayKittens = [];
            const tuxedoKittens = [];

            allKittens.push(kitten);

            allKittens.filter(sortKittens);
            
            function sortKittens(kitten) {

                if (kitten.color === "orange") {
                    orangeKittens.push(kitten);
                }
                else if (kitten.color === "black") {
                    blackKittens.push(kitten);
                }
                else if (kitten.color === "white") {
                    whiteKittens.push(kitten);
                }
                else if (kitten.color === "gray") {
                    grayKittens.push(kitten);
                }
                else if (kitten.color === "tuxedo") {
                    tuxedoKittens.push(kitten);
                }
            }
            
            // currently trying to implement this event listener to display each type of kitten ONLY, and hide the others. It is not going well.

            // function displayKittensByColor() {
            //     const kittenColor = document.getElementById("kitten-color").value;
            //     kittenColor.addEventListener("change", (event) => {
            //         if (kittenColor === "orange") {
            //             document.remove(grayKittens);
            //             document.remove(blackKittens);
            //             document.remove(whiteKittens);
            //             document.remove(tuxedoKittens);
            //         }
            //     })
            // }

            
            
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