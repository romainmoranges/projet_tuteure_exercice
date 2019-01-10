let iVille = document.getElementsByTagName('input')[0];
iVille.onkeyup = () => {
    let rVille = iVille.value;
    console.log(rVille);
    if (rVille.length > 2) {
        console.log('on peut lancer la requête');
        let listeVilles = recupVille(rVille);
        console.log(listeVilles);
        // afficheListe(listeVilles);
    } else {
        console.log('il manque des caractères avant de lancer la recherche');
    }

    function recupVille(recherche) {
        $get(`ville.php`, `${recherche}`, done, error);

        function done(rep) {
            console.log('Requête terminée correctement! ' + rep.status);
            let res = JSON.parse(rep.responseText);
            return res;
        }

        function error(r) {
            console.log(r);
        }
    }

    function afficheListe(villes) {
        console.log(villes);
    }
}