<?php
/**
 * Contain 
 *getURL() --> produce a clean URL for navigation beetwen page on the asideView without changing the current page
 *formateArticle -> take off img and iframe from previews of article
 *sendAMail ->well, send a mail for the contact page
 *imageUploader -> uploadimage, from tiny.js and from nouveaubillet.php and modifyBillet.php
 */
class UtiController {
	//get current Url and return a formated URL where we can easily add a $_GET['page']
	function getUrl() {
		$protocol = strpos(strtolower($_SERVER['SERVER_PROTOCOL']) , 'https') === false ? 'http' : 'https';

		$host = $_SERVER['HTTP_HOST'];
		$script = $_SERVER['SCRIPT_NAME'];
		$params = $_SERVER['QUERY_STRING'];

		$currentUrl = $protocol . '://' . $host . $script . '?' . $params;

		if (preg_match("#\?page=[0-9]#", $currentUrl)) {
			$currentUrl = preg_replace("#\?page=[0-9]#", '?', $currentUrl);
		}
		elseif (preg_match("#page=[0-9]#", $currentUrl)) {
			$currentUrl = preg_replace("#page=[0-9]#", '', $currentUrl);
		}
		elseif (preg_match("#&page=[0-9]#", $currentUrl)) {
			$currentUrl = preg_replace("#&page=[0-9]#", '&', $currentUrl);
		}
		else {
			$currentUrl = $currentUrl . '&';
		}
		return $currentUrl;
	}
	//image and video are delete from the preview of article
	//The content is limited depend of the size screen
	function formateArticle($ContenuBillet){
		//delete img and video from preview
	    if(preg_match("/<img[^>]+\>/i", $ContenuBillet)) {
	        $ContenuBillet = preg_replace("/<img[^>]+\>/i", "", $ContenuBillet); 
	    }
	    if(preg_match("/<iframe[^>]+\>/i", $ContenuBillet)) {
	         $ContenuBillet = preg_replace("/<iframe[^>]+\>/i", "", $ContenuBillet); 
	    }
	   	//display preview
	   	$ContenuBillet = substr($ContenuBillet, 0, 520).'...'; 		
	    return $ContenuBillet;
	}	
	//send mail
	function sendAMail($name, $mail, $tel, $msg){
		//will drop to the actual mail of user in case he change mail in settings
		$connexionManager = new UserManager();
	    $req = $connexionManager -> getUser($_SESSION['pseudo']);
		while ($donnees = $req->fetch())
			{
			$userMail = $donnees['email'];
		    $name = 'nom : ' . $name;
		    $tel = 'telephone : ' . $tel ;
		    ini_set( 'display_errors', 1 ); 
		    error_reporting( E_ALL );
		    $from = $mail;	 
		    $to = $userMail;
		    echo $userMail;
		    $subject =  "Message depuis le site de Jean Forteroche";
		    $message = $name ."\n". $tel ."\n". $msg;
		    $headers = "From:" . $from;
		    mail($to,$subject,$message, $headers);
		}
	}
	//upload Image and return the URL where is upload the image
	function imageUploader(){
        $accepted_origins = array("https://localhost");
        // Images upload path
        $imageFolder = "public/images/";
        reset($_FILES);
        $temp = current($_FILES);
        if(is_uploaded_file($temp['tmp_name'])){
            if(isset($_SERVER['HTTPS_ORIGIN'])){
                // Same-origin requests won't set an origin. If the origin is set, it must be valid.
                if(in_array($_SERVER['HTTPS_ORIGIN'], $accepted_origins)){
                    header('Access-Control-Allow-Origin: ' . $_SERVER['HTTPS_ORIGIN']);
                }else{
                    header("HTTPS/1.1 403 Origin Denied");
                    return;
                }
            }
            // Sanitize input
            if(preg_match("/([^\w\s\d\-_~,;:\[\]\(\).])|([\.]{2,})/", $temp['name'])){
                header("HTTPS/1.1 400 Invalid file name.");
                return;
            }          
            // Verify extension
            if(!in_array(strtolower(pathinfo($temp['name'], PATHINFO_EXTENSION)), array("gif", "jpg", "png"))){
                header("HTTPS/1.1 400 Invalid extension.");
                return;
            }
            // Accept upload if there was no origin, or if it is an accepted origin
            $filetowrite =  $imageFolder . $temp['name'];
            move_uploaded_file($temp['tmp_name'],$filetowrite);  
            // Respond to the successful upload with JSON.
            echo json_encode(array('location' => $filetowrite));

        } else {
            // Notify editor that the upload failed
            header("HTTPS/1.1 500 Server Error");
        }
        return $filetowrite;
    }
}