    <?php    
        session_start();
        require 'model/UserManager.php';
        require 'model/CommentManager.php';
        $userManager = new userManager(); 
        $reponse = $userManager -> getUser($_SESSION['pseudo']);
        $commentManager = new CommentManager();
        $comment = $commentManager -> getComments();
    ?>
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
                    <img class="catOfChat" src="<?= $user['imageprofil']?>">
        
                    <div class="infoAboutUser"> 
                        <img src="<?= $user['imageprofil']?>">
                        <div>                    
                            <h4><?= $user['pseudo']?></h4>
                        </div>
                    </div>                    
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


