var logData = 0
var rep

var noBot = 0
var game = 0

const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const coin = document.getElementsByClassName("coin-info");

var firstrun = 0
var oldprice = 0
var oldvndprice = 0

function onloadmain() {
  setTimeout(() => {botResponse("Oh, ehmm.. Hi. What's your name?");}, 1000);
}

// Icons made by Freepik from www.flaticon.com
const ME_IMG = "./img/me.jpg";
const PERSON_IMG = "./img/person.svg";
const BOT_NAME = "Revenovich";
const BOT_IMG = "./img/bot.jpg";
PERSON_NAME = "You";

msgerForm.addEventListener("submit", event => {
    event.preventDefault();
    
    const msgText = msgerInput.value;
    if (!msgText) return;

    appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText);
    rep = check(msgText, logData, noBot, game).then(response => {
      let rep = "" + response
      console.log(rep.includes("TypeError"))
      if (rep.includes("TypeError") == true) {
        botResponse("F***, Houston we have a problem. <br> Error: "+ '"' + rep + '"')
      }
      else if (rep.includes("Yay, you got it") == true) {}
      else if (rep.includes("Guess the number is quite simple") == true) {
        let str = "" + response;
        const repArr = str.split("#");
        for (let i = 0; i < (repArr.length); i++) {
          (function(i) {
            setTimeout(function() { botResponse(repArr[i]); }, 1500 * i);
          })(i);
        }
      }
      else if (rep.includes("I only have guess number list") == true){
        let str = "" + response;
        const repArr = str.split("#");
        for (let i = 0; i < (repArr.length); i++) {
          (function(i) {
            setTimeout(function() { botResponse(repArr[i]); }, 1500 * i);
          })(i);
        }
      }
      else {
        botResponse(response);
      }
      
      if (logData == 0 && rep.includes("TypeError") == false && rep.includes("That not a name") == false){
        setTimeout(() => {botResponse("How old are you?");}, 1500);
        PERSON_NAME = msgText
        logData = 1
      }
      else if (logData == 1 && rep.includes("TypeError") == false && rep.includes("Please check your age") == false){
        setTimeout(() => {botResponse("How can I help?");}, 1500);
        logData = 2
      }
      
      if (rep.includes("Start guess game!") == true) {
        setTimeout(() => {botResponse("Choose type");}, 1000)
        noBot = 1
      }

      if (rep.includes("Yay, you got it") == true) {
        botResponse("Time to guess it");
        game = 1
      }

      if (rep.includes("guess times to find") == true || rep.includes("Oh okay, you gived up") == true) {
        noBot = 0
        game = 0
      }

      if (rep.includes("Have a nice day") == true || rep.includes("See you!") == true || rep.includes("Bye! Come back again soon.") == true) {
        botResponse("I will redirect you to main page in seconds")
        setTimeout(() => {window.location.href = './index.html';}, 3000);
      }

    }).catch((err) =>{return err});
    msgerInput.value = "";
});

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 500;
}

function botResponse(bottext) {
  const msgText = bottext;

  appendMessage(BOT_NAME, ME_IMG, "left", msgText);

}

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}

function check(textinput, logdata, noBot, nGame){

    const url = 'http://127.0.0.1:5000/'

	const data = {id: logdata, text: textinput, nbot: noBot, ngame: nGame};

	return fetch(
		url,
		{
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
			method: "POST"
		}
	)
	.then(data => data.json())
	.then((json) => {
		
        text = JSON.parse(JSON.stringify(json));

        return text.text
	}).catch((error) => {return error});
	
}

checkrun()

function checkrun(){
  if (firstrun == 0) {
    bitcoin()
    firstrun = firstrun + 1
    checkrun()
  } else {
    setInterval(bitcoin, 20000)
  }
}

function bitcoin() {
    console.log(firstrun)
    fetch('https://api.coindesk.com/v1/bpi/currentprice/VND.json').then(
    resp => resp.json())
        .then(repos => {
          
          var price = repos.bpi.USD.rate_float
          var pricevnd = repos.bpi.VND.rate_float
          if (firstrun == 1) {
            firstrun = firstrun + 1
            oldprice = price
            oldvndprice = pricevnd
          }
          if (oldprice > price) {
            document.getElementById("coin-info").style.color = "#680000";
            let nofi = "1 BTC = " + price.toFixed(2) + " USD, old price " + oldprice.toFixed(2) + ", decrease " + (oldprice - price).toFixed(2) + " USD. 1 USD = " + (pricevnd/price).toFixed(2) + " VND.";
            document.getElementById("coin-info").innerHTML = nofi;
            appendMessage("Coin Nofication", BOT_IMG, "left", nofi)
          } else if (oldprice == price){
            if (firstrun == 1) {
              document.getElementById("coin-info").style.color = "#000000";
              document.getElementById("coin-info").innerHTML = "1 BTC = " + price.toFixed(2) + " USD. 1 USD = " + (pricevnd/price).toFixed(2) + " VND.";
            }
            else {
              document.getElementById("coin-info").style.color = "#000000";
              document.getElementById("coin-info").innerHTML = "1 BTC = " + price.toFixed(2) + " USD. 1 USD = " + (pricevnd/price).toFixed(2) + " VND.";
            }
          } else {
            document.getElementById("coin-info").style.color = "#006800";
            let nofi = "1 BTC = " + price.toFixed(2) + " USD, old price " + oldprice.toFixed(2) + ", increase " + (price - oldprice).toFixed(2) + " USD. 1 USD = " + (pricevnd/price).toFixed(2) + " VND.";
            document.getElementById("coin-info").innerHTML = nofi;
            appendMessage("Coin Nofication", BOT_IMG, "left", nofi);
          }
          
          oldprice = price
          oldvndprice = pricevnd

        }).catch(ex => {
        console.error(ex);
    })
}