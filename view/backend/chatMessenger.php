    <h2>--- Chat ---</h2>
    <?php
        $nbrOfComments = 0;
        while ($data = $comment->fetch())
        {
            //maximum of 70 msg in the chat
            if ($nbrOfComments < 70) {
                $nbrOfComments++;
        ?>
        <div class="messageChat">
            <div class="messageChatTitle">
                <?php
                $user = $userManager -> getUserWithId($data['id_user']);
                $position = $userManager -> getUserPosition($user['game_total']);

                ?>
                    <img class="catOfChat" src="<?= $user['imageprofil']?>">
        
                    <div class="infoAboutUser"> 
                        <img src="<?= $user['imageprofil']?>">
                        <div>                    
                            <h4><?= $user['pseudo']?></h4>
                            <p>Niveau <?= ceil($user['game_total']/1000)?> </p>
                            <p>En position n°<?= $position + 1?></p>
                        </div>
                    </div>
                    <div style="display: flex; flex-direction: column;">
                        <h4 ><?= $user['pseudo']?></h4>
                        <p><?= $data['date_commentaire_fr']?></p>                        
                    </div>

            </div>
            <p><?= $data['comment']?></p>
        </div>
        <?php
            }
        }
        $comment->closeCursor(); // Termine le traitement de la requête
        ?>