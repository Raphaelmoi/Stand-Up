<?php
require_once("model/Manager.php"); 

class PostManager extends Manager 
{
    //give all the posts for home page and connected home page
    public function getPosts($sort = 0)
    {
        if ($sort == 1) {
            $order = "DESC";
        }
        else
           $order = "";

        $bdd = $this->dbConnect();
        $reponse = $bdd->query('SELECT id, titre, contenu, url, DATE_FORMAT(date_creation, \'%d/%m/%Y \') AS date_creation_fr FROM billets ORDER BY id '.$order);
        return $reponse;
    }
    //give posts per 10 for the aside view
    //offset is where the request is going to start so if offset =1 -> *10 
    //-> give result from the 10th to the 19th
    public function getPostsPage($offset = 0)
    {
        if ($offset > 0) {
            $offset *= 10;
        };
        $bdd = $this->dbConnect();
        $reponse = $bdd->query('SELECT id, titre, contenu, url, DATE_FORMAT(date_creation, \'%d/%m/%Y à %Hh%imin\') AS date_creation_fr FROM billets ORDER BY id LIMIT '.$offset.',10');
        return $reponse;
    }
    //give only one post
    public function getPost($postId)
    {
        $bdd = $this->dbConnect();
        $article = $bdd->prepare('SELECT id, titre, contenu, url, DATE_FORMAT(date_creation, \'%d/%m/%Y à %Hh%imin\') AS date_creation_fr, numberlike FROM billets WHERE id = ?');
        $article->execute(array($postId));

        return $article;
    }
    //publishing a new post
    public function postPost($titre, $contenu, $url){
        $bdd = $this->dbConnect();
        $req = $bdd->prepare('INSERT INTO billets( titre, contenu, url, date_creation) VALUES( :titre , :contenu, :url, NOW())');
        $req->execute(array(
                    'titre' => $titre,
                    'contenu' => $contenu,
                    'url' => $url
                ));
        return $req;
    }
    //updating a post IF AN IMAGE IS SPECIFIED
    public function updatePost($currentId, $titre, $contenu, $url)
    {
        $bdd = $this->dbConnect();
        $req = $bdd->query("UPDATE billets SET titre = '$titre', contenu = '$contenu', url = '$url', date_creation = NOW() WHERE id = $currentId;");
        return $req;
    }
    //updating a post without img
    public function updatePostWithoutImg($currentId, $titre, $contenu)
    {
        $bdd = $this->dbConnect();
        $req = $bdd->query("UPDATE billets SET titre = '$titre', contenu = '$contenu', date_creation = NOW() WHERE id = $currentId;");
        return $req;
    }
    //delete a post
    public function deletePost($id){
        $bdd = $this->dbConnect();
        $delete = $bdd->query("DELETE FROM billets WHERE id = $id; ");
    }
    //count the number of post
    public function count()
    {
        $bdd = $this->dbConnect();
        $count = $bdd->query('SELECT COUNT(*) FROM billets')->fetchColumn();
        return $count;
    }
    //give the number of like for an article
    public function getLike()
    {
        $bdd = $this->dbConnect();
        $like = $bdd->query('SELECT COUNT(numberlike)  FROM billets');
        return $like;
    }
    //add a like to an article
    public function setLike($id, $val){
        $bdd = $this->dbConnect();
        $like = $bdd->query("UPDATE billets SET numberlike = numberlike + $val WHERE id = $id;");
        return $like;
    }
}