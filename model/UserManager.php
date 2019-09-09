<?php
require_once ("Manager.php");

class UserManager extends Manager {
    //Get user and all data about him
    public function newUser($pseudo, $pass, $mail, $imgUrl) {
        $bdd = $this->dbConnect();
        $req = $bdd->prepare('INSERT INTO user( pseudo, pass, mail, imageprofil, date_inscription) VALUES( :pseudo, :motdepasse, :adressmail, :imageUrl, NOW())');
        $req->execute(array(
            'pseudo' => $pseudo,
            'motdepasse' => $pass,
            'imageUrl' => $imgUrl,
            'adressmail' => $mail
        ));
    }
    public function getUser($pseudo) {
        $bdd = $this->dbConnect();
        $req = $bdd->prepare('SELECT id, pseudo, pass, mail, imageprofil, DATE_FORMAT(date_inscription, \'%d/%m/%Y \') AS date_inscription_fr, game_one, game_one_bs, game_two, game_two_bs, game_total, authority FROM user WHERE pseudo = ?');
        $req->execute(array($pseudo));
        $result = $req->fetch();
        return $result;
    }
    //Find a user with him ID
    public function getUserWithId($id) {
        $bdd = $this->dbConnect();
        $req = $bdd->prepare('SELECT * FROM user WHERE id = ?');
        $req->execute(array($id));
        $result = $req->fetch();
        return $result;
    }
    public function getAllUsers($arg, $order, $offset = 0) {
        if ($offset > 0) {
            $offset *= 7;
        };
        $bdd = $this->dbConnect();
        $req = $bdd->prepare("SELECT * FROM user ORDER BY $arg $order LIMIT ".$offset.",7");
        $req->execute();
        $result = $req->fetchAll();
        return $result;
    }
    //give the position of the player compare to all the other player
    public function getUserPosition($userScore) {
        $bdd = $this->dbConnect();
        $req = $bdd->prepare("SELECT count(*) from user where game_total > '$userScore'");
        $req->execute();
        $result = $req->fetchColumn();
        return $result;
    }
    public function getNumberOfUsers() {
        $bdd = $this->dbConnect();
        $req = $bdd->prepare("SELECT count(*) from user");
        $req->execute();
        $result = $req->fetchColumn();
        return $result;
    }
    public function getBestScoreGOne() {
        $bdd = $this->dbConnect();
        $req = $bdd->prepare('SELECT game_one_bs FROM user ORDER BY game_one_bs DESC');
        $req->execute();
        $result = $req->fetch();
        return $result;
    }
    public function getBestScoreGTwo() {
        $bdd = $this->dbConnect();
        $req = $bdd->prepare('SELECT game_two_bs FROM user ORDER BY game_two_bs DESC');
        $req->execute();
        $result = $req->fetch();
        return $result;
    }
    //when user want to change password
    public function updateUserPw($pass, $pseudo) {
        $bdd = $this->dbConnect();
        $req = $bdd->prepare("UPDATE user SET pass = '$pass' WHERE pseudo = '$pseudo';");
        $req->execute();
        return $req;
    }
    public function updateUserPwWithMail($pass, $mail) {
        $bdd = $this->dbConnect();
        $req = $bdd->prepare("UPDATE user SET pass = '$pass' WHERE mail = '$mail';");
        $req->execute();
        return $req;
    }
    //when user want to change mail
    public function updateUserMail($mail, $pseudo) {
        $bdd = $this->dbConnect();
        $req = $bdd->prepare("UPDATE user SET mail = '$mail' WHERE pseudo = '$pseudo';");
        $req->execute();
        return $req;
    }
    //when user want to change pseudo
    public function updateUserPseudo($pseudo, $newpseudo) {
        $bdd = $this->dbConnect();
        $req = $bdd->prepare("UPDATE user SET pseudo = '$newpseudo' WHERE pseudo = '$pseudo';");
        $req->execute();
        return $req;
    }
    public function updateCat($pseudo, $imageUrl) {
        $bdd = $this->dbConnect();
        $req = $bdd->prepare("UPDATE user SET imageprofil = '$imageUrl' WHERE pseudo = '$pseudo';");
        $req->execute();
        return $req;
    }
    public function updateScoreOne($pseudo, $score, $bestScore) {
        $bdd = $this->dbConnect();
        if ($bestScore == 1) {
            $req = $bdd->prepare("UPDATE user SET game_one = '$score', game_total = game_total + '$score', game_one_bs = '$score'  WHERE pseudo = '$pseudo';");
        }
        else {
            $req = $bdd->prepare("UPDATE user SET game_one = '$score', game_total = game_total + '$score' WHERE pseudo = '$pseudo';");
        }
        $req->execute();
        return $req;
    }
    public function updateScoreTwo($pseudo, $score, $bestScore) {
        $bdd = $this->dbConnect();
        if ($bestScore == 1) {
            $req = $bdd->prepare("UPDATE user SET game_two = '$score', game_total = game_total + '$score', game_two_bs = '$score'  WHERE pseudo = '$pseudo';");
        }
        else {
            $req = $bdd->prepare("UPDATE user SET game_two = '$score', game_total = game_total + '$score' WHERE pseudo = '$pseudo';");
        }
        $req->execute();
        return $req;
    }
    public function count($pseudo) {
        $bdd = $this->dbConnect();
        $count = $bdd->prepare("SELECT count(pseudo) FROM user WHERE pseudo = '$pseudo'");
        $count->execute();
        $result = $count->fetchColumn();
        return $result;
    }
    public function findMail($mail) {
        $bdd = $this->dbConnect();
        $count = $bdd->prepare("SELECT count(mail) FROM user WHERE mail = '$mail'");
        $count->execute();
        $result = $count->fetchColumn();
        return $result;
    }
    public function deleteAccount($pseudo) {
        $bdd = $this->dbConnect();
        $delete = $bdd->prepare("DELETE FROM user WHERE pseudo = '$pseudo';");
        $delete->execute();
    }
    public function deleteAccountWithId($id) {
        $bdd = $this->dbConnect();
        $delete = $bdd->prepare("DELETE FROM user WHERE id = '$id'; ");
        $delete->execute();
    }
    //Interaction with the password resets table
    public function saveAToken($email, $token){
        $bdd = $this->dbConnect();
        $add = $bdd->prepare("INSERT INTO password_resets(email, token) VALUES (:email, :token)");
        $add->execute(array(
            'email' => $email,
            'token' => $token,
        ));
    }
    public function findTokenMatch($token) {
        $bdd = $this->dbConnect();
        $sql = $bdd->prepare("SELECT email FROM password_resets WHERE token='$token' LIMIT 1");
        $sql->execute();
        $result = $sql->fetch();
        $email = $result['email'];
        return $email;
    }
}