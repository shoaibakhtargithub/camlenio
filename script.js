
document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".faq-item").forEach(item => {

    item.addEventListener("click", function () {
  
      const isActive = this.classList.contains("active");
  
      // close all
      document.querySelectorAll(".faq-item").forEach(el => {
        el.classList.remove("active");
        el.querySelector(".faq-icon").textContent = "+";
      });
  
      // open clicked
      if (!isActive) {
        this.classList.add("active");
        this.querySelector(".faq-icon").textContent = "−";
      }
  
    });
  
  });
  
  
  const popup = document.getElementById("popup");
  
  // OPEN POPUP
  document.querySelectorAll(".open-popup").forEach(btn => {
  btn.addEventListener("click", () => {
  popup.style.display = "flex";
  });
  });
  
  
  document.querySelector(".close-btn").addEventListener("click", () => {
  popup.style.display = "none";
  });
  
  // CLOSE on outside click
  window.addEventListener("click", (e) => {
  if (e.target === popup) {
  popup.style.display = "none";
  }
  });
  
 
  document.querySelectorAll(".popup .form-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
  e.preventDefault();
  
  
    // clear inputs
    popup.querySelectorAll("input, select").forEach(input => {
      input.value = "";
    });
  
    // close popup
    popup.style.display = "none";
  });
  
  
  });
  
  });
  
