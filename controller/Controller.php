<?php
class Controller
{       
    function __construct()
    {
        spl_autoload_register('Controller::chargerClasse');
        // require 'controller/UtiController.php';
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
        require('view/backend/settings.php');        
    }
    function updatePass($oldPass, $newPass, $pseudo){
        $connect = new UserController();
        $newPass = $connect -> newPass($oldPass, $newPass, $pseudo);
    }
    function updateMail($pseudo, $oldmail, $newmail, $pass){
        $connect = new UserController();
        $newMail = $connect -> newMail($pseudo, $oldmail, $newmail, $pass);
    }
    function updatePseudo($newpseudo, $pseudo, $pass){
        $connect = new UserController();
        $newMail = $connect -> newPseudo($newpseudo, $pseudo, $pass);
        // header('Location: index.php?action=settingsview&success=updatepseudo');  
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
}