let iVille = document.getElementsByTagName('input')[0];
iVille.onkeyup = () => {
    let rVille = iVille.value;
    console.log(rVille);
    if (rVille.length > 2) {
        console.log('on peut lancer la requête');
        afficheListe(rVille);
    } else {
        console.log('il manque des caractères avant de lancer la recherche');
    }

    function afficheListe(recherche) {
        $get(`ville.php`, `${recherche}`, done, error);

        function done(rep) {
            console.log('Requête terminée correctement! ' + rep.status);
            let res = JSON.parse(rep.responseText);
            // console.log(res);
            let datalist = document.getElementsByTagName('datalist')[0];
            console.log(datalist);
            console.log(datalist.childNodes.length);

                datalist.innerHTML = '';
                res.forEach(element => {
                    console.log(element.ville);
                    let ville = document.createElement('option')
                    ville.value = element.ville;
                    datalist.appendChild(ville);
                });
        }

        function error(r) {
            console.log(r);
        }
    }
}