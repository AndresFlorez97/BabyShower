// Helpers: mostrar/ocultar con fade
function mostrarResultado() {
  const formEl = document.getElementById("form-votacion");
  const resultadoEl = document.getElementById("resultado");
  const mensaje = document.getElementById("mensaje");
  const yaVoteBtn = document.getElementById("yaVoteBtn");
if (yaVoteBtn) yaVoteBtn.classList.add("hidden");

  if (mensaje) mensaje.textContent = "";

  if (formEl) formEl.classList.add("hidden");
  if (resultadoEl) {
    resultadoEl.classList.remove("hidden");
    // activa la transición (.panel -> .panel.visible)
    setTimeout(() => resultadoEl.classList.add("visible"), 15);
  }
  // subir al inicio por si quedó abajo
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function mostrarFormulario() {
  const formEl = document.getElementById("form-votacion");
  const resultadoEl = document.getElementById("resultado");
  const yaVoteBtn = document.getElementById("yaVoteBtn");
if (yaVoteBtn) yaVoteBtn.classList.remove("hidden");

  if (resultadoEl) {
    resultadoEl.classList.remove("visible");
    setTimeout(() => resultadoEl.classList.add("hidden"), 200);
  }
  if (formEl) formEl.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// --------- SUBMIT DEL FORM ---------
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

    // Intentamos leer texto (si hay CORS puede ser vacío)
    let text = "";
    try { text = await response.text(); } catch (_) {}

    console.log("Respuesta del servidor:", text || "(sin texto)");

    // Éxito si: response.ok OR hubo texto OR respuesta 'opaque' (no-cors)
    const exito = response.ok || (text && text.trim().length > 0) || response.type === "opaque";

    if (exito) {
      form.reset();
      mostrarResultado();
    } else {
      mensaje.textContent = "Ocurrió un error al enviar el voto. Intentá nuevamente.";
      console.error("Respuesta inesperada del servidor:", text);
      // Fallback suave: mostrar igual tras 1.2s si el usuario quiere avanzar
      setTimeout(() => mostrarResultado(), 1200);
    }
  } catch (error) {
    // Si hay error de red, avisamos pero permitimos avanzar con fallback
    mensaje.textContent = "Error de conexión. Revisá tu internet.";
    console.error("Error en fetch:", error);
    setTimeout(() => mostrarResultado(), 1200);
  }
});

// --------- BOTÓN "YA VOTÉ" ---------
const yaVoteBtn = document.getElementById("yaVoteBtn");
if (yaVoteBtn) {
  yaVoteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarResultado();
  });
}

// --------- BOTÓN "VOLVER A VOTAR" (opcional) ---------
const volverBtn = document.getElementById("volverBtn");
if (volverBtn) {
  volverBtn.addEventListener("click", (e) => {
    e.preventDefault();
    mostrarFormulario();
  });
}

// --------- COPIAR ALIAS ---------
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
          document.execCommand("copy");
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