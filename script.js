document.getElementById("form-votacion").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);

  // Tu URL del Apps Script:
  const scriptURL = "https://script.google.com/macros/s/AKfycbx54b8XkWKgKs7mkaW6IYOycsWuXbE8lz9h0kHPH5AB-fUaEqdvjBSLOZRTl89K_Llj/exec";

  const mensaje = document.getElementById("mensaje");
  mensaje.textContent = "Enviando voto...";

  try {
    const response = await fetch(scriptURL, { method: "POST", mode: "no-cors", body: new FormData(form) });
    if (response.ok) {
      mensaje.textContent = "¡Gracias por votar! 🎉";
      form.reset();

      // Mostrar sección de agradecimiento
      document.getElementById("thanksMessage").classList.remove("hidden");
    } else {
      mensaje.textContent = "Ocurrió un error, intentá nuevamente.";
    }
  } catch (error) {
    mensaje.textContent = "Error de conexión. Revisá tu internet.";
    console.error(error);
  }
});