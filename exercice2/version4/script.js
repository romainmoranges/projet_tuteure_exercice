let iVille = document.getElementsByTagName('input')[0];
let datalist = document.getElementsByTagName('datalist')[0];

/* Leaflet */

let map = L.map('map');
let osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
let osmAttrib = 'Map data © OpenStreetMap contributors';
let osm = new L.TileLayer(osmUrl, {
    attribution: osmAttrib
});
map.setView([48.86, 2.34445], 10);
map.addLayer(osm);

/* Fonctions */
function completeListe(recherche, e) {

    $get(`ville.php`, {recherche : recherche}, done, error);
    
    function done(rep) {
        let res = JSON.parse(rep.responseText);
        
        if (e.keyCode !== 37 || e.keyCode !== 38 || e.keyCode !== 39 || e.keyCode !== 40) {
            datalist.innerHTML = '';

            for (let j = 0; j < res.length; j++) {
                let ville = document.createElement('option');
                datalist.appendChild(ville);
                ville.value = res[j].ville;

                if(iVille.value.toUpperCase() == res[j].ville) {
                    let latitude = res[j].latitude;
                    let longitude = res[j].longitude;
                    map.setView([latitude, longitude], 14);
                }
            }
        } else {
            return true;
        }
    }
    
    function error(r) {
        console.log(r);
    }
}

/* appel des fonctions */

iVille.onkeyup = (event) => {
    if (iVille.value.length > 2) {
        completeListe(iVille.value, event);
    } else {
        // console.log('il manque des caractères avant de lancer la recherche');
        datalist.innerHTML = '';
    }
}


