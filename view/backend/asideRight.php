<?php
ob_start();
?>
<aside class="rightAside">
    <div class="chatContainer">
        <h2>--- Chat ---</h2>

        <?php
        while ($data = $comment->fetch())
        {
        ?>
        <div class="messageChat">
            <div class="messageChatTitle">
                <?php
                $userInfo = $userManager -> getUserWithId($data['id_user']);
                while ($user = $userInfo->fetch())
                {
                ?>
                    <img src="<?= $user['imageprofil']?>">
                    <h4><?= $user['pseudo']?></h4>
                <?php
                }
                $userInfo->closeCursor(); // Termine le traitement de la requête
                ?>
                <p><?= $data['date_commentaire_fr']?></p>
            </div>
            <p><?= $data['comment']?></p>
        </div>

        <?php
        }
        $comment->closeCursor(); // Termine le traitement de la requête
        ?>
    </div>

    
    <div class="messageChat postComment">
        <div class="messageChatTitle">
            <img src="public/img/assto2.png">
            <h4>GUEST</h4>
        </div>
        <form>
            <textarea>Saisissez votre commentaire</textarea>
            <input type="submit" name="valide">
        </form>
    </div>
</aside>

<?php
$asideRight = ob_get_clean();
?>