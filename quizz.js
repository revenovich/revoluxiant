var i = 0;

function onloadfunction() {
	document.getElementById("loader").style.visibility = 'hidden';
	document.getElementById("loader").style.display = 'none';
}

function check(){

	test();

	const url = 'https://quizzproveserverapi.herokuapp.com/';
	//const url = 'http://localhost:3000/';//

	var question1 = document.quiz.question1.value;
	var question2 = document.quiz.question2.value;
	var question3 = document.quiz.question3.value;
	var question4 = document.quiz.question4.value;
	
	const data = { id: Date.now(), quest1: question1, quest2: question2, quest3: question3, quest4: question4};

	fetch(
		url,
		{
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
			method: "POST"
		}
	)
	.then(data => data.json())
	.then((json) => {
		const score = JSON.parse(JSON.stringify(json));
		var pictures = ["img/qr.png", "img/meh.jpeg", "img/lose.gif"];
		var messages = ["Ha ha hay lắm đmm, scan cái code này và và... tự biết =)), trả lời được câu hỏi thì chả có gì lắm đâu :))", "That's just okay but yeah you have to know me more", "Hah nice try but you have to know me more"];

		document.getElementById('id01').style.display='block';

		document.getElementById("message").innerHTML = messages[score.dataanswer];
		document.getElementById("picture").src = pictures[score.dataanswer];

	});
	
}

function test(){
	var seconds = 25;
	document.getElementById("button").style.visibility = 'hidden';
	document.getElementById("button").style.display = 'none';
	document.getElementById("retake").style.visibility = 'hidden';
	var countdown = setInterval(function() {
		seconds--;
		document.getElementById("button").style.visibility = 'hidden';
		document.getElementById("button").style.display = 'none';
		document.getElementById("loader").style.visibility = 'visible';
		document.getElementById("loader").style.display = 'block';
		document.getElementById("retake").style.visibility = 'hidden';
		document.getElementById("p001").innerHTML = seconds + " delay on purpose.";
		if (seconds <= 0) {
			clearInterval(countdown); 
			document.getElementById("button").style.visibility = 'visible';
			document.getElementById("button").style.display = 'block';
			document.getElementById("loader").style.visibility = 'hidden';
			document.getElementById("loader").style.display = 'none';
			document.getElementById("retake").style.visibility = 'visible';
			document.getElementById("p001").innerHTML = "";
		};
	}, 1000);
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == document.getElementById("id01")) {
    	document.getElementById("id01").style.display = "none";
	}
}
