<?php
class ResetPassController {
	function sendToken($email, $results){
		if ($results == 0) {
			header('Location: /projet5/index.php?error=mailnotfound');
		}
		// generate a unique random token of length 100
		$token = bin2hex(random_bytes(50));

        $userManager = new UserManager();
		$savetoken = $userManager->saveAToken($email, $token);
			// Send email to user with the token in a link they can click on
		$to = $email;
		$subject = "Réinitialiser votre mot de passe sur Stand Up!";
		$msg = "Cliquez sur ce lien pour chnagez votre mot de passe\"https://raphaelmouly.com/projet5/index.php?action=resetpass&token=" . $token . "\"";
		$msg = wordwrap($msg,70);
		$headers = "From: raphaelmouly.com";
		mail($to, $subject, $msg, $headers);
		header('location: index.php?action=pending&email=' . $email);
	}
	function resetPass($newpass, $confirmPass, $token){
		if ($newpass == $confirmPass) {
			$hashed_password = password_hash($newpass, PASSWORD_DEFAULT);
        	$userManager = new UserManager();
			$findtoken = $userManager->findTokenMatch($token);
			if ($findtoken != "") {
				$updateUserPwWithMail = $userManager->updateUserPwWithMail($hashed_password, $findtoken);
				header('location: index.php?success=updatepass');
			}
			else header('Location: index.php?action=signin&error=tokenpbm');
		}
		else header('Location: index.php?action=signin&error=badpass');
	}
}