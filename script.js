// script.js

const searchInput = document.getElementById("toolSearch");

searchInput.addEventListener("keyup", function () {

  const value = searchInput.value.toLowerCase();

  const cards = document.querySelectorAll(".tool-card");

  cards.forEach(card => {

    const text = card.innerText.toLowerCase();

    if (text.includes(value)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }

  });

});
