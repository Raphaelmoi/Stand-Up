<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <link rel="stylesheet" type="text/css" href="public/css/style.css">
        <link rel="stylesheet" type="text/css" href="public/css/styleBackEnd.css">
        <link rel="icon" type="image/x-icon" href="public/img/astroicone.ico" />

        <title>Stand up</title>

        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
        <link href="https://fonts.googleapis.com/css?family=Amatic+SC&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css?family=Open+Sans&display=swap" rel="stylesheet">
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/p5.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.sound.min.js"></script>
        <script src="https://unpkg.com/ml5@0.3.1/dist/ml5.min.js"></script>
        <script
              src="https://code.jquery.com/jquery-3.4.1.min.js"
              integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="
              crossorigin="anonymous"></script>        
        <script src= public/js/messenger.js></script>
        <script src= public/js/ajax.js></script>
        <script src= public/js/catApi.js></script>
    </head>

    <body>
        <header id="smallHeader">
            <div class="connect">
                <div id='backBtn'>
                    <a href="index.php">Accueil</a>
                </div>
                <div>
                    <a href="index.php?action=logout">
                        <i class="fas fa-user"></i>Déconnexion
                    </a>                
                </div>
            </div>
            <h1> Stand up !</h1>
        </header>
            <img src="public/img/assto2.png" class="astroImg" alt="astronaute">    
            <!-- display success or error message -->
            <?php 
            if (isset($_GET['erreur']) || isset($_GET['success'])):
                require_once 'view/frontend/alertBox.php';
                echo $alertBox;
            endif;
        ?> 
        <?= $content ?> 
    </body>
</html>
