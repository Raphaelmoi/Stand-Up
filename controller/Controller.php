<?php
class Controller {
    function __construct() {
        spl_autoload_register('Controller::chargerClasse');
        require 'controller/UserController.php';
        require 'controller/ResetPassController.php';
    }
    //autoloader
    function chargerClasse($classname) {
        require 'model/' . $classname . '.php';
    }
    function homePage() {
        require ('view/frontend/homeFrontEnd.php');
    }
    function signIn() {
        require ('view/frontend/homeFrontEnd.php');
    }
    function inscription($pseudo, $motdepasse, $motdepasseVerif, $email, $linkImg) {
        $register = new UserController();
        $connexion = $register->newUser($pseudo, $motdepasse, $motdepasseVerif, $email, $linkImg);
    }
    function logIn($pseudo, $motdepasse) {
        $userController = new UserController();
        $connexion = $userController->logIn($pseudo, $motdepasse);
    }
    function logOut() {
        $userController = new UserController();
        $connexion = $userController->logOut();
        header('Location: /projet5/index.php?success=disconnect');
    }
    function sendNewPass($email){
        $userManager = new UserManager();
        $results = $userManager->findMail($email);
        $ResetPassController = new ResetPassController();
        $sendToken = $ResetPassController->sendToken($email, $results);
    }
    function resetNewPass($newpass, $newpassconfirm, $token){
        $ResetPassController = new ResetPassController();
        $resetPass = $ResetPassController->resetPass($newpass, $newpassconfirm, $token);
    }
    function backendHome() {
        $userManager = new UserManager();
        $reponse = $userManager->getUser($_SESSION['pseudo']);
        $commentManager = new CommentManager();
        $comment = $commentManager->getComments();
        $position = $userManager -> getUserPosition($reponse['game_total']);
        $nbrOfPlayers = $userManager -> getNumberOfUsers();
        $bestScoreGame1 = $userManager -> getBestScoreGOne();
        $bestScoreGame2 = $userManager -> getBestScoreGTwo();
        require ('view/backend/backEndHome.php');
    }
    function postComment($id, $commentaire) {
        $commentManager = new CommentManager();
        $comment = $commentManager->postComment($id, $commentaire);
        Controller::backendHome();
    }
    function settingsView() {
        $userManager = new UserManager();
        $reponse = $userManager->getUser($_SESSION['pseudo']);
        $commentManager = new CommentManager();          
        $comment = $commentManager -> getCommentsForOneUser($reponse['id']); 
        require ('view/backend/settings.php');
    }
    function updatePass($oldPass, $newPass, $pseudo) {
        $userController = new UserController();
        $newPass = $userController->newPass($oldPass, $newPass, $pseudo);
    }
    function updateMail($pseudo, $comfirmMail, $newmail, $pass) {
        $userController = new UserController();
        $newMail = $userController->newMail($pseudo, $comfirmMail, $newmail, $pass);
    }
    function updatePseudo($newpseudo, $pseudo, $pass) {
        $userController = new UserController();
        $newMail = $userController->newPseudo($newpseudo, $pseudo, $pass);
    }
    function updateCat($imageUrl) {
        $connexionManager = new UserManager();
        $user = $connexionManager->updateCat($_SESSION['pseudo'], $imageUrl);
        header('Location: index.php?action=settingsview&success=updateimage');
    }
    function deleteAccount($pseudo, $pass) {
        $userController = new UserController();
        $deleteAccount = $userController->deleteAccount($pseudo, $pass);       
    }
    function deleteComment($id) {
        $commentManager = new CommentManager();
        $comment = $commentManager->deleteComment($id);
        header('Location: index.php?action=settingsview&success=deletecomment');
    }
    function adminDeleteAccount($id) {
        $connexionManager = new UserManager();
        $commentManager = new CommentManager();
        $deleteComments = $commentManager->deleteCommentFromOneUser($id);
        $user = $connexionManager->deleteAccountWithID($id);
        header('Location: index.php?action=playersview&sortby=scoretotal&order=antichrono&success=deleteplayer');
    }
    function deleteCommentAdmin($id, $idplayer) {
        $commentManager = new CommentManager();
        $comment = $commentManager->deleteComment($id);
        header('Location: index.php?action=seecomments&id=' . $idplayer);
    }
    function endGameOne($score) {
        $connexionManager = new UserManager();
        $reponse = $connexionManager->getUser($_SESSION['pseudo']);
        if ($score > $reponse['game_one_bs']) {
            $user = $connexionManager->updateScore($_SESSION['pseudo'], $score, 1, "game_one", 'game_one_bs');
        }
        else {
            $user = $connexionManager->updateScore($_SESSION['pseudo'], $score, 0, "game_one", 'game_one_bs');
        }
        header('Location: index.php?action=backendHome&success=endgame&game=1&score='. $score);
    }
    function endGameTwo($score) {
        $connexionManager = new UserManager();
        $reponse = $connexionManager->getUser($_SESSION['pseudo']);
        if ($score > $reponse['game_two_bs']) {
            $user = $connexionManager->updateScore($_SESSION['pseudo'], $score, 1, "game_two", 'game_two_bs');
        }
        else {
            $user = $connexionManager->updateScore($_SESSION['pseudo'], $score, 0, "game_two", 'game_two_bs');
        }
        header('Location: index.php?action=backendHome&success=endgame&game=2&score='. $score);
    }
    function reloadChat() {
        $userManager = new UserManager();
        $reponse = $userManager->getUser($_SESSION['pseudo']);
        $commentManager = new CommentManager();
        $retourComments = $commentManager->getComments();
        require ('view/backend/chatMessenger.php');
    }
    function playersView($arg, $order, $offset) {
        $userManager = new UserManager();
        $rep = $userManager->getAllUsers($arg, $order, $offset);
        $reponse = $userManager->getUser($_SESSION['pseudo']);
        $position = $userManager -> getUserPosition($reponse['game_total']);
        $nbrOfPlayers = $userManager -> getNumberOfUsers();
        $bestScoreGame1 = $userManager -> getBestScoreGOne();
        $bestScoreGame2 = $userManager -> getBestScoreGTwo();
        require ('view/backend/playersview.php');
    }
    function seeCommentAdmin($id) {
        $userManager = new UserManager();
        $userWithId = $userManager->getUserWithId($id);
        $commentManager = new CommentManager();
        $comment = $commentManager->getCommentsForOneUser($id);
        $reponse = $userManager->getUser($userWithId['pseudo']);
        $position = $userManager -> getUserPosition($userWithId['game_total']);
        $nbrOfPlayers = $userManager -> getNumberOfUsers();
        $bestScoreGame1 = $userManager -> getBestScoreGOne();
        $bestScoreGame2 = $userManager -> getBestScoreGTwo();
        require ('view/backend/adminCommentView.php');
    }
}