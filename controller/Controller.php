<?php
class Controller
{       
    function __construct()
    {
        spl_autoload_register('Controller::chargerClasse');
        // require 'controller/UtiController.php';
        // require 'controller/UserController.php';
    }
    //autoload
    function chargerClasse($classname)
    {
        require 'model/'.$classname.'.php';
    }
    function homePage() {
        // $postManager = new PostManager();
        // $uticontroller = new UtiController();
        // $reponse = $postManager -> getPosts();
        require('view/frontend/affichageAccueil.php');
    }

    function signIn(){
        require ('view/frontend/affichageAccueil.php');
    }

    function signUp(){
        require 'view/frontend/affichageAccueil.php';
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