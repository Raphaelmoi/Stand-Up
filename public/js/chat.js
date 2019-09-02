function reloadChat () {
	if ($('#refreshAside') != null) {
    	$('#refreshAside').load('index.php?action=reload');

    	console.log('aaa');
	}
}
var timeout = setInterval(reloadChat, 5000);
