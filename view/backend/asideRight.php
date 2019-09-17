<?php
// Container of the chat, instant messaging
ob_start();
?>
<aside class="rightAside" >
    <div class="chatContainer" id="refreshAside">
        <script> reloadChat();</script>
    </div>

    <div class="messageChat postComment">
        <div class="messageChatTitle">
            <img src="<?= $reponse['imageprofil'] ?>">
            <h4 style="line-height: 35px;"><?= $reponse['pseudo'] ?></h4>
        </div>

        <form action="index.php?action=postcomment" method="post">
            <input type="hidden" name="id_user" value="<?= $reponse['id'] ?>">
            <textarea name="comm" id="textareaChat" placeholder="Saisissez votre commentaire" required></textarea>
            <div id='errorvalidate'></div>
            <div class="btnValideChat">
                <input  type="submit" name="valide" value="">  
                <i class="fas fa-paper-plane fa-lg"></i> 
            </div>
        </form>
        
    </div>
</aside>
<?php
$asideRight = ob_get_clean();
?>