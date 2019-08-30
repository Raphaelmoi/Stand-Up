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
class UserController{

	public function logIn($pseudo, $pass)
	{
		require_once("model/UserManager.php"); 

		    $connexionManager = new UserManager();
		    $count = $connexionManager -> count($pseudo);
		    echo $count;
			if ($count != 0) {//if the asked pseudo is found
		    	$req = $connexionManager -> getUser($pseudo);
				while ($donnees = $req->fetch())
				{
					if (empty($_SESSION['pseudo'])) {
						if (password_verify($pass, $donnees['pass'])) {
					    	$_SESSION['pseudo'] = $donnees['pseudo'];
					    	header('Location: /projet5/index.php?action=backendHome&success=connexion&pseudo='.$donnees['pseudo']);
					    }
					    else {
							header('Location: index.php?action=connect&erreur=identifiant');
						}				
					}else {
						header('Location: index.php?action=connect&erreur=identifiant');
					}	
				}
				$req->closeCursor(); 
			}
	}
	public function logOut()
	{
		session_start();
		// delete current session and global variable SESSION
		$_SESSION = array();
		session_destroy();
		header('Location: /projet5/index.php?success=disconnect');
	}

	public function newPass($oldPass, $newPass, $pseudo)
	{
		require_once("model/UserManager.php"); 
		$connexionManager = new UserManager();
		$count = $connexionManager -> count($pseudo);
			if ($count !=0) {
				$test = $connexionManager -> getUser($pseudo);
				while ($donnees = $test->fetch())
				{
				if (password_verify($oldPass, $donnees['pass'])) {
					if ($oldPass != $newPass) {
						$hashed_password = password_hash($newPass, PASSWORD_DEFAULT);
						$req = $connexionManager -> updateUserPw($hashed_password, $pseudo);
						header('Location: index.php?action=homeControl&success=updatepass');  
					}
					 else
					 	header('Location: index.php?action=settings&erreur=samepw');   
				}
				else
					header('Location: index.php?action=settings&erreur=passpseudo');   
			}
		}
		else
			header('Location: index.php?action=settings&erreur=passpseudo');	
	}

	public function newMail($pseudo, $oldmail, $newmail, $pass){
		require_once("model/UserManager.php"); 
		$connexionManager = new UserManager();
		$count = $connexionManager -> count($pseudo);
		if ($count !=0) {
			$test = $connexionManager -> getUser($pseudo);
			while ($donnees = $test->fetch())
			{
				if (password_verify($pass, $donnees['pass'])) {
					if ($oldmail == $donnees['email']) {

						if (preg_match ( " /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/ " , $newmail )) {
							$req = $connexionManager -> updateUserMail($newmail, $pseudo);
							header('Location: index.php?action=homeControl&success=updatemail');  
						}
						else 
							header('Location: index.php?action=settings&change=mail&erreur=mailbadsyntax');
					}
					else			
					header('Location: index.php?action=settings&change=mail&erreur=badmailfrombbd');   
				}
				else
					header('Location: index.php?action=settings&change=mail&erreur=passpseudo');   
			}
		}
		else
			header('Location: index.php?action=settings&change=mail&erreur=passpseudo');		
	}

	public function newPseudo($newpseudo, $pseudo, $pass)
	{
		require_once("model/UserManager.php"); 
		$connexionManager = new UserManager();
		$count = $connexionManager -> count($pseudo);

		if ($count != 0) {
			$user = $connexionManager -> getUser($pseudo);
			while ($donnees = $user->fetch())
			{
			if (password_verify($pass, $donnees['pass'])) {
				if ($pseudo != $newpseudo) {
					$req = $connexionManager -> updateUserPseudo($pseudo, $newpseudo);
					header('Location: index.php?action=homeControl&success=updatepseudo');  
				}
				 else
				 	header('Location: index.php?action=settings&change=pseudo&erreur=diffpseudo'); 
				}
			else
				header('Location: index.php?action=settings&change=pseudo&erreur=passpseudo');   
			}		
		}else
		header('Location: index.php?action=settings&change=pseudo&erreur=passpseudo'); 
	}



	public function newUser($pseudo, $pass, $passTwo, $mail, $imgUrl){
		require_once("model/UserManager.php"); 
		$connexionManager = new UserManager();
		$count = $connexionManager -> count($pseudo);
		$mailDispo = $connexionManager -> findMail($mail);

		if ($count == 0) {//if pseudo doesnt already exist
			if ($pass == $passTwo) {
				if ($mailDispo == 0) {
					if ( preg_match ( " /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/ " , $mail ))
                	{
	                $hashed_password = password_hash($pass, PASSWORD_DEFAULT);
	                $newUser = $connexionManager -> newUser($pseudo, $hashed_password, $mail, $imgUrl);

	                UserController::logIn($pseudo, $pass);
					}
					else{
					 	header('Location: index.php?action=settings&change=pseudo&erreur=badmail'); 
					}
				}else{
				 	header('Location: index.php?action=settings&change=pseudo&erreur=mailalreadydatabase'); 
				}
			}else{
				header('Location: index.php?action=settings&change=pseudo&erreur=badpass'); 
			}
		}else{
			header('Location: index.php?action=settings&change=pseudo&erreur=pseudoexistalready'); 
		}
	}
}

