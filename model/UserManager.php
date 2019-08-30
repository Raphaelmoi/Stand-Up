<?php
require_once("Manager.php"); 

class UserManager extends Manager
{
    //get user data, needed when try to connect
    public function getUser($pseudo)
    {
    	$bdd = $this->dbConnect();
		  $req = $bdd->prepare('SELECT id, pseudo, pass, mail, imageprofil, DATE_FORMAT(date_inscription, \'%d/%m/%Y \') AS date_inscription_fr FROM user WHERE pseudo = ?');
		$req->execute(array($pseudo));
		return $req;
    }

    public function getUserWithId($id)
    {
      $bdd = $this->dbConnect();
      $req = $bdd->prepare('SELECT id, pseudo, pass, mail, imageprofil, date_inscription FROM user WHERE id = ?');
      $req->execute(array($id));
      return $req;
    }
    
    //when user want to change password
    public function updateUserPw($pass, $pseudo){
    	$bdd = $this->dbConnect();
    	$req = $bdd->query("UPDATE user SET pass = '$pass' WHERE pseudo = '$pseudo';");
        return $req;
    }
    //when user want to change mail
    public function updateUserMail($mail, $pseudo){
        $bdd = $this->dbConnect();
        $req = $bdd->query("UPDATE user SET mail = '$mail' WHERE pseudo = '$pseudo';");
        return $req;
    }
    //when user want to change pseudo
    public function updateUserPseudo($pseudo, $newpseudo){
        $bdd = $this->dbConnect();
        $req = $bdd->query("UPDATE user SET pseudo = '$newpseudo' WHERE pseudo = '$pseudo';");
        return $req;
    }
    //if result = 0 $pseudo is not in the database
    public function count($pseudo){
        $bdd = $this->dbConnect();
        $count = $bdd->query("SELECT count(pseudo) FROM user WHERE pseudo = '$pseudo'")->fetchColumn(); 
        return $count;
    }
    //if result = 0 $mail is not in the database
    public function findMail($mail){
        $bdd = $this->dbConnect();
        $count = $bdd->query("SELECT count(mail) FROM user WHERE mail = '$mail'")->fetchColumn(); 
        return $count;
    }
    //add a new user
    public function newUser($pseudo, $pass, $mail, $imgUrl){
        $bdd = $this->dbConnect();

        $req = $bdd->prepare('INSERT INTO user( pseudo, pass, mail, imageprofil, date_inscription) VALUES( :pseudo, :motdepasse, :adressmail, :imageUrl, NOW())');
        $req->execute(array(
            'pseudo' => $pseudo,
            'motdepasse' => $pass,
            'imageUrl' => $imgUrl,
            'adressmail' => $mail
        ));
    }
    public function updateCat($pseudo, $imageUrl){
        $bdd = $this->dbConnect();
        $req = $bdd->query("UPDATE user SET imageprofil = '$imageUrl' WHERE pseudo = '$pseudo';");
        return $req;
    }
    public function deleteAccount($pseudo)
    {
        $bdd = $this->dbConnect();
        $delete = $bdd->query("DELETE FROM user WHERE pseudo = '$pseudo'; ");  
    }
}
