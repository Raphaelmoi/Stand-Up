<?php
require_once ("model/Manager.php");

class CommentManager extends Manager {
    //get all the comments
    public function getComments() {
        $bdd = $this->dbConnect();
        $comment = $bdd->query("SELECT id, id_user, comment, DATE_FORMAT(date_publication, '%d/%m/%Y à %Hh%i') AS date_commentaire_fr, report FROM comment ORDER BY date_publication DESC");
        return $comment;
    }
    public function getCommentsForOneUser($id) {
        $bdd = $this->dbConnect();
        $comment = $bdd->query("SELECT id, id_user, comment, DATE_FORMAT(date_publication, '%d/%m/%Y à %Hh%i') AS date_commentaire_fr, report FROM comment WHERE id_user = '$id' ");
        return $comment;
    }
    //post a new comment
    public function postComment($id, $commentaire) {
        $bdd = $this->dbConnect();
        $req = $bdd->prepare('INSERT INTO comment(id_user, date_publication, comment) VALUES( :idUser , NOW(), :commentaire )');
        $req->execute(array(
            'idUser' => $id,
            'commentaire' => $commentaire
        ));
        return $req;
    }
    //admin can delete any comment
    public function deleteComment($id) {
        $bdd = $this->dbConnect();
        $delete = $bdd->query("DELETE FROM comment WHERE id = $id; ");
    }
    //admin can delete any comment
    public function deleteCommentFromOneUser($id) {
        $bdd = $this->dbConnect();
        $delete = $bdd->query("DELETE FROM comment WHERE id_user = $id; ");
    }
}