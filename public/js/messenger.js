//Update the chat every 5 seconds
function reloadChat () {
	if ($('#refreshAside') != null) {
    	$('#refreshAside').load('index.php?action=reload');
	}
}
var timeout = setInterval(reloadChat, 5000);