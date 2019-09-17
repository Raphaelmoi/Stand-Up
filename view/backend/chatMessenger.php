<!-- Display the chat with instant messaging -->

<h2>--- Chat ---</h2>
<?php
$nbrOfComments = 0;

foreach ($retourComments as $row => $comment):
    $user = $userManager->getUserWithId($comment['id_user']);
    $position = $userManager->getUserPosition($user['game_total']);

    if ($nbrOfComments < 70):
        $nbrOfComments++;
    endif;
    ?>
    <div class="messageChat">
        <div class="messageChatTitle">
            <img class="catOfChat" src="<?=$user['imageprofil'] ?>">
            <div class="infoAboutUser"> 
                <img src="<?=$user['imageprofil'] ?>">
                <div>                    
                    <h4><?=$user['pseudo'] ?></h4>
                    <p>Niveau <?=ceil($user['game_total'] / 1000) ?> </p>
                    <p>En position n°<?=$position + 1 ?></p>
                </div>
            </div>
            <div style="display: flex; flex-direction: column;">
                <h4 ><?=$user['pseudo'] ?></h4>
                <p><?=$comment['date_commentaire_fr'] ?></p>                        
            </div>
        </div>
        <p><?=$comment['comment'] ?></p>
    </div>
    <?php
endforeach;
?>
