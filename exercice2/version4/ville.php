<?php
// header('Content-Type: application/json');
define('HOST', 'localhost');
define('DB_NAME', 'bvilles');
define('USER', 'root');
define('PASS', '');

function getDB(){
    $bdd = false;
    try{
        $bdd = new PDO(
            'mysql:host='.HOST.';dbname='.DB_NAME.';charset=utf8',
            USER,
            PASS
        );
    }catch(Exception $e){
        var_dump($e);
    }
    return $bdd;
}

function p($data=null){
    echo '<pre>';
    var_dump($data);
    echo '</pre>';
}
function d($data= null){
    p($data);
    die();
}

$bdd = getDB();

if (sizeof($_GET)>0){
    // d($_GET);
    $rVille = $_GET['recherche'];
    // echo $_POST;
    $req = $bdd->prepare('SELECT `Nom`, `Latitude`, `Longitude` FROM `villes` WHERE `Nom` LIKE :rVille"%" LIMIT 8');
    $req->bindValue(':rVille', strtoupper($rVille));
    $req->execute();
    $villes = $req->fetchAll(PDO::FETCH_ASSOC);
    // p($villes); 
    $tabVilles = array();
    foreach ($villes as $ville) {
        array_push($tabVilles, 
            array(
            "ville" => $ville['Nom'], 
            "latitude" => $ville['Latitude'], 
            "longitude" => $ville['Longitude'] 
        ));
    }

    header('Content-Type: application/json');
    echo json_encode($tabVilles);
} else {
    echo('ya rien casse toi');
    p($bdd);
}


