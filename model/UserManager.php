<?php
require_once ("Manager.php");

class UserManager extends Manager {
    //Add a new user
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
    //Find an user by Pseudo
    public function getUser($pseudo) {
        $bdd = $this->dbConnect();
        $req = $bdd->prepare('SELECT id, pseudo, pass, mail, imageprofil, DATE_FORMAT(date_inscription, \'%d/%m/%Y \') AS date_inscription_fr, game_one, game_one_bs, game_two, game_two_bs, game_total, authority FROM user WHERE pseudo = ?');
        $req->execute(array($pseudo));
        $result = $req->fetch();
        return $result;
    }
    //Find an user with him ID
    public function getUserWithId($id) {
        $bdd = $this->dbConnect();
        $req = $bdd->prepare('SELECT * FROM user WHERE id = ?');
        $req->execute(array($id));
        $result = $req->fetch();
        return $result;
    }
    // get all the users with a pagination argmument. Give results per 7
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
    //give the qtt of players who have a better score 
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
    //give the best score for the first game
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
    //Update the password
    public function updateUserPw($pass, $pseudo) {
        $bdd = $this->dbConnect();
        $req = $bdd->prepare("UPDATE user SET pass = '$pass' WHERE pseudo = '$pseudo';");
        $req->execute();
        return $req;
    }
    //Update pass with the email, in case user forgot password
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
    //update profil picture
    public function updateCat($pseudo, $imageUrl) {
        $bdd = $this->dbConnect();
        $req = $bdd->prepare("UPDATE user SET imageprofil = '$imageUrl' WHERE pseudo = '$pseudo';");
        $req->execute();
        return $req;
    }
    //update score, the function receive 0 or 1 as value for the $bestScore argument, determine if it's have to had a best score value or not
    public function updateScore($pseudo, $score, $bestScore, $game, $bestScoreGame) {
        $bdd = $this->dbConnect();
        if ($bestScore == 1) {
            $req = $bdd->prepare("UPDATE user SET $game = '$score', game_total = game_total + '$score', $bestScoreGame = '$score'  WHERE pseudo = '$pseudo';");
        }
        else {
            $req = $bdd->prepare("UPDATE user SET $game = '$score', game_total = game_total + '$score' WHERE pseudo = '$pseudo';");
        }
        $req->execute();
        return $req;
    }
    //look if a specified pseudo is already in the database or not
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