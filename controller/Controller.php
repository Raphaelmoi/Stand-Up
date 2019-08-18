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
    // function contact(){
    //     $postManager = new PostManager(); 
    //     $reponse = $postManager -> getPosts();
    //     require 'view/frontend/contactView.php';
    // }
    // function connect(){
    //     $postManager = new PostManager(); 
    //     $reponse = $postManager -> getPosts();
    //     require 'view/frontend/connectView.php';
    // }
    // function isconnected(){
    //     $connect = new UserController();
    //     $connexion = $connect -> logIn(); 
    // }
    // function disconnect(){
    //     $connect = new UserController();
    //     $deconnexion = $connect -> logOut(); 
    // }
    // function homeControl($sort = 0){
    //     $postManager = new PostManager();
    //     if ($sort == 1) {
    //         $reponse = $postManager -> getPosts(1);
    //     }else{
    //         $reponse = $postManager -> getPosts();
    //     }
    //     $uticontroller = new UtiController();
    //     require('view/backend/connectedIndex.php');
    // }
    // function nouveauBillet(){
    //     require('view/backend/nouveauBillet.php');
    // }
    // function addPost($titre, $contenu, $imageurl)
    // {
    //     $imageurl = Controller::uploadImg();
    //     $postManager = new PostManager(); 
    //     $envoi = $postManager -> postPost($titre, $contenu, $imageurl);
    //     //if user do f5 we dont want to publish twice the same content so... 
    //     $reponse = $postManager -> getPosts();
    //     header('Location: index.php?action=homeControl&success=addpost');
    // }
    // function modifyPost($id) {
    //     $postManager = new PostManager();
    //     $article = $postManager -> getPost($id); 
    //     require('view/backend/modifyBillet.php');
    // }
    // function updateThePost($id, $titre, $contenu, $imageUrl){
    //     $imageUrl = Controller::uploadImg();
    //     $postManager = new PostManager();
    //     $req = $postManager -> updatePost($id, $titre, $contenu, $imageUrl); 
    //     //if user do f5 we dont want to publish twice the same content so... 
    //     $reponse = $postManager -> getPosts();
    //     header('Location: index.php?action=homeControl&success=modifypost');
    // }
    // function updatePostWithoutImg($id, $titre, $contenu) {
    //     $postManager = new PostManager();
    //     $req = $postManager -> updatePostWithoutImg($id, $titre, $contenu); 
    //     //if user do f5 we dont want to publish twice the same content so... 
    //     $reponse = $postManager -> getPosts();
    //     header('Location: index.php?action=homeControl&success=modifypost');   
    // }
    // function deletePost($id)
    // {
    //     $postManager = new PostManager();
    //     $req = $postManager -> deletePost($id); 
    //     Controller::homeControl();
    // }
    // function signalComment($id, $commentid, $val){
    //     $commentManager = new CommentManager();
    //     $postManager = new PostManager();
    //     $req = $commentManager -> reportComment($commentid, $val);
    //     $article = $postManager -> getPost($id);
    //     $comment = $commentManager -> getComments($id);
    //     header('Location: index.php?action=post&id='.$id);
    // }
    // function badCommentView()
    // {
    //     $commentManager = new CommentManager();
    //     $comment = $commentManager -> getSignaledComments();
    //     $number =  $commentManager -> countBadComment();
    //     require('view/backend/badComment.php');
    // }
    // function deleteComment($id)
    // {
    //     $commentManager = new CommentManager();
    //     $delete = $commentManager -> deleteComment($id);
    //     Controller::badCommentView();
    // }
    // function deleteCommentFromViewPage($commentid, $articleid)
    // {
    //     $commentManager = new CommentManager();
    //     $delete = $commentManager -> deleteComment($commentid);
    //     Controller::post($articleid);
    // }
    // function validateComment($id){
    //     $commentManager = new CommentManager();
    //     $validate = $commentManager -> validateComment($id);
    //     Controller::badCommentView();
    // }
    // function likeAPost($id, $val){
    //     $postManager = new PostManager();
    //     $commentManager = new CommentManager();
    //     $like = $postManager -> setLike($id, $val);
    //     $article = $postManager -> getPost($id);
    //     $comment = $commentManager -> getComments($id);
    //     header('Location: index.php?action=post&id='.$id);
    // }
    // function sendmail($name, $mail, $tel, $msg){
    //     $postManager = new PostManager(); 
    //     $reponse = $postManager -> getPosts();
    //     $sendMail = new UtiController();
    //     $sendAMail = $sendMail -> sendAMail($name, $mail, $tel, $msg);
    //     header('Location: index.php?action=contact&success=mail');
    // }
    // function settings(){
    //     require('view/backend/settingsview.php');
    // }
    // function updatePass($oldPass, $newPass, $pseudo){
    //     $connect = new UserController();
    //     $newPass = $connect -> newPass($oldPass, $newPass, $pseudo);
    // }
    // function updateMail($pseudo, $oldmail, $newmail, $pass){
    //     $connect = new UserController();
    //     $newMail = $connect -> newMail($pseudo, $oldmail, $newmail, $pass);
    // }
    // function updatePseudo($newpseudo, $pseudo, $pass){
    //     $connect = new UserController();
    //     $newMail = $connect -> newPseudo($newpseudo, $pseudo, $pass);
    // }
    // function uploadImg(){
    //     $imageUploader = new UtiController();
    //     $imageUrl = $imageUploader -> imageUploader();
    //     return $imageUrl;
    // }
}