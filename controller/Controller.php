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
        $UserManager = new UserManager(); 
        $reponse = $UserManager -> getUser($_SESSION['pseudo']);
        require('view/backend/backEndHome.php');        
    }

    function logOut(){
        $connect = new UserController();
        $connexion = $connect -> logOut();          
    }
    // function post($id) {
    //     $postManager = new PostManager();
    //     $commentManager = new CommentManager();
    //     $article = $postManager -> getPost($id);
    //     $comment = $commentManager -> getComments($id);
    //     require('view/frontend/postView.php');
    // }
    // function addComment($postId, $author, $comment) {
    //     $postManager = new PostManager();
    //     $commentManager = new CommentManager();
    //     $article = $postManager -> getPosts();
    //     $req = $commentManager -> postComment($postId, $author, $comment);
    //     header('Location: index.php?action=post&id='.$postId);
    // }
    // function biographie(){
    //     $postManager = new PostManager(); 
    //     $reponse = $postManager -> getPosts();
    //     require 'view/frontend/biographieView.php';
    // }

}