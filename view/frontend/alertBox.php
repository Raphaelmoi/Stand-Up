<!-- Show error message or success message for $_GET['erreur'] et $_GET['success']  -->
<?php
ob_start();
if (isset($_GET['erreur'])):
	?>
	<section class="alert alertRed">
		<?php
		if ($_GET['erreur'] == 'identifiant'):
			?>	
		    <p>Votre pseudo ou votre mot de passe est incorrect</p>
			<?php
		elseif ($_GET['erreur'] == 'mailbadsyntax' ):
			?>
			<p>Le nouveau mail n'est pas au bon format.</p>
			<?php
	    elseif ($_GET['erreur'] == 'badmailfrombbd' ):
	    ?>
	    	<p>L'ancien mail n'est pas le bon</p>
	    <?php
		elseif ($_GET['erreur'] == 'badmail' ):
	    ?>
	    	<p>Votre email a une mauvaise syntaxe</p>
	    <?php
		elseif ($_GET['erreur'] == 'passpseudo' ):
	    ?>
	    	<p>Vous avez saisi un mauvais pseudo ou mot de passe</p>
	    <?php
		elseif ($_GET['erreur'] == 'diffpseudo' ):
			?>
			<p>Vous avez saisie deux fois le même pseudo </p>
			<?php
		elseif ($_GET['erreur'] == 'samepw'):
			?>
			<p>Vous avez saisie deux fois le même mot de passe </p>
			<?php
		elseif ($_GET['erreur'] == 'sessionexist'):
			?>
			<p>Vous êtes déjà connecté </p>
			<?php
		elseif ($_GET['erreur'] == 'diffmail'):
			?>
			<p>Erreur lors de la confirmation de l'adresse mail </p>
			<?php
		elseif ($_GET['erreur'] == 'pseudoindb'):
			?>
			<p>Ce pseudo existe déjà </p>
			<?php
		elseif ($_GET['erreur'] == 'mailalreadydatabase'):
			?>
			<p>Il y a déjà un compte avec cette adresse mail </p>
			<?php
		elseif ($_GET['erreur'] == 'badpass'):
			?>
			<p>Les deux mots de passe ne sont pas identiques </p>
			<?php
		endif;
	?>
	</section>  
<?php
elseif (isset($_GET['success'])):
	?>
	<section class="alert alertGreen">
		<?php
		if ($_GET['success'] == 'updatepseudo'):
			?>	
		    <p>Votre pseudo a bien été mis à jour !</p>
			<?php
		elseif ($_GET['success'] == 'updatemail' ):
			?>
			<p>Votre adresse mail a bien été mise à jour !</p>
			<?php
		elseif ($_GET['success'] == 'updatepass' ):
			?>
			<p>Votre mot de passe a bien été mis à jour !</p>
			<?php
		elseif ($_GET['success'] == 'connexion' ):
			?>
			<p>Bienvenue <?=$_GET['pseudo']?> ! </p>
			<?php
		elseif ($_GET['success'] == 'disconnect' ):
			?>
			<p>Au revoir !</p>
			<?php
		elseif ($_GET['success'] == 'mail' ):
			?>
			<p>Votre Email a été envoyé avec succès ! </p>
			<?php
		elseif ($_GET['success'] == 'addpost' ):
			?>
			<p>Votre article est publié ! </p>
			<?php
		elseif ($_GET['success'] == 'modifypost' ):
			?>
			<p>Votre article a bien été modifié! </p>
			<?php
		elseif ($_GET['success'] == 'updateimage' ):
			?>
			<p>Votre photo de profil a bien été mise à jour! </p>
			<?php
		elseif ($_GET['success'] == 'endgame' ):
			if (!empty($_SESSION['pseudo']) && $reponse['game_two_bs'] == 0 && $_GET['score'] >= 200):
					?>
					<p>Vous avez terminé la partie avec <?= $_GET['score']?> points ! Vous débloquez le jeu suivant !</p>
					<?php
			else:
				?>
				<p>Vous avez terminé la partie avec <?= $_GET['score']?> points ! </p>
				<?php
			endif;
		elseif ($_GET['success'] == 'bye' ):
			?>
			<p>Votre compte a été supprimé! </p>
			<?php
		elseif ($_GET['success'] == 'deletecomment' ):
			?>
			<p>Le commentaire a été supprimé </p>
			<?php
		elseif ($_GET['success'] == 'deleteplayer' ):
			?>
			<p>Le joueur et ses commentaires ont bien été supprimés</p>
			<?php
		endif;
		?>
	</section>  
<?php
endif;
$alertBox = ob_get_clean();
?>

