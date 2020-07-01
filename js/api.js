//blok untuk funsi tampilkan klasemen
function tampilKLasemen(data) {
  let klasemenHTML = "";
  data = data.standings[0].table;

  data.forEach(function (dataTeam) {
    let urlLogo = dataTeam.team.crestUrl;
    urlLogo = urlLogo.replace(/^http:\/\//i, "https://");
    klasemenHTML += `
                        <tr>
                        <td>${dataTeam.position}</td>
                        <td><img src="${urlLogo}" alt="${dataTeam.team.name}" class="responsive-img" width="30"></td>
                        <td>${dataTeam.team.name}</td>
                        <td>${dataTeam.playedGames}</td>
                        <td>${dataTeam.won}</td>
                        <td>${dataTeam.draw}</td>
                        <td>${dataTeam.lost}</td>
                        <td>${dataTeam.goalsFor}</td>
                        <td>${dataTeam.goalsAgainst}</td>
                        <td>${dataTeam.goalDifference}</td>
                        <td>${dataTeam.points}</td>
                        </tr>
                        `;
  });
  document.getElementById("load").style.display = "none";
  document.getElementById("klasemen").innerHTML = klasemenHTML;
}

//blok untuk fungsi tampilkan team
function tampilTeam(data) {
  let teamHTML = "";
  data = data.teams;
  data.forEach(function (team) {
    let urlLogo = team.crestUrl;
    urlLogo = urlLogo.replace(/^http:\/\//i, "https://");
    teamHTML += `
            <div class="col s12 m6 l4">
              <div class="card grey lighten-3">
              <div class="card-image">
              <img src="${urlLogo}" alt="${team.name}"  height="180px" width="150px" >
              <a onclick="addFavorite(${team.id},'${urlLogo}','${team.name}','${team.founded}','${team.venue}','${team.website}')" class="btn-floating btn-large halfway-fab waves-effect waves-light blue">+ FAV</a>
            </div>
                <div class="card-content"  style="min-height : 210px">
                    
                        <h6 class=""><strong>${team.name}</strong></h6>
                        <p class="light grey-text text-darken-3">sejak ${team.founded}</p>
                        <p class="">Bermarkas di ${team.venue}</p>
                    <br/>
                    <a href="${team.website}" target="_blank">Laman Website Resmi</a>
                </div>
             </div>
            </div>
                `;
  });
  document.getElementById("loads").style.display = "none";
  document.querySelector(".team").innerHTML = teamHTML;
}

function getKlasemen() {
  if ("caches" in window) {
    caches
      .match(`${base_url}/v2/competitions/2014/standings`)
      .then(function (res) {
        if (res) {
          res.json().then(function (data) {
            tampilKLasemen(data);
          });
        }
      });
  }

  fetch(`${base_url}/v2/competitions/2014/standings`, {
    headers: {
      "X-Auth-Token": api_token,
    },
  })
    .then(status)
    .then(json)
    .then(function (data) {
      tampilKLasemen(data);
    })
    .catch(error);
}

function getTeams() {
  if ("caches" in window) {
    caches.match(`${base_url}/v2/competitions/2014/teams`).then(function (res) {
      if (res) {
        res.json().then(function (data) {
          tampilTeam(data);
        });
      }
    });
  }
  fetch(`${base_url}/v2/competitions/2014/teams`, {
    headers: {
      "X-Auth-Token": api_token,
    },
  })
    .then(status)
    .then(json)
    .then(function (data) {
      tampilTeam(data);
    })
    .catch(error);
}

function getFavTeam() {
  getAllTeam().then(function (teams) {
    // Menyusun komponen card artikel secara dinamis
    var teamsHTML = "";
    teams.forEach(function (team) {
      teamsHTML += `
                  <div class="col s12 m6 l4">
                  <div class="card grey lighten-3">
                  <div class="card-image">
                  <img src="${team.logo}" alt="${team.name}"  height="180px" width="150px" >
                  <a onclick="delFav(${team.ID}, '${team.name}')" class="btn-floating btn-large halfway-fab waves-effect waves-light blue">
                  <img style="max-width :33px; transform: translate(10px, 10px)" src="../image/trash.png"  alt="hapus">
                  </a>
                </div>
                    <div class="card-content"  style="min-height : 200px">                
                            <h6 class=""><strong>${team.name}</strong></h6>
                            <p class="light grey-text text-darken-3">sejak ${team.founded}</p>
                            <p class="">Bermarkas di ${team.venue}</p>
                        <br/>
                        <a href="${team.website}" target="_blank">Laman Website Resmi</a>
                    </div>
                </div>
                </div>
                    `;
    });
    // Sisipkan komponen card ke dalam elemen dengan id #fav
    document.getElementById("fav").innerHTML = teamsHTML;
  });
}

function delFav(id, name) {
  const yakin = confirm(`Hapus team ${name} dari Favorit ?`);
  if (yakin) {
    delTeam(id)
      .then(() => {
        getFavTeam();
        notifFavorite(name, "dihapus dari");
      })
      .catch(error);
  }
}
