document.getElementById("form-votacion").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);

  // Tu URL del Apps Script:
  const scriptURL = "https://script.google.com/macros/s/AKfycby1WgEkfRVL46Bn0-Gr6Vf98kIqUVSxeyBm282SgjwYhSQhaTm3A-0A5YUXQSI7RwQf/exec";

  const mensaje = document.getElementById("mensaje");
  mensaje.textContent = "Enviando voto...";

  try {
    const response = await fetch(scriptURL, { method: "POST", body: data });
    const text = await response.text();

    console.log("Respuesta del servidor:", text);

    if (text.includes("Success") || text.includes("OK")) {
      // Éxito: ocultar formulario y mostrar bloque de donación
      mensaje.textContent = "";
      form.reset();

      const formEl = document.getElementById("form-votacion");
      const resultadoEl = document.getElementById("resultado");

      if (formEl) formEl.style.display = "none";
      if (resultadoEl) resultadoEl.style.display = "block";
    } else {
      mensaje.textContent = "Ocurrió un error al enviar el voto. Intentá nuevamente.";
      console.error("Respuesta inesperada del servidor:", text);
    }
  } catch (error) {
    mensaje.textContent = "Error de conexión. Revisá tu internet.";
    console.error("Error en fetch:", error);
  }
});