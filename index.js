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

    var i = 0;
    var y = 0;
    let strq = "";
    let stra = "Answer: ";

    fetch('https://official-joke-api.appspot.com/jokes/random').then(
    resp => resp.json()) // this returns a promise
        .then(repos => {
            
            strq = strq.concat("Question ")

            strq = strq.concat(repos.type)

            strq = strq.concat(" id ")

            strq = strq.concat(repos.id)

            strq = strq.concat(": ")

            document.getElementById('jokehead').innerHTML = "Some random joke for fun!"
            document.getElementById('jokeq').innerHTML = strq.concat(repos.setup);
            document.getElementById('jokea').innerHTML = stra.concat(repos.punchline);
            console.log(repos.type);
        
        }).catch(ex => {
        console.error(ex);
    })



        document.getElementById("arrowproject").className = "fas fa-chevron-right"
        document.getElementById("collapsile__content").style.display = 'none';
        i = 0;
        document.getElementById("arrowgame").className = "fas fa-chevron-right"
        document.getElementById("collapsile__content__game").style.display = 'none';
        y = 0;
}