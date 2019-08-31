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
                $controller -> logIn($_POST['name'], $_POST['pass']);
            }
        }
        elseif ($_GET['action'] == 'backendHome'){
                $controller -> backendHome();
        }
        elseif ($_GET['action'] == 'logout'){
                $controller -> logOut();
        }

        elseif ($_GET['action'] == 'postcomment'){
            if (isset($_POST['id_user']) AND isset($_POST['comm'])) {
                $controller -> postComment($_POST['id_user'], $_POST['comm']);
            }
        }    
        elseif ($_GET['action'] == 'settingsview'){
            $controller -> settingsView();
        }

        //CHANGE THE PASSWORD
        elseif ($_GET['action'] == 'newpw') {
            if (isset($_POST['pseudo']) and isset($_POST['old_password']) and isset($_POST['new_password'])) {
                $controller -> updatePass(htmlspecialchars($_POST['old_password']), htmlspecialchars($_POST['new_password']), htmlspecialchars($_POST['pseudo']));
            }
            else echo 'isset bug';
        }
        //CHANGE THE EMAIL
        elseif ($_GET['action'] == 'newmail') {
            if (isset($_POST['pseudo']) and isset($_POST['comfirm_mail']) and isset($_POST['new_mail']) and isset($_POST['pass'])) {
                $controller -> updateMail(htmlspecialchars($_POST['pseudo']), htmlspecialchars($_POST['comfirm_mail']), htmlspecialchars($_POST['new_mail']), htmlspecialchars($_POST['pass']));
            }
        }
        //CHANGE THE PSEUDO
        elseif ($_GET['action'] == 'newpseudo') {
            if (isset($_POST['newpseudo']) and isset($_POST['pseudo']) and isset($_POST['pass'])) {
                $controller -> updatePseudo(htmlspecialchars($_POST['newpseudo']), htmlspecialchars($_POST['pseudo']), htmlspecialchars($_POST['pass']));
            }
        }
        elseif ($_GET['action'] == 'newcat') {
            if (isset($_POST['imageUrl'])){
                $controller -> updateCat(htmlspecialchars($_POST['imageUrl']));
            }
        }
        elseif ($_GET['action'] == 'deleteaccount') {
            $controller -> deleteAccount();
        }
        elseif ($_GET['action'] == 'deletecomment') {
            $controller -> deleteComment($_GET['id']);
        }
        elseif ($_GET['action'] == 'endgame') {
            if (isset($_GET['score'])) {
                if (isset($_GET['game']) && $_GET['game'] == 1 ) {
                    $controller -> endGameOne($_GET['score']);
                }
                if (isset($_GET['game']) && $_GET['game'] == 2 ) {
                    $controller -> endGameTwo($_GET['score']);
                }
            }
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

