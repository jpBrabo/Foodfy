const btnElement = document.querySelector("button")

function editRedirect(){
    var idElement = document.querySelector(".receita")
    var id = idElement.getAttribute("id")
    window.location.href = `/admin/edit/${id}`
}
btnElement.onclick = editRedirect