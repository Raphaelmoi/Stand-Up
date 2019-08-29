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