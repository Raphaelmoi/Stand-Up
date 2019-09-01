function reloadChat () {
	if ($('#refreshAside') != null) {
    	$('#refreshAside').load('chatMessenger.php');

    	console.log('aaa');
	}
}
var timeout = setInterval(reloadChat, 5000);
