function setNameColors(){
  fetch('https://tvdhout.nl/getsubs.php', {method: "GET"})
  .then((resp) => resp.text())
  .then(function(data){
    subs = data.split("<br>");
    return subs;
  }).then(function(subs){
    var challenges = document.getElementsByClassName("challenge");

    for (var i = 0; i < challenges.length; i++) {
      challengerName = challenges[i].getElementsByClassName("user-link")[0].innerText.split(" ")[0].toLowerCase();
      if(subs.includes(challengerName)){
        challenges[i].getElementsByClassName("user-link")[0].style.color = "#9e84ce";
      }
      else{
        challenges[i].getElementsByClassName("user-link")[0].style.color = "#ADADAF";
      }
    }
  })
  .catch(function(error){
    alert(error);
  });
}

function acceptChallenge() {
  var challenges = document.getElementsByClassName("challenge");
  var challenge = challenges[Math.floor(Math.random() * challenges.length)]
  challenge.getElementsByClassName("accept")[0].click();
}

function acceptSubChallenge() {
  /**
  Function and service by Stockvis.
  Queries the database of IMRosen subs with their lichess handles and filters challenges .
  **/
  var challenges = document.getElementsByClassName("challenge");

  fetch('https://tvdhout.nl/getsubs.php', {method: "GET"})
  .then((resp) => resp.text())
  .then(function(data){
    var subs = data.split("<br>");
    return subs;
  })
  .then(function(subs){
  	
    var subChallenges = [];

    for (var i = 0; i < challenges.length; i++) {
      challengerName = challenges[i].getElementsByClassName("user-link")[0].innerText.split(" ")[0].toLowerCase();
      if(subs.includes(challengerName)){
        subChallenges.push(challenges[i]);
      }
    }

    if(subChallenges.length > 0){
      var challenge = subChallenges[Math.floor(Math.random() * subChallenges.length)];
      challenge.getElementsByClassName("accept")[0].click();
    }

  })
  .catch(function(error){
    alert(error);
  })
}

function init(container) {
  var div = document.createElement("div");
  div.innerText = "Accept random challenge";
  div.id = "lichess-arc";
  div.onclick = acceptChallenge;
  container.prepend(div);

  var subdiv = document.createElement("div");
  subdiv.innerText = "Accept subscriber challenge";
  subdiv.id = "lichess-arc-sub";
  subdiv.onclick = acceptSubChallenge;
  container.prepend(subdiv);
  setNameColors();
}
function loadContainer() {
  e = document.getElementById('challenge-toggle');
  e.click(); // open challanges menu
  e.click(); // close challanges menu
}
function initWhenContainerLoaded() {
  var container = document.getElementById("challenge-app");
  if (container.className.indexOf("rendered") > 0) {
    init(container);
  } else {
    loadContainer();
    setTimeout(initWhenContainerLoaded, 100);
  }
  document.getElementById("challenge-app").addEventListener("mouseenter", setNameColors);
  document.getElementById('challenge-toggle').addEventListener("click", setNameColors);
}

initWhenContainerLoaded();