document.addEventListener("DOMContentLoaded", () => {

  /* =========================
  REUSABLE WEBHOOK FUNCTION
  ========================== */
  async function sendToWebhook(payload, btn, defaultText) {
  try {
  btn.disabled = true;
  btn.textContent = "Submitting...";
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 8000); // timeout safety
  
    const response = await fetch("https://hkdk.events/cxyk8pb20cuty9", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
      signal: controller.signal
    });
  
    if (!response.ok) {
      throw new Error("Webhook request failed");
    }
  
    const data = await response.json();
    alert(data.message || "Submitted successfully");
  
  } catch (error) {
    console.error("Webhook Error:", error);
    alert("Something went wrong. Please try again!");
  } finally {
    btn.disabled = false;
    btn.textContent = defaultText;
  }
  
  }
  
  /* =========================
  FAQ ACCORDION
  ========================== */
  document.querySelectorAll(".faq-item").forEach(item => {
  item.addEventListener("click", function () {
  
      const isActive = this.classList.contains("active");
  
    document.querySelectorAll(".faq-item").forEach(el => {
      el.classList.remove("active");
      el.querySelector(".faq-icon").textContent = "+";
    });
  
    if (!isActive) {
      this.classList.add("active");
      this.querySelector(".faq-icon").textContent = "−";
    }
  });

  
  });
  
  /* =========================
  POPUP OPEN / CLOSE
  ========================== */
  const popup = document.getElementById("popup");
  
  document.querySelectorAll(".open-popup").forEach(btn => {
  btn.addEventListener("click", () => {
  popup.style.display = "flex";
  });
  });
  
  document.querySelector(".close-btn").addEventListener("click", () => {
  popup.style.display = "none";
  });
  
  window.addEventListener("click", (e) => {
  if (e.target === popup) {
  popup.style.display = "none";
  }
  });
  
  /* =========================
  POPUP FORM SUBMIT
  ========================== */
  document.querySelectorAll(".popup .form-btn").forEach(btn => {
  btn.addEventListener("click", async (e) => {
  e.preventDefault();
  
    const inputs = popup.querySelectorAll("input");
  
    const name = inputs[0].value.trim();
    const phone = inputs[1].value.trim();
  
    if (!name || !phone) {
      alert("Please fill all fields");
      return;
    }
  
    await sendToWebhook(
      {
        name,
        phone,
        source: "popup",
        time: new Date().toISOString(),
        userAgent: navigator.userAgent
      },
      btn,
      "Submit"
    );
  
    inputs.forEach(input => input.value = "");
    popup.style.display = "none";
  });

  
  });
  
  /* =========================
  HERO FORM SUBMIT
  ========================== */
  document.querySelector(".hero-form .form-btn").addEventListener("click", async (e) => {
  e.preventDefault();
  
    const form = document.querySelector(".hero-form");
  
  const inputs = form.querySelectorAll("input");
  const select = form.querySelector("select");
  
  const name = inputs[0].value.trim();
  const phone = inputs[1].value.trim();
  const company = inputs[2].value.trim();
  const businessType = select.value;
  
  if (!name || !phone || !company || !businessType) {
    alert("Please fill all fields");
    return;
  }
  
  await sendToWebhook(
    {
      name,
      phone,
      company,
      businessType,
      source: "hero-form",
      time: new Date().toISOString(),
      userAgent: navigator.userAgent
    },
    e.target,
    "Schedule Demo"
  );
  
  inputs.forEach(input => input.value = "");
  select.selectedIndex = 0;
  
  });
  
  });
  