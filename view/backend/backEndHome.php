<!-- HOME PAGE -->
<?php
$title = 'page principale';
ob_start();
?>
    <section >
        <aside class="leftAside">
        <?php
        while ($donnees = $reponse->fetch())
        {
        ?>
            <img src="<?= $donnees['imageprofil'] ?>">
            <h3> <?= $donnees['pseudo'] ?> </h3>
            <p>Stand-upper depuis le <?= $donnees['date_inscription'] ?></p>

            <p> Position n° : <?= $donnees['id'] ?> </p>
            <nav>
                <ul>
                    <li><a href="">Changer mon pseudo</a></li>
                    <li><a href="">Changer mon mot de passe </a></li>
                    <li><a href="">Changer mon adresse mail</a></li>
                    <li><a href="">Changer mon chat</a></li>
                    <li><a href="">Supprimer mon compte</a></li>
                </ul>
            </nav>
        <?php
        }
        $reponse->closeCursor(); // Termine le traitement de la requête
        ?>
        </aside>


        <article class="centerArticle">
            <div class="startGame">
                <a href="game1/index.html"> 
                    <img src="public/img/g10.jpg">
                    <div class="titleBtn">Commencer la partie</div>
                    <div class="panel"> 
                        <h3> Finger in the noise</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </a>
            </div>

            <div class="startGame">
                <a href="game1/index.html"> 
                    <img src="public/img/g10.jpg">
                    <div class="titleBtn">Commencer la partie</div>
                    <div class="panel"> 
                        <h3> Finger in the noise</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </a>
            </div>            
            <div class="startGame">
                <a href="game1/index.html"> 
                    <img src="public/img/g10.jpg">
                    <div class="titleBtn">Commencer la partie</div>
                    <div class="panel"> 
                        <h3> Finger in the noise</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                    </div>
                </a>
            </div>

        </article>
        <aside class="rightAside">
            <div class="chatContainer">
                <h2>--- Chat ---</h2>

                <div class="messageChat">
                    <div class="messageChatTitle">
                        <img src="public/img/assto2.png">
                        <h4>intel</h4>
                        <p>a tel moment</p>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dom.</p>
                </div>
                <div class="messageChat">
                    <div class="messageChatTitle">
                        <img src="public/img/assto2.png">
                        <h4>intel</h4>
                        <p>a tel moment</p>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitat</p>
                </div>

                <div class="messageChat">
                    <div class="messageChatTitle">
                        <img src="public/img/assto2.png">
                        <h4>intel</h4>
                        <p>a tel moment</p>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute i</p>
                </div>
                <div class="messageChat">
                    <div class="messageChatTitle">
                        <img src="public/img/assto2.png">
                        <h4>intel</h4>
                        <p>a tel moment</p>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute i</p>
                </div>  
                <div class="messageChat">
                    <div class="messageChatTitle">
                        <img src="public/img/assto2.png">
                        <h4>intel</h4>
                        <p>a tel moment</p>
                    </div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute i</p>
                </div>      
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
    </section> 

<?php 

$content = ob_get_clean();
require ('templatebackend.php'); 
?>
