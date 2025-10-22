document.getElementById("form-votacion").addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = new FormData(form);

  // Tu URL del Apps Script:
  const scriptURL = "https://script.google.com/macros/s/AKfycby1WgEkfRVL46Bn0-Gr6Vf98kIqUVSxeyBm282SgjwYhSQhaTm3A-0A5YUXQSI7RwQf/exec";

  const mensaje = document.getElementById("mensaje");
  mensaje.textContent = "Enviando voto...";

  try {
    // Enviar los datos a Google Sheets y esperar la respuesta
    const response = await fetch(scriptURL, { method: "POST", body: data });
    const text = await response.text();

    console.log("Respuesta del servidor:", text); // útil para depuración

    if (text.includes("Success") || text.includes("OK")) {
      // ✅ Éxito: se guardó el voto
      mensaje.textContent = "¡Gracias por votar! 🎉";
      form.reset();

      // Obtener qué equipo fue seleccionado y normalizar
      let equipo = data.get("team") || data.get("equipo") || "";
      equipo = String(equipo).trim().toLowerCase(); // ahora siempre minúscula

      // Obtener votos actuales del almacenamiento local
      let votosRosa = parseInt(localStorage.getItem("votosRosa") || "0", 10);
      let votosCeleste = parseInt(localStorage.getItem("votosCeleste") || "0", 10);

      // Sumar voto según el equipo elegido
      if (equipo === "rosa") {
        votosRosa++;
      } else if (equipo === "celeste") {
        votosCeleste++;
      } else {
        console.warn("⚠️ Equipo no reconocido:", equipo);
      }

      // Guardar los nuevos valores
      localStorage.setItem("votosRosa", String(votosRosa));
      localStorage.setItem("votosCeleste", String(votosCeleste));

      // Mostrar los resultados actualizados
      const elRosa = document.getElementById("votosRosa");
      const elCeleste = document.getElementById("votosCeleste");
      if (elRosa) elRosa.textContent = votosRosa;
      if (elCeleste) elCeleste.textContent = votosCeleste;

      // Ocultar el formulario y mostrar resultados
      const formContainer = document.getElementById("form-votacion");
      const resultadoContainer = document.getElementById("resultado");

      if (formContainer) formContainer.style.display = "none";
      if (resultadoContainer) resultadoContainer.style.display = "block";

      mensaje.textContent = "";
    } else {
      // ⚠️ El servidor respondió, pero no con “Success”
      mensaje.textContent = "Ocurrió un error al enviar el voto. Intentá nuevamente.";
      console.error("Respuesta inesperada del servidor:", text);
    }
  } catch (error) {
    // ❌ Error de red o conexión
    mensaje.textContent = "Error de conexión. Revisá tu internet.";
    console.error("Error en fetch:", error);
  }
});

// Mostrar los votos guardados cuando se carga la página
document.addEventListener("DOMContentLoaded", () => {
  const elRosa = document.getElementById("votosRosa");
  const elCeleste = document.getElementById("votosCeleste");

  if (elRosa) elRosa.textContent = localStorage.getItem("votosRosa") || "0";
  if (elCeleste) elCeleste.textContent = localStorage.getItem("votosCeleste") || "0";
});