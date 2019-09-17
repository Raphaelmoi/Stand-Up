<?php
/*
 *logIn() -> connect
 *logOut() -> disconnect
 *newUser() -> creation of a new user
 *newPass() -> change password
 *newMail() -> change mail
 *newPseudo() -> change pseudo
 *deleteAccount()
 *verifyPassAndPseudo() -> verification of the user identification
*/
class UserController {

	public function logIn($pseudo, $pass) {
		require_once ("model/UserManager.php");
		$connexionManager = new UserManager();
		if ($this->verifyPseudoAndPass($pseudo, $pass)) {
			$req = $connexionManager->getUser($pseudo);
			if (empty($_SESSION['pseudo'])) {
				$_SESSION['pseudo'] = $req['pseudo'];
				header('Location: /projet5/index.php?action=backendHome&success=connexion&pseudo=' . $req['pseudo']);
			}
			else header('Location: index.php?action=signin&erreur=sessionexist');
		}
		else header('Location: index.php?action=signin&erreur=identifiant');
	}

	public function logOut() {
		$_SESSION = array();
		session_destroy();
	}

	public function newUser($pseudo, $pass, $passTwo, $mail, $imgUrl) {
		require_once ("model/UserManager.php");
		$connexionManager = new UserManager();
		$count = $connexionManager->count($pseudo);
		$mailDispo = $connexionManager->findMail($mail);
		if ($count == 0) { //if pseudo doesn't already exist
			if ($pass == $passTwo) { //if user type 2 types the same pw
				if ($mailDispo == 0) { //mail is not in the database
					if (preg_match(" /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/ ", $mail)) { //mail have a mail format
						$hashed_password = password_hash($pass, PASSWORD_DEFAULT);
						$newUser = $connexionManager->newUser($pseudo, $hashed_password, $mail, $imgUrl);
						UserController::logIn($pseudo, $pass);
					}
					else header('Location: index.php?action=signup&erreur=badmail');
				}
				else header('Location: index.php?action=signup&erreur=mailalreadydatabase');
			}
			else header('Location: index.php?action=signup&erreur=badpass');
		}
		else header('Location: index.php?action=signup&erreur=pseudoindb');
	}

	public function newPass($oldPass, $newPass, $pseudo) {
		require_once ("model/UserManager.php");
		$connexionManager = new UserManager();
		$count = $connexionManager->count($pseudo);
		if ($this->verifyPseudoAndPass($pseudo, $oldPass)) {
			if ($oldPass != $newPass) {
				$hashed_password = password_hash($newPass, PASSWORD_DEFAULT);
				$req = $connexionManager->updateUserPw($hashed_password, $pseudo);
				header('Location: index.php?action=settingsview&success=updatepass');
			}
			else header('Location: index.php?action=settingsview&change=pass&erreur=samepw');
		}
		else header('Location: index.php?action=settingsview&change=pass&erreur=passpseudo');
	}

	public function newMail($pseudo, $comfirmMail, $newmail, $pass) {
		require_once ("model/UserManager.php");
		$connexionManager = new UserManager();
		if ($this->verifyPseudoAndPass($pseudo, $pass)) {
			if ($comfirmMail == $newmail) {
				if (preg_match(" /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/ ", $newmail)) {
					$req = $connexionManager->updateUserMail($newmail, $pseudo);
					UserController::logIn($pseudo, $pass);
					header('Location: index.php?action=settingsview&success=updatemail');
				}
				else header('Location: index.php?action=settingsview&change=mail&erreur=mailbadsyntax');
			}
			else header('Location: index.php?action=settingsview&change=mail&erreur=diffmail');
		}
		else header('Location: index.php?action=settingsview&change=mail&erreur=passpseudo');
	}

	public function newPseudo($newpseudo, $pseudo, $pass) {
		require_once ("model/UserManager.php");
		$connexionManager = new UserManager();
		$count = $connexionManager->count($pseudo);
		$countNewPseudo = $connexionManager->count($newpseudo);
		if ($this->verifyPseudoAndPass($pseudo, $pass)) {
			if ($countNewPseudo == 0) {
				if ($pseudo != $newpseudo) {
					$req = $connexionManager->updateUserPseudo($pseudo, $newpseudo);
					$_SESSION['pseudo'] = $newpseudo;
					header('Location: index.php?action=settingsview&success=updatepseudo');
				}
				else header('Location: index.php?action=settingsview&change=pseudo&erreur=diffpseudo');
			}
			else header('Location: index.php?action=settingsview&change=pseudo&erreur=pseudoindb');
		}
		else header('Location: index.php?action=settingsview&change=pseudo&erreur=passpseudo');
	}

	public function deleteAccount($pseudo, $pass) {
		require_once ("model/UserManager.php");
		$connexionManager = new UserManager();
		$commentManager = new CommentManager();
		if ($this->verifyPseudoAndPass($pseudo, $pass)) {
			$req = $connexionManager->getUser($pseudo);
			$deleteComments = $commentManager->deleteCommentFromOneUser($req['id']);
			$user = $connexionManager->deleteAccount($_SESSION['pseudo']);
			$this->logOut();
			header('Location: index.php?success=bye');
		}
		else header('Location: index.php?action=settingsview&change=account&erreur=passpseudo');
	}
	
	//will return true if the pseudo is in the database and the pass is correct, else false
	public function verifyPseudoAndPass($pseudo, $pass) {
		$returnedValue = false;
		$connexionManager = new UserManager();
		$count = $connexionManager->count($pseudo);
		if ($count != 0) {
			$donnees = $connexionManager->getUser($pseudo);
			if (password_verify($pass, $donnees['pass'])) {
				return $returnedValue = true;
			}
		}
		return $returnedValue;
	}
}

