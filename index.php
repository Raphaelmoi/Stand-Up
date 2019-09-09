<?php
session_start();
require ('controller/Controller.php');
$controller = new Controller();

try {
    if (isset($_GET['action'])) {
        //HOME PAGE
        if ($_GET['action'] == 'homePage') {
            $controller->homePage();
        }
        else if ($_GET['action'] == 'signin') {
            $controller->signIn();
        }
        else if ($_GET['action'] == 'signup') {
            $controller->signUp();
        }
        else if ($_GET['action'] == 'forgotpass' || $_GET['action'] == 'pending' || $_GET['action'] == 'resetpass') {
            $controller->signIn();
        }
        // Home of the Back End
        elseif ($_GET['action'] == 'backendHome') {
            $controller->backendHome();
        } //SETTINGS VIEW
        elseif ($_GET['action'] == 'settingsview') {
            $controller->settingsView();
        }
        //RELOAD CHAT EVERY 5S for new msg
        elseif ($_GET['action'] == 'reload') {
            $controller->reloadChat();
        }
        //INSCRIPTION OF A NEW USER
        elseif ($_GET['action'] == 'inscription') {
            if (isset($_POST['name']) and isset($_POST['pass']) and isset($_POST['passTwo']) and isset($_POST['mail']) and isset($_POST['imageUrl'])) {
                $pseudo = htmlspecialchars($_POST['name']);
                $motdepasse = htmlspecialchars($_POST['pass']);
                $motdepasseVerif = htmlspecialchars($_POST['passTwo']);
                $email = htmlspecialchars($_POST['mail']);
                $imgUrl = htmlspecialchars($_POST['imageUrl']);
                $controller->inscription($pseudo, $motdepasse, $motdepasseVerif, $email, $imgUrl);
            }
        }
        //Log in
        elseif ($_GET['action'] == 'login') {
            if (isset($_POST['name']) and isset($_POST['pass'])) {
                $controller->logIn(htmlspecialchars($_POST['name']) , htmlspecialchars($_POST['pass']));
            }
        }
        elseif ($_GET['action'] == 'sendNewPass') {
            if (isset($_POST['reset-password']) && isset($_POST['email'])) {
                $controller->sendNewPass(htmlspecialchars($_POST['email']));
            }
        }

        elseif ($_GET['action'] == 'updatepw') {
            if (isset($_POST['pass']) && isset($_POST['confirmpass']) && isset($_POST['token'])) {
                $controller->resetNewPass(htmlspecialchars($_POST['pass']), htmlspecialchars($_POST['confirmpass']), $_POST['token']);
            }
        }
        elseif ($_GET['action'] == 'logout') {
            $controller->logOut();
        }
        //VIEW FOR ADMIN WHO SEE ANY INFO AND COMMENT FOR ONE USER
        elseif ($_GET['action'] == 'seecomments') {
            if (isset($_GET['id'])) {
                $controller->seeCommentAdmin(htmlspecialchars($_GET['id']));
            }
        }
        //PUBLISH A COMMENT in the database
        elseif ($_GET['action'] == 'postcomment') {
            if (isset($_POST['id_user']) and isset($_POST['comm'])) {
                $controller->postComment(htmlspecialchars($_POST['id_user']) , htmlspecialchars($_POST['comm']));
            }
        }
        //CHANGE THE PASSWORD
        elseif ($_GET['action'] == 'newpw') {
            if (isset($_POST['pseudo']) and isset($_POST['old_password']) and isset($_POST['new_password'])) {
                $controller->updatePass(htmlspecialchars($_POST['old_password']) , htmlspecialchars($_POST['new_password']) , htmlspecialchars($_POST['pseudo']));
            }
        }
        //CHANGE THE EMAIL
        elseif ($_GET['action'] == 'newmail') {
            if (isset($_POST['pseudo']) and isset($_POST['comfirm_mail']) and isset($_POST['new_mail']) and isset($_POST['pass'])) {
                $controller->updateMail(htmlspecialchars($_POST['pseudo']) , htmlspecialchars($_POST['comfirm_mail']) , htmlspecialchars($_POST['new_mail']) , htmlspecialchars($_POST['pass']));
            }
        }
        //CHANGE THE PSEUDO
        elseif ($_GET['action'] == 'newpseudo') {
            if (isset($_POST['newpseudo']) and isset($_POST['pseudo']) and isset($_POST['pass'])) {
                $controller->updatePseudo(htmlspecialchars($_POST['newpseudo']) , htmlspecialchars($_POST['pseudo']) , htmlspecialchars($_POST['pass']));
            }
        }
        //CHANGE PROFIL PICTURE
        elseif ($_GET['action'] == 'newcat') {
            if (isset($_POST['imageUrl'])) {
                $controller->updateCat(htmlspecialchars($_POST['imageUrl']));
            }
        }
        //DELETE ACCOUNT
        elseif ($_GET['action'] == 'deleteaccount') {
            if (isset($_POST['pseudo']) and isset($_POST['password'])) {
                $controller->deleteAccount(htmlspecialchars($_POST['pseudo']) , htmlspecialchars($_POST['password']));
            }
        }
        //DELETE ANY ACCOUNT FOR ADMIN
        elseif ($_GET['action'] == 'adminDeleteAccount') {
            if (isset($_GET['id'])) {
                $controller->adminDeleteAccount(htmlspecialchars($_GET['id']));
            }
        }
        //DELETE PERSONAL COMMENT
        elseif ($_GET['action'] == 'deletecomment') {
            $controller->deleteComment(htmlspecialchars($_GET['id']));
        }
        //DELETE COMMENT FROM ANY USER FOR ADMIN
        elseif ($_GET['action'] == 'deletecommentadmin') {
            $controller->deleteCommentAdmin(htmlspecialchars($_GET['idmsg']) , htmlspecialchars($_GET['idplayer']));
        }
        //RETURN WHEN GAMES ARE OVER
        elseif ($_GET['action'] == 'endgame') {
            if (!empty($_SESSION['pseudo'])) {
                if (isset($_GET['score'])) {
                    if (isset($_GET['game']) && $_GET['game'] == 1) {
                        $controller->endGameOne(htmlspecialchars($_GET['score']));
                    }
                    if (isset($_GET['game']) && $_GET['game'] == 2) {
                        $controller->endGameTwo(htmlspecialchars($_GET['score']));
                    }
                }
            }
            else header('Location: index.php'); //if user in not connected
        }
        //ALL THE PLAYERS VIEW, differents action for the table order
        elseif ($_GET['action'] == 'playersview') {
            if (isset($_GET['sortby']) && isset($_GET['order']) && isset($_GET['page'])) {
                if ($_GET['order'] == 'antichrono') {
                    if ($_GET['sortby'] == 'pseudo') {
                        $controller->playersView('pseudo', "DESC", $_GET['page']);
                    }
                    elseif ($_GET['sortby'] == 'scoreone') {
                        $controller->playersView('game_one_bs', "DESC", $_GET['page']);
                    }
                    elseif ($_GET['sortby'] == 'scoretwo') {
                        $controller->playersView('game_two_bs', "DESC", $_GET['page']);
                    }
                    elseif ($_GET['sortby'] == 'scoretotal') {
                        $controller->playersView('game_total', "DESC", $_GET['page']);
                    }
                }
                elseif ($_GET['order'] == 'chrono') {
                    if ($_GET['sortby'] == 'pseudo') {
                        $controller->playersView('pseudo', "ASC", $_GET['page']);
                    }
                    elseif ($_GET['sortby'] == 'scoreone') {
                        $controller->playersView('game_one_bs', "ASC", $_GET['page']);
                    }
                    elseif ($_GET['sortby'] == 'scoretwo') {
                        $controller->playersView('game_two_bs', "ASC", $_GET['page']);
                    }
                    elseif ($_GET['sortby'] == 'scoretotal') {
                        $controller->playersView('game_total', "ASC", $_GET['page']);
                    }
                }
            } //default view
            else{
                $_GET['page'] = 0;
                $_GET['sortby'] = 'scoretotal';
                $_GET['order'] = 'antichrono'; 
                $controller->playersView('game_total', "DESC", $_GET['page']); 
            }
        }
    }
    else {
        //default view -> HOME
        $controller->homePage();
    }
}
catch(Exception $e) {
    echo 'Erreur : ' . $e->getMessage();
}

