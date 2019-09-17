<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <meta name="description" content="Stand Up!, des jeux fonctionnant grâce à la reconaissance faciale">
        <meta name="keywords" content="jeux, reconaissance faciale">

        <link rel="stylesheet" type="text/css" href="public/css/style.css">
        <link rel="stylesheet" type="text/css" href="public/css/styleFrontEnd.css">
        <link rel="icon" type="image/x-icon" href="public/img/astroicone.ico" />
        <title>Stand up</title>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css?family=Amatic+SC&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.sound.min.js"></script>
        <script src="https://unpkg.com/ml5@0.3.1/dist/ml5.min.js"></script>
        <script src= public/js/ajax.js></script>
        <script src= public/js/catApi.js></script>
    </head>

    <body>
        <!-- display success or error message -->
        <?php 
        if (isset($_GET['erreur']) || isset($_GET['success'])):
            require_once 'alertBox.php';
            echo $alertBox;
        endif;

        require ('view/frontend/headerFrontSide.php');
        echo $header;
        ?>

        <?= $content ?>

        <script  src="public/js/header.js"></script>
    </body>
</html>
