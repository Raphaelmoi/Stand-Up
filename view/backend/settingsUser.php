<?php
ob_start();
?>
	<!-- Change the mail -->
	<?php
		if (isset($_GET['change']) && $_GET['change'] == 'mail' ) {?>
			<form action="index.php?action=newmail" method="post">
			    <h2>Changer adresse mail</h2>
				<p><input type="text" name="pseudo" placeholder="Pseudo" required ></p>
				<p><input type="mail" name="old_mail" placeholder="Ancien email" required /></p>
				<p><input type="mail" name="new_mail" placeholder="Comfirmez votre nouveau email" required /></p>
				<p>Saisissez votre mot de passe pour confirmer<input type="password" name="pass" placeholder="mot de passe" required /></p>
			   <input class="btnSubmitSetting" type="submit" value="Changer votre email" >
			</form> 
		<?php
		}
		// Change the pseudo
		elseif (isset($_GET['change']) && $_GET['change'] == 'pseudo' ) {
		?>
			<form action="index.php?action=newpseudo" method="post">
			   <h2>Changer pseudo</h2>
			   <p>Saisissez votre nouveau pseudo<input type="text" name="newpseudo" placeholder="Votre nouveau pseudo" required ></p>
			   <p>Saisissez votre pseudo actuel<input type="text" name="pseudo" placeholder="Pseudo" required /></p>
			   <p>Saisissez votre mot de passe pour confirmer <input type="password" name="pass" placeholder="mot de passe" required /></p>
			   <input class="btnSubmitSetting" type="submit" value="Changer de pseudo" >
			</form> 
			<?php
		}
		// default : change the password view
		elseif (isset($_GET['change']) && $_GET['change'] == 'pass' ){
		?>
		<form action="index.php?action=newpw" method="post">
			<h2>changer mot de passe</h2>
			<p><input type="text" name="pseudo" placeholder="Pseudo" required ></p>
			<p><input type="password" name="old_password" placeholder="ancien mot de passe" required /></p>
			<p><input type="password" name="new_password" placeholder="Nouveau mot de passe" required /></p>
			<input class="btnSubmitSetting" type="submit" value="Changer mot de passe" >
		</form> 
		<?php
		}
		elseif (isset($_GET['change']) && $_GET['change'] == 'cat' ){
		?>
   			 <script> getTheCats(); </script>
            <form class="inscriptionBox" action='index.php?action=newcat' method="post">
                
                <div id="boxImg"></div>

                <input type="hidden" name="imageUrl" id="hiddenInputInscription" value="">
                <input class="btnFormValidate" type="submit" name="submit" value="Inscription">
            </form>

		<?php
		}
		elseif (isset($_GET['change']) && $_GET['change'] == 'account' ){
		?>

			<h3> Supprimer mon compte</h3>
            <form class="inscriptionBox" action='index.php?action=deleteaccount' method="post">
                <label>etes vous sur de vouloir supprimer votre compte?</label><input type="checkbox" name="">
                <input class="btnFormValidate" type="submit" name="submit" value="supprimer mon compte">
            </form>
		<?php
		}
		?>
<?php
$settingsforms = ob_get_clean();
?>
