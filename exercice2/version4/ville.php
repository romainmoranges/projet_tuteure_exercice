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
    $rVille = implode('',$_GET);
    // echo $_POST;
    $req = $bdd->prepare('SELECT `ville_nom`, `ville_latitude_deg`, `ville_longitude_deg` FROM `villes` WHERE `ville_nom` LIKE :alexandre"%" ORDER BY `ville_population_2012` DESC LIMIT 8');
    $req->bindValue(':alexandre', strtoupper($rVille));
    $req->execute();
    $villes = $req->fetchAll(PDO::FETCH_ASSOC);
    // p($villes); 
    $tabVilles = array();
    foreach ($villes as $ville) {
        array_push($tabVilles, 
            array(
            "ville" => $ville['ville_nom'], 
            "latitude" => $ville['ville_latitude_deg'], 
            "longitude" => $ville['ville_longitude_deg'] 
        ));
    }

    header('Content-Type: application/json');
    echo json_encode($tabVilles);
} else {
    echo('ya rien casse toi');
    p($bdd);
}


