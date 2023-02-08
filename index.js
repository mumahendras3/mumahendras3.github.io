let input;
function copyData() {
    input = document.getElementById("input").value;
    localStorage.setItem("output", input);
}