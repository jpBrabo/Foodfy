function addPrepare() {
    const prepare = document.querySelector("#prepare");
    const fieldContainer = document.querySelectorAll(".prepare");
  
    // Realiza um clone do último ingrediente adicionado
    const newField = fieldContainer[fieldContainer.length - 1].cloneNode(true);
  
    // Não adiciona um novo input se o último tem um valor vazio
    if (newField.children[0].value == "") return false;
  
    // Deixa o valor do input vazio
    newField.children[0].value = "";
    prepare.appendChild(newField);
  }
  
document
    .querySelector(".add-prepare")
    .addEventListener("click", addPrepare);