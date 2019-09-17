<!-- HOME PAGE -->
<!-- cannot be reach if user is not connected -->
<?php
if (!empty($_SESSION['pseudo'])) {
    $title = 'page principale';
    ob_start();
    ?>
        <section id="backendHome" >
            <?php
            include('view/backend/asideLeft.php');
            echo $asideLeft;

            include('view/backend/mainContent.php');
            echo $mainContent;

            include('view/backend/asideRight.php');
            echo $asideRight;
            ?>
        </section> 
    <?php 
    $content = ob_get_clean();
    require ('templatebackend.php'); 
    }
else{
    header('Location: /projet5/index.php?action=signin');
}
?>
