<?php
ob_start();
?>
	<!-- Change the mail -->
	<?php
		if (isset($_GET['change']) && $_GET['change'] == 'mail' ) {?>
			<div class="mainContentSettings">
				<h3>Changer mon adresse mail</h3>
				<form action="index.php?action=newmail" method="post">
					<p><input type="text" name="pseudo" placeholder="Pseudo" required ></p>
					<p><input type="mail" name="new_mail" placeholder="Nouveau email" required /></p>
					<p><input type="mail" name="comfirm_mail" placeholder="Comfirmez nouveau email" required /></p>
					<p>Saisissez votre mot de passe pour confirmer</br></br><input type="password" name="pass" placeholder="mot de passe" required /></p>
				   <input class="btnSubmitSetting" type="submit" value="Changer votre email" >
				</form> 
			</div>
		<?php
		}
		// Change the pseudo
		elseif (isset($_GET['change']) && $_GET['change'] == 'pseudo' ) {
		?>
		<div class="mainContentSettings">
			<h3>Changer mon pseudo</h3>
			<form action="index.php?action=newpseudo" method="post">
			   <p>Saisissez votre nouveau pseudo </br><input type="text" name="newpseudo" placeholder="Votre nouveau pseudo" required ></p>
			   <p>Saisissez votre pseudo actuel</br><input type="text" name="pseudo" placeholder="Pseudo" required /></p>
			   <p>Saisissez votre mot de passe pour confirmer</br> <input type="password" name="pass" placeholder="mot de passe" required /></p>
			   <input class="btnSubmitSetting" type="submit" value="Changer de pseudo" >
			</form> 	
		</div>

			<?php
		}
		// default : change the password view
		elseif (isset($_GET['change']) && $_GET['change'] == 'pass' ){
		?>
		<div class="mainContentSettings" >
			<h3>Changer mon mot de passe</h3>
			<form action="index.php?action=newpw" method="post">
				<p><input type="text" name="pseudo" placeholder="Pseudo" required ></p>
				<p><input type="password" name="old_password" placeholder="ancien mot de passe" required /></p>
				<p><input type="password" name="new_password" placeholder="Nouveau mot de passe" required /></p>
				<input class="btnSubmitSetting" type="submit" value="Changer mot de passe" >
			</form> 
		</div>
		<?php
		}
		// Change the profil picture
		elseif (isset($_GET['change']) && $_GET['change'] == 'cat' ){
		?>
			<div class="mainContentSettings" >
				<h3>Changer ma photo de profil</h3>
	   			<script> getTheCats(); </script>
	            <form class="inscriptionBox" action='index.php?action=newcat' method="post">	                
	                <div id="boxImg"></div>
	                <input type="hidden" name="imageUrl" id="hiddenInputInscription" value="">
	                <input class="btnSubmitSetting" type="submit" name="submit" value="Changer mon image">
	            </form>
	        </div>
		<?php
		}
		// Delete account
		elseif (isset($_GET['change']) && $_GET['change'] == 'account' ){
		?>
			<div class="mainContentSettings" >
				<h3> Supprimer mon compte</h3>
	            <form class="inscriptionBox" action='index.php?action=deleteaccount' method="post">
	                <p>Etes vous sûr de vouloir supprimer votre compte?</p> <input type="checkbox" required>
	                </br>
	            	</br>
	                <input class="btnSubmitSetting" type="submit" name="submit" value="supprimer mon compte"
	                onclick="return confirm('Êtes vous sûr de vouloir supprimer votre compte ?\nCette action est irréversible')">
	            </form>
	        </div>
		<?php
		}
		else{
			// Basic view with profil information and every comment from user
		?>
		<div class="mainContentSettings">
			<h3>Mon profil</h3>
			<div class="infoUserSettings">
			    <img src="<?= $reponse['imageprofil'] ?>">
			    <div>
					<h4> <?= $reponse['pseudo'] ?> </h4>
					<p>Adresse email : <?= $reponse['mail'] ?></p>
					<p>Inscrit depuis le <?= $reponse['date_inscription_fr'] ?></p>
			    </div>
			</div>
			<div class="commentsSettings" >
				<h3>Mes commentaires</h3>

			    <?php
				$comment = $commentManager -> getCommentsForOneUser($reponse['id']); 
			    while ($donnees = $comment->fetch())
			    {
			    ?>
					<p><span>Le <?= $donnees['date_commentaire_fr'] ?> :</span> <?= $donnees['comment'] ?>
					<a href="index.php?action=deletecomment&amp;id=<?=$donnees['id'] ?>"
					onclick="return confirm('Êtes vous sûr de vouloir supprimer ce commentaire ?\nCette action est irréversible')"
						>Supprimer ce commentaire</a>
				</p>
			    <?php
			    }
			    $comment->closeCursor(); // Termine le traitement de la requête
			    ?>
			</div>
		</div>
		<?php
		}
		
$settingsforms = ob_get_clean();
?>
