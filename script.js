document.getElementById("voteForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const team = document.querySelector('input[name="team"]:checked').value;

  if (name && team) {
    // Guardar datos en localStorage (simula el envío)
    localStorage.setItem("babyshower_vote", JSON.stringify({ name, team }));

    // Ocultar el formulario y mostrar mensaje de gracias
    document.getElementById("voteForm").classList.add("hidden");
    document.getElementById("thanksMessage").classList.remove("hidden");
  }
});