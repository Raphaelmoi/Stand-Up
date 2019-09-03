<!-- HOME PAGE -->
<?php
$title = 'Tous les joueurs';
ob_start();

include('view/backend/asideLeft.php');
echo $asideLeft;
?>
    <section class="playersViewSection">  
        <table>
            <tr class="titleTable">
                <?php

                if(isset($_GET['order']) && $_GET['order'] == "antichrono" ){
                ?>
                   <th><i class="fas fa-chevron-down"></i></th>
                   <th><a href="index.php?action=playersview&sortby=scoretotal&order=chrono">Position</a> </th>
                   <th><a href="index.php?action=playersview&sortby=pseudo&order=chrono">Pseudo</a></th>
                   <th><a href="index.php?action=playersview&sortby=scoreone&order=chrono">Meilleur score jeu 1</a></th>
                   <th><a href="index.php?action=playersview&sortby=scoretwo&order=chrono">Meilleur score jeu 2</a></th>
                   <th><a href="index.php?action=playersview&sortby=scoretotal&order=chrono">Nombre total de points</a> </th>
                   <?php
                   if ($reponse['authority'] == 1) {
                    ?>
                   <th>Admin </th>
                    <?php
                    }
                   ?>



                <?php
                }
                elseif(!isset($_GET['order']) || $_GET['order'] == "chrono" ){
                ?>   
                   <th><i class="fas fa-chevron-up"></i></th>
                   <th><a href="index.php?action=playersview&sortby=scoretotal&order=antichrono">Position</a></th>
                   <th><a href="index.php?action=playersview&sortby=pseudo&order=antichrono">Pseudo</a></th>
                   <th><a href="index.php?action=playersview&sortby=scoreone&order=antichrono">Meilleur score jeu 1</a></th>
                   <th><a href="index.php?action=playersview&sortby=scoretwo&order=antichrono">Meilleur score jeu 2</a></th>
                   <th><a href="index.php?action=playersview&sortby=scoretotal&order=antichrono">Nombre total de points</a> </th>
                   <?php
                   if ($reponse['authority'] == 1) {
                    ?>
                   <th>Admin </th>
                    <?php
                    }
                   ?>
                <?php
                }
                ?>    
           </tr>
        <?php    

        while ($data = $rep->fetch())
        {
            $position = $userManager -> getUserPosition($data['game_total']);
        ?>
            <tr
                <?php 
                if ($data['pseudo'] == $_SESSION['pseudo'] ) {
                    echo "style=\"background: rgba(253, 216, 53, 0.7);\"";
                } 
                ?>                  
            >
                <td> <img src="<?= $data['imageprofil']?>"></td>
                <td ><?= $position + 1?></td>            
                <td><?= $data['pseudo']?></td>
                <td><?= $data['game_one_bs']?></td>
                <td><?= $data['game_two_bs']?></td>
                <td><?= $data['game_total']?></td>

                   <?php
                   if ($reponse['authority'] == 1) {
                    ?>
                   <td>
                    <a href="index.php?action=seecomments&id=<?= $data['id']?>">Voir les commentaires</a>
                    </br>
                            <a style="color:red;" href="index.php?action=adminDeleteAccount&id=<?= $reponse['id']?>" 
                          onclick="return confirm('Êtes vous sûr de vouloir supprimer ce compte ?\nCette action est irréversible')">
                          Supprimer ce compte
                        </a> 
                  </td>
                    <?php
                    }
                   ?>
            </tr>
            <?php 
            }
            ?>
        </table>

    </section>  
<?php
$content = ob_get_clean();
require ('templatebackend.php'); 
?>
