<?php
class Controller
{       
    function __construct()
    {
        spl_autoload_register('Controller::chargerClasse');
        require 'controller/UserController.php';
    }
    //autoload
    function chargerClasse($classname)
    {
        require 'model/'.$classname.'.php';
    }
    function homePage() {
        require('view/frontend/affichageAccueil.php');
    }
    function signIn(){
        require ('view/frontend/affichageAccueil.php');
    }

    function signUp(){
        require 'view/frontend/affichageAccueil.php';
    }

    function inscription($pseudo, $motdepasse, $motdepasseVerif, $email, $linkImg){
        $register = new UserController();
        $connexion = $register -> newUser($pseudo, $motdepasse, $motdepasseVerif, $email, $linkImg); 
    } 

    function logIn($pseudo, $motdepasse){
        $connect = new UserController();
        $connexion = $connect -> logIn($pseudo, $motdepasse);         
    }
    function logOut(){
        $connect = new UserController();
        $connexion = $connect -> logOut();   
        header('Location: /projet5/index.php?success=disconnect');       
    }
    function backendHome(){
        $userManager = new UserManager(); 
        $reponse = $userManager -> getUser($_SESSION['pseudo']);
        $commentManager = new CommentManager();
        $comment = $commentManager -> getComments(); 

        require('view/backend/backEndHome.php');        
    }
    function postComment($id, $commentaire){
        $commentManager = new CommentManager();
        $comment = $commentManager -> postComment($id, $commentaire); 
        Controller::backendHome();
    }
    function settingsView(){
        $userManager = new UserManager(); 
        $reponse = $userManager -> getUser($_SESSION['pseudo']);
        $commentManager = new CommentManager();
        require('view/backend/settings.php');        
    }
    function updatePass($oldPass, $newPass, $pseudo){
        $connect = new UserController();
        $newPass = $connect -> newPass($oldPass, $newPass, $pseudo);
    }
    function updateMail($pseudo, $comfirmMail, $newmail, $pass){
        $connect = new UserController();
        $newMail = $connect -> newMail($pseudo, $comfirmMail, $newmail, $pass);
    }
    function updatePseudo($newpseudo, $pseudo, $pass){
        $connect = new UserController();
        $newMail = $connect -> newPseudo($newpseudo, $pseudo, $pass);
    }
    function updateCat($imageUrl){
        $connect = new UserController();
        $newCat = $connect -> newCat($imageUrl);
        header('Location: index.php?action=settingsview&success=updateimage');  
    }
    function deleteAccount(){
        $userController = new UserController();
        $deleteAccount = $userController -> deleteAccount();
        header('Location: index.php?success=bye');
    }
    function adminDeleteAccount($id){
        $userController = new UserController();
        $deleteAccount = $userController -> adminDeleteAccount($id);
        header('Location: index.php?action=playersview&sortby=scoretotal&order=antichrono&success=deleteplayer');
    }
    function deleteComment($id){
        $commentManager = new CommentManager();
        $comment = $commentManager -> deleteComment($id); 
        header('Location: index.php?action=settingsview&success=deletecomment');
    }
    function deleteCommentAdmin($id, $idplayer){
        $commentManager = new CommentManager();
        $comment = $commentManager -> deleteComment($id); 
        header('Location: index.php?action=seecomments&id='.$idplayer);
    }

    function endGameOne($score){
        $connect = new UserController();
        $endGame = $connect -> endGameOne($score);
        $this -> backendHome();
    }
    function endGameTwo($score){
        $connect = new UserController();
        $endGame = $connect -> endGameTwo($score);
        $this -> backendHome();
    }
    function reloadChat(){
        $userManager = new UserManager(); 
        $reponse = $userManager -> getUser($_SESSION['pseudo']);
        $commentManager = new CommentManager();
        $comment = $commentManager -> getComments();
        require('view/backend/chatMessenger.php');        
    }

    function playersView($arg, $order){
        $userManager = new UserManager(); 
        $rep = $userManager -> getAllUsers($arg, $order);
        $reponse = $userManager -> getUser($_SESSION['pseudo']);

        require('view/backend/playersview.php');        
    }
    function adminView(){
        $userManager = new UserManager(); 
        $rep = $userManager -> getAllUsers($arg, $order);
        $reponse = $userManager -> getUser($_SESSION['pseudo']);

        $commentManager = new CommentManager();
        $comment = $commentManager -> getComments();
        require('view/backend/adminView.php');        
    }

    function seeCommentAdmin($id){
        $userManager = new UserManager(); 
        $reponse = $userManager -> getUserWithId($id);
            $rep = $userManager -> getAllUsers('game_total', "DESC");
        $commentManager = new CommentManager();
        $comment = $commentManager -> getComments($id); 
        $comment = $commentManager->getCommentsForOneUser($id);

        require('view/backend/adminCommentView.php');        
    }

}