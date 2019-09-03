<!-- HOME PAGE -->
<?php
$title = 'Tous les joueurs';
ob_start();

include ('view/backend/asideLeft.php');
echo $asideLeft;
?>
<script> let colorAside = document.getElementById('leftAsideId').style.background = 'rgba(79, 195, 247, 0.2)'; </script>
    <section class="playersViewSection">  
        

    <div class="mainContentSettings">
      <div class="commentsSettings" >
        <h3>Les commentaires de <?=$reponse['pseudo'] ?></h3>

          <?php
while ($donnees = $comment->fetch())
{
?>
          <p><span>Le <?=$donnees['date_commentaire_fr'] ?> :</span> <?=$donnees['comment'] ?>
          <a href="index.php?action=deletecommentadmin&amp;idmsg=<?=$donnees['id'] ?>&amp;idplayer=<?= $reponse['id'] ?>"
          onclick="return confirm('Êtes vous sûr de vouloir supprimer ce commentaire ?\nCette action est irréversible')"
            >Supprimer ce commentaire</a>
        </p>
          <?php
}
$comment->closeCursor(); // Termine le traitement de la requête

?>
      </div>
    </div>
    </section>  
<?php
$content = ob_get_clean();
require ('templatebackend.php');
?>
