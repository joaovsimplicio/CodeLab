function pesquisar(event) {
  event.preventDefault();
  const termo = document.getElementById('campoBusca').value;
  alert("Você buscou por: " + termo);
}