let iVille = document.getElementsByTagName('input')[0];
let datalist = document.getElementsByTagName('datalist')[0];
for (let i = 0; i < 8; i++) {
    let ville = document.createElement('option');
    datalist.appendChild(ville)
}

iVille.onkeyup = (e) => {
    let rVille = iVille.value;

    console.log(rVille);
    if (rVille.length > 2) {
        console.log('on peut lancer la requête');
        console.log(rVille);
        completeListe(rVille);
    } else {
        console.log('il manque des caractères avant de lancer la recherche');
    }

    function completeListe(recherche) {
        $get(`ville.php`, `${recherche}`, done, error);

        function done(rep) {
           
                console.log('Requête terminée correctement! ' + rep.status);
                let res = JSON.parse(rep.responseText);
                console.log(res);
                if (e.keyCode !== 37 || e.keyCode !== 38 || e.keyCode !== 39 || e.keyCode !== 40 ) {
                    for (let j = 0; j < res.length; j++) {
                        document.getElementsByTagName('option')[j].value = res[j].ville;
                    }
            }
            else {
                console.log(e.keyCode + " c'est la touche ");
                return true;
            }
        }

        function error(r) {
            console.log(r);
        }
    }
}