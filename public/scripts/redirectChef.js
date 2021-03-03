const cards = document.querySelectorAll(".card");
for (let card of cards){
    card.addEventListener("click", () => {
        const chefId = card.getAttribute("id")
        window.location.href = `/chefs/${chefId}`
    })
    
}