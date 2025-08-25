var result;
var tempans = [];
var tempexp = [];

function insert (num) {
    document.getElementById('textscreen').value += num;
}

function clearScreen() {
    document.getElementById('textscreen').value = "";
}

function backspace() {
    var exp = document.getElementById('textscreen').value;
    document.getElementById('textscreen').value = exp.substring(0, exp.length - 1);
}

function calculate() {
    var exp = document.getElementById('textscreen').value;
    if (!exp){
        if (result !== undefined) {
            document.getElementById('textscreen').value = result;
            return;
        }
        alert("Please enter a valid expression");
        return;
    }
    tempexp.push(exp);
    result = eval(exp);
    tempans.push(result);
    document.getElementById('textscreen').value = result;
}

