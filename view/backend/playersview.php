<!-- Show all the players informations sort by name, score, ... -->
<?php
$title = 'Tous les joueurs';
ob_start();
include ('view/backend/asideLeft.php');
echo $asideLeft;
?>

<section class="playersViewSection">  
    <table>
        <tr class="titleTable">
            <?php
            if (isset($_GET['order']) && $_GET['order'] == "antichrono"):
            ?>
               <th class='imgTD'><i class="fas fa-chevron-down"></i></th>
               <th id="positionTD"><a href="index.php?action=playersview&sortby=scoretotal&order=chrono&page=0">Position</a></th>
               <th><a href="index.php?action=playersview&sortby=pseudo&order=chrono&page=0">
               Pseudo</a></th>
               <th class='scoreTD'><a href="index.php?action=playersview&sortby=scoreone&order=chrono&page=0">Meilleur score jeu 1</a></th>
               <th class='scoreTD'><a href="index.php?action=playersview&sortby=scoretwo&order=chrono&page=0">Meilleur score jeu 2</a></th>
               <th class="totalScoreTD"><a href="index.php?action=playersview&sortby=scoretotal&order=chrono&page=0">
               Nombre total de points</a></th>
               <?php
                if ($reponse['authority'] == 1):
                ?>
                    <th>Admin </th>
                <?php
                endif;


            elseif (!isset($_GET['order']) || $_GET['order'] == "chrono"):
            ?>   
               <th class='imgTD'><i class="fas fa-chevron-up"></i></th>
               <th id="positionTD"><a href="index.php?action=playersview&sortby=scoretotal&order=antichrono&page=0">Position</a></th>
               <th><a href="index.php?action=playersview&sortby=pseudo&order=antichrono&page=0">Pseudo</a></th>
               <th class='scoreTD'><a href="index.php?action=playersview&sortby=scoreone&order=antichrono&page=0">Meilleur score jeu 1</a></th>
               <th class='scoreTD'><a href="index.php?action=playersview&sortby=scoretwo&order=antichrono&page=0">Meilleur score jeu 2</a></th>
               <th class="totalScoreTD"><a href="index.php?action=playersview&sortby=scoretotal&order=antichrono&page=0">Nombre total de points</a> </th>
               <?php
                if ($reponse['authority'] == 1):
                ?>
                    <th>Admin </th>
                <?php
                endif;
            endif;
        ?>    
        </tr>
    <?php

    foreach ($rep as $row => $data):
        $position = $userManager->getUserPosition($data['game_total']);
        ?>
        <tr
        <?php
        //DIFFERENT COLOR FOR THE PLAYER LINE IN THE TAB
        if ($data['pseudo'] == $_SESSION['pseudo']):
            echo "style=\"background: rgba(253, 216, 53, 0.7);\"";
            endif; ?>                  
        >
        <td class='imgTD'> <img src="<?=$data['imageprofil'] ?>"></td>
        <td id="positionTD"><?=$position + 1 ?></td>            
        <td id='pseudoTD'><?=$data['pseudo'] ?></td>
        <td class='scoreTD'><?=$data['game_one_bs'] ?></td>
        <td class='scoreTD'><?=$data['game_two_bs'] ?></td>
        <td class="totalScoreTD"><?=$data['game_total'] ?></td>

        <?php
        if ($reponse['authority'] == 1 && $data['authority'] != 1):
        ?>
            <td>
                <a href="index.php?action=seecomments&id=<?=$data['id'] ?>">Voir les commentaires</a>
                </br>
                <a style="color:red;" href="index.php?action=adminDeleteAccount&id=<?=$data['id'] ?>" 
                  onclick="return confirm('Êtes vous sûr de vouloir supprimer ce compte ?\nCette action est irréversible')">Supprimer ce compte
                </a> 
            </td>
        <?php
        else: echo ("<td></td>");
        endif;
        ?>
        </tr>
        <?php
    endforeach;
    ?>
    </table>
    <div class="paginationDiv">
        <?php 
            $nbrPage = floor($nbrOfPlayers/7);

        if ($_GET['page'] > 0):
            ?>
            <a class="btnPagination" href="index.php?action=playersview&sortby=<?=$_GET['sortby']?>&order=<?=$_GET['order']?>&page=<?=$_GET['page']- 1?>">Page précédente</a>
            <?php
        else: ?> <a class="btnPagination forbidenBtn" href="javascript:">Page précédente</a>
            <?php
        endif;

        ?>
        <div>
        <?php
        // Show a number for each page with a special style for the current page
            for ($i=0; $i <= $nbrPage; $i++):
                if ($i == $_GET['page']):
                    ?>
                    <a style="font-weight:bold; font-size: 18px;" href="index.php?action=playersview&sortby=<?=$_GET['sortby']?>&order=<?=$_GET['order']?>&page=<?= $i ?>"><?= $i+1 ?></a>
                <?php
                else:
                    ?>
                <a href="index.php?action=playersview&sortby=<?=$_GET['sortby']?>&order=<?=$_GET['order']?>&page=<?= $i ?>"><?= $i+1 ?></a>
                <?php
                endif;
            endfor;
        ?>
        </div>
        <?php

        if($_GET['page'] <= $nbrPage-1):
            ?>
            <a class="btnPagination" href="index.php?action=playersview&sortby=<?=$_GET['sortby']?>&order=<?=$_GET['order']?>&page=<?=$_GET['page']+1?>">Page suivante</a>
            <?php
            else: ?> <a class="btnPagination forbidenBtn" href="javascript:">Page suivante</a>
            <?php
        endif;
        ?>
    </div>
</section>  
<?php
$content = ob_get_clean();
require ('templatebackend.php');
?>
