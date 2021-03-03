const btnElement = document.querySelector("button");

function editRedirect() {
  var idElement = document.querySelector(".chef");
  var id = idElement.getAttribute("id");
  window.location.href = `/admin/chefs/edit/${id}`;
}
btnElement.onclick = editRedirect;
