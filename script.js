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
    const text = card.innerText.toLowerCase();

    if (text.includes(value)) {
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

// GOOGLE FORMS BACKGROUND SILENT API TRANSMISSION
function submitToolRequest() {
  const textDetails = document.getElementById('reqToolText').value.trim();
  if (!textDetails) {
    alert('Please enter some tool details first!');
    return;
  }
  
  // Prevent duplicate clicking anomalies
  document.getElementById('reqFormWrapper').style.display = "none";
  document.getElementById('reqSuccessMessage').innerText = "Submitting securely...";
  document.getElementById('reqSuccessMessage').style.display = "block";

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
    document.getElementById('reqSuccessMessage').style.background = "#f0fdf4";
    document.getElementById('reqSuccessMessage').style.color = "#16a34a";
    document.getElementById('reqSuccessMessage').style.borderColor = "#bbf7d0";
    document.getElementById('reqSuccessMessage').innerText = "Thank you! Your utility tool request has been securely recorded.";
  })
  .catch(function(error) {
    document.getElementById('reqSuccessMessage').innerText = "Network pipeline error. Please check connection and try again.";
    document.getElementById('reqFormWrapper').style.display = "flex"; 
  });

  // Wipe text layer node
  document.getElementById('reqToolText').value = "";
}

if (submitRequestBtn) {
  submitRequestBtn.addEventListener("click", submitToolRequest);
}
