    <h2>--- Chat ---</h2>
    <?php
        while ($data = $comment->fetch())
        {
        ?>
        <div class="messageChat">
            <div class="messageChatTitle">
                <?php
                $user = $userManager -> getUserWithId($data['id_user']);
                ?>
                    <img class="catOfChat" src="<?= $user['imageprofil']?>">
        
                    <div class="infoAboutUser"> 
                        <img src="<?= $user['imageprofil']?>">
                        <div>                    
                            <h4><?= $user['pseudo']?></h4>
                        </div>
                    </div>                    
                    <h4><?= $user['pseudo']?></h4>

                <p><?= $data['date_commentaire_fr']?></p>
            </div>
            <p><?= $data['comment']?></p>
        </div>

        <?php
        }
        $comment->closeCursor(); // Termine le traitement de la requête
        ?>


