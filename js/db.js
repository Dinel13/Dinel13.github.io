
const dbPromised = idb.open('team', 1, upgradedDb => {
  if (!upgradedDb.objectStoreNames.contains('books')) {
      upgradedDb.createObjectStore("teams", {keyPath: "ID"});
  }
});

function addFavorite(id, logo, name, founded, venue, website) {
  let yakin = confirm(`Tambahkan Team ${name} ke Favorit ?`);
  if (yakin) {
    dbPromised
      .then(function (db) {
        const tx = db.transaction("teams", "readwrite");
        const store = tx.objectStore("teams");
        const item = {
          ID: id,
          logo: logo,
          name: name,
          founded: founded,
          venue: venue,
          website: website,
          created: new Date().getTime(),
        };
        store.put(item);
        return tx.complete;
      })
      .then(function () {
        notifFavorite(name, 'ditambahkan ke')
      })
      .catch(function (e) {
        console.error("Tidak dapat melakukan subscribe ", e.message);
      })
  }
}

function getAllTeam() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function (teams) {
        resolve(teams);
      });
  });
}

function delTeam(id) {
  return new Promise((resolve, reject) => {
    dbPromised
      .then((db) => {
        const transaction = db.transaction("teams", "readwrite");
        transaction.objectStore("teams").delete(id);
        return transaction;
      })
      .then((transaction) => {
        if (transaction.complete) {
          resolve(true);
        } else {
          reject(new Error(transaction.onerror));
        }
      });
  });
};
