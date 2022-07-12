var i = 0;
var y = 0;

function mainonload(){

    collapsibleonload()

    date()
    joke()

    onloadservice("servicecard.json", "services__card", "services__container__card", "scard")
    onloadservice("gamecard.json", "games__card", "games__container__card", "gcard")
}

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

    document.getElementById("arrowproject").className = "fas fa-chevron-right"
    document.getElementById("collapsile__content").style.display = 'none';
    i = 0;
    document.getElementById("arrowgame").className = "fas fa-chevron-right"
    document.getElementById("collapsile__content__game").style.display = 'none';
    y = 0;

}

function dayordays(day) {
    if (day > 1) {
        return "days"
    } else if (day <= 1) {
        return "day"
    }
}

function joke(){
    let strq = "";
    let stra = "Answer: ";

    fetch('https://official-joke-api.appspot.com/jokes/random').then(
    resp => resp.json())
        .then(repos => {
            
            strq = strq.concat("Question ")

            strq = strq.concat(repos.type)

            strq = strq.concat(" id ")

            strq = strq.concat(repos.id)

            strq = strq.concat(": ")

            document.getElementById('jokehead').innerHTML = "Some random joke for fun!"
            document.getElementById('jokeq').innerHTML = strq.concat(repos.setup);
            document.getElementById('jokea').innerHTML = stra.concat(repos.punchline);
        
        }).catch(ex => {
        console.error(ex);
    })
}

function date(){
    var nowtoday = new Date();
    var tyear = nowtoday.getFullYear()
    var tmonth = nowtoday.getMonth() + 1
    var tdate = nowtoday.getDate()
    const todayconst = new DateExt(tdate, tmonth, tyear);
    const editday = new DateExt(26, 12, 2021);
    const lpday = new DateExt(9, 8, 2015);
    const bday = new DateExt(1, 5, 1999);

    var liveday = getDifference(bday, todayconst)
    
    var passday = getDifference(editday, todayconst)
    
    var passlday = getDifference(lpday, todayconst)
    
    szliveday = "I lived " + liveday + " " + dayordays(liveday) + "."
    szplday = "It's been " + passlday + " " + dayordays(passlday) + " since k.-.<strike>revenovich</strike>.p."
    szpday = "And it's been " + passday + " " + dayordays(passday) + " since I edited the code of this website."

    document.getElementById("liveday").innerHTML = szliveday;
    document.getElementById("plday").innerHTML = szplday;
    document.getElementById("editday").innerHTML = szpday;
}

class DateExt
{
    constructor(d,m,y)
    {
        this.d = d;
            this.m = m;
            this.y = y;
    }
}
 
// To store number of days in
    // all months from January to Dec.
let monthDays=[31, 28, 31, 30, 31, 30,
                            31, 31, 30, 31, 30, 31];
// This function counts number of
    // leap years before the given date                           
function countLeapYears(d)
{
    let years = d.y;
  
        // Check if the current year needs to be considered
        // for the count of leap years or not
        if (d.m <= 2)
        {
            years--;
        }
  
        // An year is a leap year if it is a multiple of 4,
        // multiple of 400 and not a multiple of 100.
        return Math.floor(years / 4) - Math.floor(years / 100) +
        Math.floor(years / 400);
}
 
// This function returns number
    // of days between two given dates
function getDifference(dt1,dt2)
{
// COUNT TOTAL NUMBER OF DAYS BEFORE FIRST DATE 'dt1'
  
        // initialize count using years and day
        let n1 = dt1.y * 365 + dt1.d;
  
        // Add days for months in given date
        for (let i = 0; i < dt1.m - 1; i++)
        {
            n1 += monthDays[i];
        }
  
        // Since every leap year is of 366 days,
        // Add a day for every leap year
        n1 += countLeapYears(dt1);
  
        // SIMILARLY, COUNT TOTAL NUMBER OF DAYS BEFORE 'dt2'
        let n2 = dt2.y * 365 + dt2.d;
        for (let i = 0; i < dt2.m - 1; i++)
        {
            n2 += monthDays[i];
        }
        n2 += countLeapYears(dt2);
  
        // return difference between two counts
        return (n2 - n1);
}

function info() {
    document.getElementById('id01').style.display='block';
}

window.onclick = function(event) {
	if (event.target == document.getElementById("id01")) {
    	document.getElementById("id01").style.display = "none";
	}
}

function onloadservice(dirname, cardclassname, cardidname, cardname){
    
    fetch('.//' + dirname).then(result => result.json()).then(json => {
        for (let i = 0; i <= json.length; i++) {
            var style = "background-image: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(17,17,17,0.6) 100%), " + json[i][0]
            cardid = cardname
            cardid = cardid + i
            var card = document.createElement("div");
            card.setAttribute('class', cardclassname);
            card.setAttribute('id', cardid)
            card.setAttribute('style', style)
            var container = document.getElementById(cardidname)
            container.appendChild(card);
            var header = document.createElement("h2");
            header.innerHTML = json[i][1];
            var toHead = document.getElementById(cardid)
            toHead.appendChild(header);
            var para = document.createElement("p");
            para.innerHTML = json[i][2]
            toHead.appendChild(para);
            var btn = document.createElement("button");
            btn.setAttribute('onclick', json[i][3])
            btn.innerHTML = json[i][4]
            toHead.appendChild(btn);
        }
})
}
