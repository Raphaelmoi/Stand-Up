<?php
ob_start();
?>

<aside class="rightAside" >
    <div class="chatContainer" id="refreshAside">
        <script> reloadChat();</script>
    </div>

    <div class="messageChat postComment">
        <?php
        $rep = $userManager -> getUser($_SESSION['pseudo']);
        while ($donnees = $rep->fetch())
        {
        ?>
        <div class="messageChatTitle">
            <img src="<?= $donnees['imageprofil'] ?>">
            <h4><?= $donnees['pseudo'] ?></h4>
        </div>
        <form action="index.php?action=postcomment" method="post">
            <input type="hidden" name="id_user" value="<?= $donnees['id'] ?>">
            <textarea name="comm">Saisissez votre commentaire</textarea>
            <input type="submit" name="valide">
        </form>
        <?php
        }
        $rep->closeCursor(); // Termine le traitement de la requête
        ?>
    </div>
</aside>

<?php
$asideRight = ob_get_clean();
?>