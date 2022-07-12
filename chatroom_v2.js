const socket = io('http://revoluxiant.com:6969/')
const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const coin = document.getElementsByClassName("coin-info");

var firstrun = 0
var oldprice = 0
var oldvndprice = 0

const PERSON_IMG = "./img/person.svg";
const BOT_IMG = "./img/bot.jpg";

const PERSON_NAME = prompt('What is your name?')
socket.emit('new-user', PERSON_NAME)

socket.on('chat-message', data => {
  appendMessage(data.name, PERSON_IMG, "left", data.message)
})

socket.on('user-connected', name => {
  appendMessage(name, PERSON_IMG, "left", "Connected")
})

socket.on('user-disconnected', name => {
  appendMessage(name, PERSON_IMG, "left", "Disconnected")
})

msgerForm.addEventListener('submit', event => {
  event.preventDefault();
  const msgText = msgerInput.value;
  
  if (!msgText) return;
  
  appendMessage(PERSON_NAME, PERSON_IMG, "right", msgText)
  socket.emit('send-chat-message', msgText)
  msgerInput.value = "";
})

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

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
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