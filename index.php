<?php
session_start();
require ('controller/Controller.php');
$controller = new Controller();

try {
    if (isset($_GET['action'])) {
        //---VIEWS---
        //HOME
        if ($_GET['action'] == 'listPosts') {
            $controller -> listPosts();
        }
    }
    else {
       //default view -> HOME
       $controller -> homePage();
    }
}
catch(Exception $e) {
    echo 'Erreur : ' . $e->getMessage();
}

