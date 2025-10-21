document.getElementById("form-votacion").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);

  // Tu URL del Apps Script:
  const scriptURL = "https://script.google.com/macros/s/AKfycby06ZEEGPGcl5S2PG_PnZxheuXbE3xpuLxqnSHr1bRvH1ZUUnBSu5Y2H_v6N-wZQUy5/exec";

  const mensaje = document.getElementById("mensaje");
  mensaje.textContent = "Enviando voto...";

  try {
    const response = await fetch(scriptURL, { method: "POST", body: data });
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