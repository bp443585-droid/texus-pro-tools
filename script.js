// Google Analytics Loader
const gaScript = document.createElement("script");
gaScript.async = true;
gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-83V8ELYZ65";
document.head.appendChild(gaScript);

window.dataLayer = window.dataLayer || [];
function gtag(){ dataLayer.push(arguments); }

gtag('js', new Date());
gtag('config', 'G-83V8ELYZ65');
























// script.js

const searchInput = document.getElementById("toolSearch");
const searchBtn = document.getElementById("searchBtn");
const submitRequestBtn = document.getElementById("submitRequestBtn");

// SEARCH FILTER LOGIC WITH NOT-FOUND DETECTOR
searchInput.addEventListener("keyup", function () {
  const value = searchInput.value.toLowerCase().trim();
  const cards = document.querySelectorAll(".tool-card");
  const notFoundCard = document.getElementById("notFoundCard");
  let visibleCount = 0;

 cards.forEach(card => {
  const text = (
    card.querySelector("h3").innerText + " " +
    card.querySelector("p").innerText
  ).toLowerCase();

  const words = value.split(/\s+/).filter(Boolean);

  const matched = words.every(word => text.includes(word));

  if (matched) {
    card.style.display = "block";
    visibleCount++;
  } else {
    card.style.display = "none";
  }
});

  // Toggle tool not found display state matrix
  if (visibleCount === 0 && value !== "") {
    notFoundCard.style.display = "block";
  } else {
    notFoundCard.style.display = "none";
  }
});

// MOBILE KEYBOARD OBFUSCATION MATRIX
function forceHideKeyboard() {
  searchInput.blur();
}

if (searchBtn) {
  searchBtn.addEventListener("click", forceHideKeyboard);
}

searchInput.addEventListener("keydown", function (e) {
  if (e.keyCode === 13 || e.key === 'Enter') {
    forceHideKeyboard();
  }
});

// GOOGLE FORMS BACKGROUND SILENT API TRANSMISSION + AUTO RESET CONSOLE
function submitToolRequest() {
  const textDetails = document.getElementById('reqToolText').value.trim();
  if (!textDetails) {
    alert('Please enter some tool details first!');
    return;
  }
  
  const formWrapper = document.getElementById('reqFormWrapper');
  const successMessage = document.getElementById('reqSuccessMessage');
  const notFoundCard = document.getElementById('notFoundCard');
  const cards = document.querySelectorAll(".tool-card");

  // Prevent duplicate clicking anomalies
  formWrapper.style.display = "none";
  successMessage.innerText = "Submitting securely...";
  successMessage.style.display = "block";

  // Target structures configurations
  const googleFormId = "1FAIpQLSdliGlv58A1ksgkoRCmX7YOKliD40HfeIexe0AKZ7XcYRUS5w"; 
  const questionEntryId = "entry.784588382";
  const formActionUrl = "https://docs.google.com/forms/d/e/" + googleFormId + "/formResponse";
  
  const formData = new FormData();
  formData.append(questionEntryId, textDetails);

  // Cross-origin tunnel transmission pipeline
  fetch(formActionUrl, {
    method: 'POST',
    mode: 'no-cors', 
    body: formData
  })
  .then(function() {
    successMessage.style.background = "#f0fdf4";
    successMessage.style.color = "#16a34a";
    successMessage.style.borderColor = "#bbf7d0";
    successMessage.style.display = "block";
    successMessage.innerText = "Thank you! Your utility tool request has been securely recorded.";

    // SMART AUTO-RESET TIMEOUT TRIGGER (After 3 Seconds)
    setTimeout(function() {
      // Clear inputs
      searchInput.value = "";
      document.getElementById('reqToolText').value = "";
      
      // Hide error consoles
      notFoundCard.style.display = "none";
      successMessage.style.display = "none";
      
      // Restore input block layouts
      formWrapper.style.display = "flex";
      
      // Show all tools back on screen smoothly
      cards.forEach(card => {
        card.style.display = "block";
      });
    }, 3000);

  })
  .catch(function(error) {
    successMessage.innerText = "Network pipeline error. Please check connection and try again.";
    formWrapper.style.display = "flex"; 
  });
}

if (submitRequestBtn) {
  submitRequestBtn.addEventListener("click", submitToolRequest);
}








