let input;
let i = 0;
const array = [];

function copyData() {
    input = document.getElementById("input").value;
    localStorage.setItem("output", input);
}

function updateArray() {
    array.push({i});
    localStorage.setItem("array", array);
    i++;
}