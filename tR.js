var players_arr = [];
var team1 = [];
var team2 = [];
$("#team1").hide();
$("#team2").hide();
function generatePlayers() {
  var n = document.getElementById("pl_num").value;
  if (n > 100) {
    swal("خطأ!", "أقصي عدد للاعبين هو 100", "error");
    return;
  } else if (n % 2 != 0) {
    swal("خطأ!", "عدد الاعبين يجب أن يكون رقم زوجي", "error");
    return;
  } else if (n == "") {
    swal("خطأ!", "يجب عليك إدخال عدد اللاعبين أولًا", "error");
    return;
  }
  var players = document.getElementById("players");
  // if (!document.getElementById("player-0")) {

    var div = document.getElementById("players");
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
    div.innerHTML += '<p> <i class="fa fa-lightbulb-o" aria-hidden="true"></i> اختر نفس الاختيار للاعبين الذين لا يمكن ان يكونوا معا في فريق واحد</p>'
    for (let i = 0; i < n; i++) {
      players.innerHTML +=
        "<h1 class='playersH1'> اللاعب رقم "  + (i + 1) + " </h1>  <input class='players_names' placeholder='  ادخل اسم اللاعب رقم " + (i+1) + "' name='null" + i + "' type='text' id='player-" + i + "'> ";
      players.innerHTML +=
        `
            <select onchange='setInputAttr(` + i +`,this);' name="constra" class='options' id="constra` + i +`">
                <option disabled selected value='null'>--اختر نفس الاختيار لكل 2 من الفريق-- </option>
            </select><br><hr style="margin:5px;">
        `;
      for (let j = 0; j < n/2; j++) {
        if (j == 0) {
          document.getElementById("constra" + i + "").innerHTML +=
          `
              <option value=` + (j) + `>حارس مرمي</option>
          `;
        }
        else {
          document.getElementById("constra" + i + "").innerHTML +=
          `
              <option value=` + (j) + `>حالة ` + (j) + `</option>
          `;
        }

      }
      if (i == n - 1) {
        players.innerHTML +=
          "<div onclick='randomize();' class='apply' id='apply_ranndom'>تأكيد</div>";
      }
    }
  // }

}
function randomize() {
  var n = document.getElementById("pl_num").value;
  for (let i = 0; i < n; i++) {
    var player = document.getElementById("player-" + i + "").value;
    var attrName = document.getElementById("player-" + i + "").getAttribute('name');
    if (player == "") {
      swal("خطأ!", "برجاء ادخال اسامي جميع اللاعبين", "error");
      return;
    }
    players_arr[i] = ""+player+"-"+attrName+"";
  }
  console.log(players_arr);
  // console.log(players_arr.slice(0));
  // var rand = Math.floor(Math.random() * players_arr.length);
  // console.log(players_arr[rand]);
  var length = players_arr.length;

    var div = document.getElementById("team1");
    var div2 = document.getElementById("team2");
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
    while (div2.firstChild) {
      div2.removeChild(div2.firstChild);
    }
    var team1 = [];
    var team2 = [];
    for (let i = 0; i < length; i++) {
      // console.log(players_arr.length);
      var rand = Math.floor(Math.random() * players_arr.length);
      if (i % 2 == 0) {
        if (i == 0) {
          document.getElementById("team1").innerHTML +=
          "<h1>الفريق الأول</h1>";
        }
        var temp = players_arr[rand].split('-');
        team1.push(players_arr[rand]);
        document.getElementById("team1").innerHTML +=
          "<h1 class='team1'><i class='fa-solid fa-arrow-left'></i> " + temp[0] +"</h1>";
      } else {
        if (i == 1) {
          document.getElementById("team2").innerHTML +=
          "<h1>الفريق الثاني</h1>";
        }
        var temp = players_arr[rand].split('-');
        team2.push(players_arr[rand]);
        document.getElementById("team2").innerHTML +=
          "<h1 class='team2'><i class='fa-solid fa-arrow-left'></i> " + temp[0] +"</h1>";
      }
      players_arr.splice(rand, 1); // delete the index from players array
    }
    var team1Check = [];
    var team2Check = [];

    for (let i = 0; i < team1.length; i++) { 
      var temp = team1[i].split('-');
      team1Check.push(temp[1]);
    }
    for (let i = 0; i < team2.length; i++) { 
      var temp = team2[i].split('-');
      team2Check.push(temp[1]);
    }
    console.log(team1Check);
    console.log(team2Check);
    if (team1Check.length !== new Set(team1Check).size || team2Check.length !== new Set(team2Check).size) {
      randomize();
    }
    $("#team1").show('slow');
    $("#team2").show('slow');
  console.log(team1Check);
  console.log(team2Check);
}
function setInputAttr(i,valuee) {
  $("#player-" + i + "").attr('name', valuee.value);
}

setTimeout(function () {
  $('#preloader').fadeOut('slow');
}, 4500); // <-- time in milliseconds 4500