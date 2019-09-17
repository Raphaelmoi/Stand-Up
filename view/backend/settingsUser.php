<?php
//view displaying form for updating any information of an account (mail, pseudo , profil picture,..)
//default view show all the users comments and a links to each form
ob_start();
?>
	<!-- Change the mail -->
	<?php
		if (isset($_GET['change']) && $_GET['change'] == 'mail' ):?>
			<div class="mainContentSettings">
				<h3>Changer mon adresse mail</h3>
				<form action="index.php?action=newmail" method="post">
					<p><input type="text" name="pseudo" placeholder="Pseudo" required ></p>
					<p><input type="mail" name="new_mail" placeholder="Nouveau mail" required /></p>
					<p><input type="mail" name="comfirm_mail" placeholder="Comfirmez nouveau mail" required /></p>
					<p><input type="password" name="pass" placeholder="Mot de passe" required /></p>
				   <input class="btnSubmitSetting" type="submit" value="Changer d'adresse mail" >
				</form> 
			</div>
		<?php
		// Change the pseudo
		elseif (isset($_GET['change']) && $_GET['change'] == 'pseudo' ):
		?>
		<div class="mainContentSettings">
			<h3>Changer mon pseudo</h3>
			<form action="index.php?action=newpseudo" method="post">
			   <p><input type="text" name="newpseudo" placeholder="Votre nouveau pseudo" required ></p>
			   <p><input type="text" name="pseudo" placeholder="Pseudo actuel	" required /></p>
			   <p><input type="password" name="pass" placeholder="Mot de passe" required /></p>
			   <input class="btnSubmitSetting" type="submit" value="Changer de pseudo" >
			</form> 	
		</div>
		<?php
		// default : change the password view
		elseif (isset($_GET['change']) && $_GET['change'] == 'pass' ):
		?>
		<div class="mainContentSettings" >
			<h3>Changer mon mot de passe</h3>
			<form action="index.php?action=newpw" method="post">
				<p><input type="text" name="pseudo" placeholder="Pseudo" required ></p>
				<p><input type="password" name="old_password" placeholder="Mot de passe actuel" required /></p>
				<p><input type="password" name="new_password" placeholder="Nouveau mot de passe" required /></p>
				<input class="btnSubmitSetting" type="submit" value="Changer de mot de passe" >
			</form> 
		</div>
		<?php
		// Change the profil picture
		elseif (isset($_GET['change']) && $_GET['change'] == 'cat' ):
		?>
			<div class="mainContentSettings" >
				<h3>Changer ma photo de profil</h3>
	   			<script> CatApi.getTheCats(12); </script>
	            <form class="inscriptionBox" action='index.php?action=newcat' method="post">	                
	                <div id="boxImg"></div>
	                <input type="hidden" name="imageUrl" id="hiddenInputInscription" value="">
	                <div class="btnInscriptionBox">
						<div class="moreCats" onclick="CatApi.getTheCats(6)"> Je n'ai pas trouvé mon chat</div>
		                <input class="btnSubmitSetting" type="submit" name="submit" value="Changer mon image">
	                </div>
	            </form>
	        </div>
		<?php
		// Delete account
		elseif (isset($_GET['change']) && $_GET['change'] == 'account' ):
		?>
			<div class="mainContentSettings" >
				<h3> Supprimer mon compte</h3>
	            <form class="inscriptionBox" action='index.php?action=deleteaccount' method="post">
					<p><input type="text" name="pseudo" placeholder="Pseudo" required ></p>
					<p><input type="password" name="password" placeholder="Mot de passe" required /></p>
	                <input class="btnSubmitSetting" type="submit" name="submit" value="Supprimer mon compte"
	                onclick="return confirm('Êtes vous sûr de vouloir supprimer votre compte ?\nCette action est irréversible')">
	            </form>
	        </div>
		<?php
		else:
		// Basic view with profil information and every comment from the user
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
			    foreach ($comment as $row => $data):
			    ?>
					<p><span>Le <?= $data['date_commentaire_fr'] ?> :</span> <?= $data['comment'] ?>
					<a class="deleteComment" href="index.php?action=deletecomment&amp;id=<?=$data['id'] ?>"
					onclick="return confirm('Êtes vous sûr de vouloir supprimer ce commentaire ?\nCette action est irréversible')"
						>Supprimer ce commentaire</a>
				</p>
			    <?php
			    endforeach;
			    ?>
			</div>
		</div>
		<?php
		endif;
$settingsforms = ob_get_clean();
?>
