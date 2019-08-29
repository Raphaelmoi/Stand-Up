<!-- HOME PAGE -->
<?php
$title = 'page principale';
ob_start();
?>
    <section id="backendHome" >
        <?php
        include('view/backend/asideLeft.php');
        echo $asideLeft;
        ?>

        <?php
        include('view/backend/mainContent.php');
        echo $mainContent;
        ?>
        <?php
        include('view/backend/asideRight.php');
        echo $asideRight;
        ?>
    </section> 
<?php 

$content = ob_get_clean();
require ('templatebackend.php'); 
?>
