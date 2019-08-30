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

    function connect($pseudo, $motdepasse){
        $connect = new UserController();
        $connexion = $connect -> logIn($pseudo, $motdepasse);         
    }

    function backendHome(){
        $userManager = new UserManager(); 
        $reponse = $userManager -> getUser($_SESSION['pseudo']);
        $commentManager = new CommentManager();
        $comment = $commentManager -> getComments(); 
        require('view/backend/backEndHome.php');        
    }

    function logOut(){
        $connect = new UserController();
        $connexion = $connect -> logOut();          
    }

    function postComment($id, $commentaire){
        $commentManager = new CommentManager();
        $comment = $commentManager -> postComment($id, $commentaire); 
        Controller::backendHome();
    }

}