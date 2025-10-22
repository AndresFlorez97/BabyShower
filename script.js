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

      const equipo = data.get("equipo");

      // Obtener votos actuales del almacenamiento local
      let votosRosa = parseInt(localStorage.getItem("votosRosa") || "0");
      let votosCeleste = parseInt(localStorage.getItem("votosCeleste") || "0");

      // Sumar voto según el equipo elegido
      if (equipo === "rosa") votosRosa++;
      if (equipo === "celeste") votosCeleste++;

      // Guardar los nuevos valores
      localStorage.setItem("votosRosa", votosRosa);
      localStorage.setItem("votosCeleste", votosCeleste);

      // Mostrar los resultados actualizados
      document.getElementById("votosRosa").textContent = votosRosa;
      document.getElementById("votosCeleste").textContent = votosCeleste;

      // Ocultar el formulario y mostrar resultados
      document.getElementById("form-votacion").style.display = "none";
      document.getElementById("resultado").style.display = "block";

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