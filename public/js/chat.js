
function reloadChat () {
     $('#refreshAside').load('test.php');
     console.log('aaa');
}
var timeout = setInterval(reloadChat, 5000);
