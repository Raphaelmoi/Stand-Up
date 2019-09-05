<!-- CONNECT PAGE form  -->
<?php
$title = 'connexion';
ob_start(); 
?>
<section class="corpConnectPage">
    <form action="index.php?action=isconnected" method="post">
        <h2>Connectez vous</h2>
        <p><br><input type="text" name="connexion_pseudo" placeholder="Pseudo" required ></p>
        <p><br><input type="password" name="connexion_motdepasse" placeholder="mot de passe" required /></p>
        <input type="submit" value="Se connecter" >
    </form> 
</section>       

<?php
$content = ob_get_clean();
require ('template.php'); 
?>
