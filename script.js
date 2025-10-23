// FORM SUBMIT -> send to Apps Script and show donation panel with fade
document.getElementById("form-votacion").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);
  const mensaje = document.getElementById("mensaje");

  // Tu URL del Apps Script:
  const scriptURL = "https://script.google.com/macros/s/AKfycby1WgEkfRVL46Bn0-Gr6Vf98kIqUVSxeyBm282SgjwYhSQhaTm3A-0A5YUXQSI7RwQf/exec";

  mensaje.textContent = "Enviando voto...";

  try {
    const response = await fetch(scriptURL, { method: "POST", body: data });
    const text = await response.text();
    console.log("Respuesta del servidor:", text);

    if (text.includes("Success") || text.includes("OK") || text.trim().length > 0) {
      // éxito: ocultar formulario y mostrar panel de donación con fade
      mensaje.textContent = "";
      form.reset();

      const formEl = document.getElementById("form-votacion");
      const resultadoEl = document.getElementById("resultado");

      if (formEl) formEl.classList.add("hidden");
      if (resultadoEl) {
        resultadoEl.classList.remove("hidden");
        // trigger fade
        setTimeout(() => resultadoEl.classList.add("visible"), 20);
      }
    } else {
      mensaje.textContent = "Ocurrió un error al enviar el voto. Intentá nuevamente.";
      console.error("Respuesta inesperada del servidor:", text);
    }
  } catch (error) {
    mensaje.textContent = "Error de conexión. Revisá tu internet.";
    console.error("Error en fetch:", error);
  }
});

// COPIAR ALIAS al portapapeles
document.addEventListener("DOMContentLoaded", () => {
  const copyBtn = document.getElementById("copyAliasBtn");
  const aliasText = document.getElementById("aliasText");

  if (copyBtn && aliasText) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(aliasText.textContent.trim());
        copyBtn.textContent = "Copiado!";
        setTimeout(() => (copyBtn.textContent = "Copiar"), 1800);
      } catch (err) {
        // fallback: selección manual
        const range = document.createRange();
        range.selectNode(aliasText);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        try {
          document.execCommand('copy');
          copyBtn.textContent = "Copiado!";
          setTimeout(() => (copyBtn.textContent = "Copiar"), 1800);
        } catch (e) {
          copyBtn.textContent = "Error";
          console.error("No se pudo copiar", e);
        }
        window.getSelection().removeAllRanges();
      }
    });
  }
});