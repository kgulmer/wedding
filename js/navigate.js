//$('#nav li a').click(function(){window[$(this).attr('id').replace('menu_','')]();});

var hash = window.location.hash;
var func, num;
if(hash != ''){
	hash = hash.substring(1, hash.length);
	func = hash.split(',')[0];
	num = hash.split(',')[1];
	window[func]();
}
else{
	blog();
	window.location.hash = '#blog';
}