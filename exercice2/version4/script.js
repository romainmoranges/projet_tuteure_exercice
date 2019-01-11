
function completeListe(recherche, e) {
    $get(`ville.php`, {recherche : recherche}, done, error);
    
    function done(rep) {
        let res = JSON.parse(rep.responseText);
        
        if (e.keyCode !== 37 || e.keyCode !== 38 || e.keyCode !== 39 || e.keyCode !== 40) {
            datalist.innerHTML = '';
            for (let j = 0; j < res.length; j++) {
                let ville = document.createElement('option');
                datalist.appendChild(ville);
                document.getElementsByTagName('option')[j].value = res[j].ville;
            }
        } else {
            // console.log(e.keyCode + " c'est la touche ");
            return true;
        }
        iVille.onchange = () => {
            console.log(iVille.value);
            console.log(res.length);
            for (let k=0; k<res.length; k++) {
                if(iVille.value === res[k].ville) {
                    let latitude = res[k].latitude;
                    let longitude = res[k].longitude;
                    map.setView([latitude, longitude], 10);
                    
                }
            }
            
        }
    }
    
    function error(r) {
        console.log(r);
    }
}

let iVille = document.getElementsByTagName('input')[0];
let datalist = document.getElementsByTagName('datalist')[0];

iVille.onkeyup = (e) => {
    let rVille = iVille.value;

    // console.log(rVille);
    if (rVille.length > 2) {
        // console.log('on peut lancer la requête');
        // console.log(rVille);
        completeListe(rVille, e);
    } else {
        // console.log('il manque des caractères avant de lancer la recherche');
        datalist.innerHTML = '';
    }
}


/* Leaflet */

let map = L.map('map');
let osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
let osmAttrib = 'Map data © OpenStreetMap contributors';
let osm = new L.TileLayer(osmUrl, {
    attribution: osmAttrib
});
map.setView([48.86, 2.34445], 10);
map.addLayer(osm);