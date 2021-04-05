var i = 0;
var y = 0;

function collapsible() {
    if (i == 0) {
        document.getElementById("collapsile__content").style.display = 'block';
        document.getElementById("arrowproject").className = "fas fa-chevron-down"
        i = 1;
    } else {
        document.getElementById("arrowproject").className = "fas fa-chevron-right"
        document.getElementById("collapsile__content").style.display = 'none';
        i = 0;
    }
}

function collapsiblegame() {
    if (y == 0) {
        document.getElementById("collapsile__content__game").style.display = 'block';
        document.getElementById("arrowgame").className = "fas fa-chevron-down"
        y = 1;
    } else {
        document.getElementById("arrowgame").className = "fas fa-chevron-right"
        document.getElementById("collapsile__content__game").style.display = 'none';
        y = 0;
    }
}

function collapsibleonload() {
        document.getElementById("arrowproject").className = "fas fa-chevron-right"
        document.getElementById("collapsile__content").style.display = 'none';
        i = 0;
        document.getElementById("arrowgame").className = "fas fa-chevron-right"
        document.getElementById("collapsile__content__game").style.display = 'none';
        y = 0;
}