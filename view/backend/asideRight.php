<?php
ob_start();
?>

<aside class="rightAside" >
    <div class="chatContainer" id="refreshAside">
        <script> reloadChat();</script>
    </div>

    <div class="messageChat postComment">
        <div class="messageChatTitle">
            <img src="<?= $reponse['imageprofil'] ?>">
            <h4><?= $reponse['pseudo'] ?></h4>
        </div>
        <form action="index.php?action=postcomment" method="post">
            <input type="hidden" name="id_user" value="<?= $reponse['id'] ?>">
            <textarea name="comm">Saisissez votre commentaire</textarea>
            <input class="btnValideChat" type="submit" name="valide">
        </form>
    </div>
</aside>

<?php
$asideRight = ob_get_clean();
?>