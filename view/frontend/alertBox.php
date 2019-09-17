<!-- Show error message or success message for $_GET['erreur'] et $_GET['success']  -->
<?php
ob_start();
if (isset($_GET['erreur'])):
	?>
	<section class="alert alertRed">
		<?php
		switch ($_GET['erreur']):
			case 'identifiant':
				echo ('<p>Votre pseudo ou votre mot de passe est incorrect</p>');
				break;
			case 'mailbadsyntax':
				echo "<p>Le nouveau mail n'est pas au bon format.</p>";
				break;
		    case 'badmailfrombbd':
				echo "<p>L'ancien mail n'est pas le bon.</p>";
				break;
			case 'badmail':
				echo "<p>Votre email a une mauvaise syntaxe</p>";
				break;
			case 'mailnotdb':
				echo "<p>Aucun compte n'est enregistré avec cette adresse email</p>";
				break;
			case 'passpseudo':
			    echo "<p>Vous avez saisi un mauvais pseudo ou mot de passe</p>";
			    break;
			case 'diffpseudo':
				echo "<p>Vous avez saisie deux fois le même pseudo </p>";
				break;
			case 'samepw':
				echo "<p>Vous avez saisie deux fois le même mot de passe </p>";
				break;
			case 'sessionexist':
				echo "<p>Vous êtes déjà connecté </p>";
				break;
			case 'diffmail':
				echo "<p>Erreur lors de la confirmation de l'adresse mail </p>";
				break;
			case 'pseudoindb':
				echo "<p>Ce pseudo existe déjà </p></p>";
				break;
			case 'mailalreadydatabase':
				echo "<p>Il y a déjà un compte avec cette adresse mail </p>";
				break;
			case 'badpass':
				echo "<p>Les deux mots de passe ne sont pas identiques </p>";
				break;		
		endswitch	
	?>
	</section>  
<?php
elseif (isset($_GET['success'])):
	?>
	<section class="alert alertGreen">
		<?php
		switch ($_GET['success']):
			case 'updatepseudo':
			    echo('<p>Votre pseudo a bien été mis à jour !</p>');
			    break;
			case 'updatemail':
				echo('<p>Votre adresse mail a bien été mise à jour !</p>');
				break;
			case 'updatepass':
				echo('<p>Votre mot de passe a bien été mis à jour !</p>');
				break;
			case 'connexion':
				echo("<p>Bienvenue ".$_GET['pseudo']." ! </p>");
				break;
			case 'disconnect':
				echo('<p>Au revoir !</p>');
				break;
			case 'mail':
				echo('<p>Votre Email a été envoyé avec succès ! </p>');
				break;
			case 'addpost':
				echo('<p>Votre article est publié ! </p>');
				break;
			case 'modifypost':
				echo('<p>Votre article a bien été modifié! </p>');
				break;
			case 'updateimage':
				echo('<p>Votre photo de profil a bien été mise à jour! </p>');
				break;
			case 'bye':
				echo('<p>Votre compte a été supprimé! </p>');
				break;
			case 'deletecomment':
				echo('<p>Le commentaire a été supprimé </p>');
				break;
			case 'deleteplayer':
				echo('<p>Le joueur et ses commentaires ont bien été supprimés</p>');
				break;
			case 'endgame':
				if (!empty($_SESSION['pseudo']) && $reponse['game_two_bs'] == 0 && $_GET['score'] >= 200):
						echo ('<p>Vous avez terminé la partie avec '. $_GET['score'] .' points ! Vous débloquez le jeu suivant !</p>');
				else:
					echo('<p>Vous avez terminé la partie avec  '.$_GET['score'].' points ! </p>');
				endif;
				break;
				
			endswitch
		?>
	</section>  
<?php
endif;
$alertBox = ob_get_clean();
?>

