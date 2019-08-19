<?php
session_start();
require ('controller/Controller.php');
$controller = new Controller();

try {
    if (isset($_GET['action'])) {
        //---VIEWS---
        //HOME
        if ($_GET['action'] == 'homePage') {
            $controller -> homePage();
        }
        else if ($_GET['action'] == 'signin') {
            $controller -> signIn();
        }
        else if ($_GET['action'] == 'signup'){
        	$controller -> signUp();
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

