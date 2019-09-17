<?php
// Show the signin form  
ob_start();
?>
    <script>
        //determine how many cats have to be shown according to screen size
        if (window.innerWidth >= 1000) { CatApi.getTheCats(6); }
        else if (window.innerWidth >= 600) { CatApi.getTheCats(5); }
        else if (window.innerWidth >= 400) { CatApi.getTheCats(3); }
        else{ CatApi.getTheCats(2);}
    </script>

    <header id="headerConnexion">
        <div class="connect">
            <div id='backBtn'>
                <a href="index.php">retour</a>
            </div>
            <div>
                <a href="index.php?action=signup">Inscription</a>
            </div>
            <div>
                <a href="index.php?action=signin">
                    <i class="fas fa-user"></i>Connexion
                </a>                
            </div>
        </div>
        <form class="inscriptionBox" action='index.php?action=inscription' method="post">
            <h2>S'inscrire</h2>
            <input type="name" name="name" placeholder="Pseudo">
            <input type="mail" name="mail" placeholder="adresse email">
            <input type="password" name="pass" placeholder="mot de passe">
            <input type="password" name="passTwo" placeholder=" Confirmez mot de passe">
            <div id="boxImg"></div>
            <input type="hidden" name="imageUrl" id="hiddenInputInscription" value="">
            <input class="btnFormValidate" type="submit" name="submit" value="Inscription">
        </form>
        <div id="triangleYellow" class="connectTY"></div>
        <div id='triangleTranspa' class='connectTT'></div>
    </header>
<?php
$signUpForm = ob_get_clean();
?>
