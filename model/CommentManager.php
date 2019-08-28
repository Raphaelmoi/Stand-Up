<?php
require_once("model/Manager.php"); 

class CommentManager extends Manager
{
    //get all the comments linked with the current post except if comment was report 10 times or more
    public function getComments($postId)
    {
        $bdd = $this->dbConnect();
        $comment = $bdd->prepare("SELECT id, id_billet, auteur, commentaire, DATE_FORMAT(date_commentaire, '%d/%m/%Y à %Hh%imin') AS date_commentaire_fr, signalement FROM commentaires WHERE id_billet = ? && signalement < 10 ORDER BY date_commentaire");
        $comment->execute(array($postId));
        return $comment;
    }
    //get comment who are report at least one time or more
    public function getSignaledComments()
    {
        $bdd = $this->dbConnect();
        $comment = $bdd->prepare("SELECT id, id_billet, auteur, commentaire, DATE_FORMAT(date_commentaire, '%d/%m/%Y à %Hh%imin') AS date_commentaire_fr, signalement FROM commentaires WHERE signalement != ? ORDER BY signalement DESC");
        $comment->execute(array(0));

        return $comment;
    }
    //post a new comment
    public function postComment($idArticle, $auteur, $commentaire)
    {
        $bdd = $this->dbConnect();
        $req = $bdd->prepare('INSERT INTO commentaires(id_billet, auteur, commentaire, date_commentaire) VALUES( :idArticle , :auteur, :commentaire, NOW())');
        $req->execute(array(
                    'idArticle' => $idArticle,
                    'auteur' => $auteur,
                    'commentaire' => $commentaire
                ));
        return $req;
    }
    //report a comment
    public function reportComment($currentId, $val)
    {
        $bdd = $this->dbConnect();
        $req = $bdd->query("UPDATE commentaires SET signalement = signalement + $val WHERE id = $currentId;");

        return $req;
    }
    //for the admin, allow a comment who were reported by putting the signalement value to 0
    public function validateComment($currentId)
    {
        $bdd = $this->dbConnect();
        $validate = $bdd->query("UPDATE commentaires SET signalement = 0 WHERE id = $currentId;");

        return $validate;
    }
    //admin can delete any comment
    public function deleteComment($id)
    {
        $bdd = $this->dbConnect();
        $delete = $bdd->query("DELETE FROM commentaires WHERE id = $id; ");
    }    
    //count the number of differents reported comment
    public function countBadComment()
    {
        $bdd = $this->dbConnect();
        $count = $bdd->query('SELECT COUNT(*) FROM commentaires where signalement != 0')->fetchColumn();
        return $count;
    }
}