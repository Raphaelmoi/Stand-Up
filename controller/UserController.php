<?php
/*
 *USER LOGIN, LOGOUT AND PASSWORD CHANGING FUNCTIONS
 *logIN() -> connect
 *logOut() -> disconnect
 *newPass() -> change password
 *newMail() -> change mail
 *newPseudo() -> change pseudo
 *newUser()
*/
class UserController {

	public function logIn($pseudo, $pass) {
		require_once ("model/UserManager.php");
		$connexionManager = new UserManager();
		$count = $connexionManager->count($pseudo);
		if ($count != 0) { //if the asked pseudo is found
			$req = $connexionManager->getUser($pseudo);
				if (empty($_SESSION['pseudo'])) {
					if (password_verify($pass, $req['pass'])) {
						$_SESSION['pseudo'] = $req['pseudo'];
						header('Location: /projet5/index.php?action=backendHome&success=connexion&pseudo=' . $req['pseudo']);
					}
					else {
						header('Location: index.php?action=connect&erreur=identifiant');
					}
				}
				else {
					header('Location: index.php?action=connect&erreur=sessionexist');
				}
		}
	}
	public function logOut() {
		session_start();
		$_SESSION = array();
		session_destroy();
	}

	public function newPass($oldPass, $newPass, $pseudo) {
		require_once ("model/UserManager.php");
		$connexionManager = new UserManager();
		$count = $connexionManager->count($pseudo);
		if ($count != 0) {
			$donnees = $connexionManager->getUser($pseudo);
				if (password_verify($oldPass, $donnees['pass'])) {
					if ($oldPass != $newPass) {
						$hashed_password = password_hash($newPass, PASSWORD_DEFAULT);
						$req = $connexionManager->updateUserPw($hashed_password, $pseudo);
						header('Location: index.php?action=backendHome&success=updatepass');
					}
					else header('Location: index.php?action=settings&erreur=samepw');
				}
				else header('Location: index.php?action=settings&erreur=passpseudo');
		}
		else header('Location: index.php?action=settings&erreur=passpseudo');
	}

	public function newMail($pseudo, $comfirmMail, $newmail, $pass) {
		require_once ("model/UserManager.php");
		$connexionManager = new UserManager();
		$count = $connexionManager->count($pseudo);
		if ($count != 0) {
			$donnees = $connexionManager->getUser($pseudo);
				if (password_verify($pass, $donnees['pass'])) {
					if ($comfirmMail == $newmail) {

						if (preg_match(" /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/ ", $newmail)) {
							$req = $connexionManager->updateUserMail($newmail, $pseudo);
							UserController::logIn($pseudo, $pass);
							header('Location: index.php?action=settingsview&success=updatemail');
						}
						else header('Location: index.php?action=settings&change=mail&erreur=mailbadsyntax');
					}
					else header('Location: index.php?action=settings&change=mail&erreur=diffmail');
				}
				else header('Location: index.php?action=settings&change=mail&erreur=passpseudo');
			}
		else header('Location: index.php?action=settings&change=mail&erreur=passpseudo');
	}

	public function newPseudo($newpseudo, $pseudo, $pass) {
		require_once ("model/UserManager.php");
		$connexionManager = new UserManager();
		$count = $connexionManager->count($pseudo);
		if ($count != 0) {
			$user = $connexionManager->getUser($pseudo);
				if (password_verify($pass, $user['pass'])) {
					if ($pseudo != $newpseudo) {
						$req = $connexionManager->updateUserPseudo($pseudo, $newpseudo);
						$_SESSION['pseudo'] = $newpseudo;

						header('Location: index.php?action=settingsview&success=updatepseudo');
					}
					else header('Location: index.php?action=settings&change=pseudo&erreur=diffpseudo');
				}
				else header('Location: index.php?action=settings&change=pseudo&erreur=passpseudo');
			// }
		}
		else header('Location: index.php?action=settings&change=pseudo&erreur=passpseudob');
	}

	public function newUser($pseudo, $pass, $passTwo, $mail, $imgUrl) {
		require_once ("model/UserManager.php");
		$connexionManager = new UserManager();
		$count = $connexionManager->count($pseudo);
		$mailDispo = $connexionManager->findMail($mail);

		if ($count == 0) { //if pseudo doesnt already exist
			if ($pass == $passTwo) {
				if ($mailDispo == 0) {
					if (preg_match(" /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/ ", $mail)) {
						$hashed_password = password_hash($pass, PASSWORD_DEFAULT);
						$newUser = $connexionManager->newUser($pseudo, $hashed_password, $mail, $imgUrl);

						UserController::logIn($pseudo, $pass);
					}
					else {
						header('Location: index.php?action=settings&change=pseudo&erreur=badmail');
					}
				}
				else {
					header('Location: index.php?action=settings&change=pseudo&erreur=mailalreadydatabase');
				}
			}
			else {
				header('Location: index.php?action=settings&change=pseudo&erreur=badpass');
			}
		}
		else {
			header('Location: index.php?action=settings&change=pseudo&erreur=pseudoexistalready');
		}
	}

	public function newCat($imageUrl) {
		require_once ("model/UserManager.php");
		$connexionManager = new UserManager();
		$user = $connexionManager->updateCat($_SESSION['pseudo'], $imageUrl);
	}
	public function deleteAccount() {
		require_once ("model/UserManager.php");
		$connexionManager = new UserManager();
		$commentManager = new CommentManager();
		$reponse = $connexionManager->getUser($_SESSION['pseudo']);
		$deleteComments = $commentManager->deleteCommentFromOneUser($reponse['id']);
		$user = $connexionManager->deleteAccount($_SESSION['pseudo']);
		$this->logOut();
	}

	public function endGameOne($score) {
		require_once ("model/UserManager.php");
		$connexionManager = new UserManager();
		$reponse = $connexionManager->getUser($_SESSION['pseudo']);
			if ($score > $reponse['game_one_bs']) {
				$user = $connexionManager->updateScoreOne($_SESSION['pseudo'], $score, 1);
			}
			else {
				$user = $connexionManager->updateScoreOne($_SESSION['pseudo'], $score, 0);
			}
	}
	public function endGameTwo($score) {
		require_once ("model/UserManager.php");
		$connexionManager = new UserManager();
		$reponse = $connexionManager->getUser($_SESSION['pseudo']);
		if ($score > $reponse['game_two_bs']) {
			$user = $connexionManager->updateScoreTwo($_SESSION['pseudo'], $score, 1);
		}
		else {
			$user = $connexionManager->updateScoreTwo($_SESSION['pseudo'], $score, 0);
		}
	}
}

