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
        //PAGE CONNEXION
        elseif ($_GET['action'] == 'inscription') {
            if (isset($_POST['name']) AND isset($_POST['pass']) AND isset($_POST['passTwo']) AND isset($_POST['mail']) AND isset($_POST['imageUrl'])) {
                    $pseudo = htmlspecialchars($_POST['name']);
                    $motdepasse = htmlspecialchars($_POST['pass']);
                    $motdepasseVerif = htmlspecialchars($_POST['passTwo']);
                    $email = htmlspecialchars($_POST['mail']);
                    $imgUrl = htmlspecialchars($_POST['imageUrl']);
                $controller -> inscription($pseudo, $motdepasse, $motdepasseVerif, $email, $imgUrl);
            }
        }
        elseif ($_GET['action'] == 'login') {
            if (isset($_POST['name']) AND isset($_POST['pass'])) {
                $controller -> connect($_POST['name'], $_POST['pass']);
            }
            else
                echo "not set";
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

