
  import { Live_Scores, Prev_Scores, fixture_stats} from "./script.js"

const params = new Array()

function noFilter( params, json ) {
  let results = new Array();

  for ( match of json.response ) {
      results.push( match );
  }
  return results;
}

var homestats = document.querySelector('.home-stats')
var awaystats = document.querySelector('.away-stats')
var stats = document.querySelector(".statistics")
var elapsedTime = document.querySelector("#elapsed");
var homeTeamImage = document.querySelector("#homeLogo");
var homeTeamName = document.querySelector("#homeName");
var awayTeamImage = document.querySelector("#awayLogo");
var awayTeamName = document.querySelector("#awayName");
var lastMatchGoal = document.querySelector("#goals");
var matchTable = document.querySelector("#matchTable");   

function addhomestats( data){
  var statstile1 = document.createElement('div');
  statstile1.classList.add("stats-tile");
  statstile1.innerHTML = "Total Shots" + ': ' + data[0]['statistics'][2]['value']

  var statstile2 = document.createElement('div');
  statstile2.classList.add("stats-tile");
  statstile2.innerHTML = "Total Passes" + ': ' + data[0]['statistics'][13]['value']

  var statstile3 = document.createElement('div');
  statstile3.classList.add("stats-tile");
  statstile3.innerHTML = "Accurate Passes" + ': ' + data[0]['statistics'][14]['value']

  var statstile4 = document.createElement('div');
  statstile4.classList.add("stats-tile");
  statstile4.innerHTML = "Ball Possession" + ': ' + data[0]['statistics'][9]['value']

  var statstile5 = document.createElement('div');
  statstile5.classList.add("stats-tile");
  statstile5.innerHTML = "Fouls" + ': ' + data[0]['statistics'][6]['value']

  homestats.appendChild(statstile1)
  homestats.appendChild(statstile2)
  homestats.appendChild(statstile3)
  homestats.appendChild(statstile4)
  homestats.appendChild(statstile5)

}
function addawaystats( data){
  var statstile1 = document.createElement('div');
  statstile1.classList.add("stats-tile");
  statstile1.innerHTML = "Total Shots" + ': ' + data[1]['statistics'][2]['value']

  var statstile2 = document.createElement('div');
  statstile2.classList.add("stats-tile");
  statstile2.innerHTML = "Total Passes" + ': ' + data[1]['statistics'][13]['value']

  var statstile3 = document.createElement('div');
  statstile3.classList.add("stats-tile");
  statstile3.innerHTML = "Accurate Passes" + ': ' + data[1]['statistics'][14]['value']

  var statstile4 = document.createElement('div');
  statstile4.classList.add("stats-tile");
  statstile4.innerHTML = "Ball Possession" + ': ' + data[1]['statistics'][9]['value']

  var statstile5 = document.createElement('div');
  statstile5.classList.add("stats-tile");
  statstile5.innerHTML = "Fouls" + ': ' + data[1]['statistics'][6]['value']

  awaystats.appendChild(statstile1)
  awaystats.appendChild(statstile2)
  awaystats.appendChild(statstile3)
  awaystats.appendChild(statstile4)
  awaystats.appendChild(statstile5)

}

//the functions to create an element
function addMatchTile(data){
    //createing the tile div
    var matchtile = document.createElement('div');
    matchtile.classList.add("match-tile");

    //creating the home match box
    var homeTeam = document.createElement('div');
    homeTeam.classList.add("team");
    //creating the image and the text
    var homeTileTeamName = document.createElement('p');
    homeTileTeamName.innerHTML = data['teams']['home']['name'];
    var homeTileTeamLogo = document.createElement('img');
    homeTileTeamLogo.src=data['teams']['home']['logo'];
    homeTeam.appendChild(homeTileTeamLogo);
    homeTeam.appendChild(homeTileTeamName);

    var awayTeam = document.createElement('div');
    awayTeam.classList.add("team");
    //creating the image and the text
    var awayTileTeamName = document.createElement('p');
    awayTileTeamName.innerHTML = data['teams']['away']['name'];
    var awayTileTeamLogo = document.createElement('img');
    awayTileTeamLogo.src=data['teams']['away']['logo'];
    awayTeam.appendChild(awayTileTeamLogo);
    awayTeam.appendChild(awayTileTeamName);

    //createing the score
    var score = document.createElement('p');
    score.innerHTML = data['goals']['home'] + " - " + data['goals']['away'];

    //append all the element to the parent
    matchtile.appendChild(homeTeam);
    matchtile.appendChild(score);
    matchtile.appendChild(awayTeam);

    matchTable.appendChild(matchtile);
}
 
  
  
Live_Scores(noFilter, params).then(
  function(results){
    if (results.length == 0){
      return null
    }
    var fixture = results[0]['fixture'];
    var goals = results[0]['goals'];
    var teams = results[0]['teams'];
    console.log(results.length);
   //Now let's set our first match
   elapsedTime.innerHTML = fixture['status']['elapsed'] + "'";
   homeTeamImage.src = teams['home']['logo'];
   homeTeamName.innerHTML = teams['home']['name'];
   awayTeamImage.src = teams['away']['logo'];
   awayTeamName.innerHTML = teams['away']['name'];
   lastMatchGoal.innerHTML = goals['home']+ " - " + goals['away'];
   fixture_stats(noFilter,params, results[0]['fixture']['id']).then(
    function(results){
      console.log(results)
      addhomestats( results)
      addawaystats(results)
    }
   )
  }
)
Prev_Scores(noFilter, params).then(
  function(results){
    for(var i = 1; i<results.length;i++){
      addMatchTile(results[i]); 
  }

  }
)


Collaps = document.querySelector('.collapsible')

Collaps.addEventListener("click", function(){
  this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
})