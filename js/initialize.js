$( '#nav li:has(ul)' ).doubleTapToGo();

$('#container').scroll(function(){
      if ($(this).scrollTop() > 230) {
		  if(detectmob()){$('#nav').addClass('fixed_mobile');}
          else{$('#nav').addClass('fixed');}
      } else {
          $('#nav').removeClass('fixed_mobile');
          $('#nav').removeClass('fixed');
      }
  });
  
shortcut.add('ALT+L', function() {login();});
shortcut.add('CTRL+Q', function() {login();});
shortcut.add('ALT+N', function() {if(admin){post_new();}});

$(document).ready(function (e){
	
	//check for login/password cookies
	if(typeof($.cookie('username')) != 'undefined'){
		username = $.cookie('username');
		password = $.cookie('password');
		$.ajax({ type: 'POST', url: 'php/api.php', data: "type=login&username="+username, dataType: 'json', success: function(data){
			if ($.cookie('password') == data[0]['user_password']){
				login_check(username, password, data);}
		}});
	}
	
	//turns all textarea into formattable text area
	$("textarea").jqte({p: false});
	
	//log in AJAX
	$("#form_login").on('submit',(function(e){
		$(this).closest(".ui-dialog-content").dialog("close");
		e.preventDefault();
		username = $('#username').val();
		password = md5($('#password').val());
		$.ajax({url: "php/api.php", type: "POST", data:  new FormData(this), contentType: false, cache: false, processData:false, dataType: 'json', success: function(data){
			if (password == data[0]['user_password']){
				login_check(username, password, data);
			}
			else{alert('Incorrect Username or Password!');}
		}});
	}));
	
	//new post AJAX
	$("#form_post").on('submit',(function(e){
		$(this).closest(".ui-dialog-content").dialog("close");
		e.preventDefault();
		$.ajax({url: "php/api.php", type: "POST", data:  new FormData(this), contentType: false, cache: false, processData:false, dataType: 'json', success: function(data){
				main();
		}});
	}));
	
	//edit post AJAX
	$("#form_edit_post").on('submit',(function(e){
		$(this).closest(".ui-dialog-content").dialog("close");
		e.preventDefault();
		$.ajax({url: "php/api.php", type: "POST", data:  new FormData(this), contentType: false, cache: false, processData:false, dataType: 'json', success: function(data){
			console.log(data);
				main();
		}});
	}));
	
	//account edit AJAX
	$("#form_edit_account").on('submit',(function(e){
		$(this).closest(".ui-dialog-content").dialog("close");
		e.preventDefault();
		if($('#password_old').val() == '' || md5($('#password_old').val()) == password){
			$.ajax({url: "php/api.php", type: "POST", data:  new FormData(this), contentType: false, cache: false, processData:false, dataType: 'json', success: function(data){
					if(md5($('#password_old').val()) == password){login();}
					main();
			}});
		}
		else{alert('Wrong password');}
	}));
	
	//click menu for admin gear
	$(function(){
		$.contextMenu({
			selector: '#settings', 
			trigger: 'left',
			callback: function(key, options) {
				if(key=='new'){post_new();}
				if(key=='edit'){edit_account();}
				else if(key=='quit'){login();}
			},
			items: {
				"new": {name: "New Post", icon: "add"},
				"edit": {name: "Edit Account", icon: "edit"},
				"sep1": "---------",
				"quit": {name: "Log Out", icon: "quit"}
			}
		});
	});

	$('body').delegate('.post', 'click', function(){
		if(admin){
			for(i=0; i<=3; i++){
				if($(this).find('img:eq('+i+')').attr('class') != 'persistent'){
					if($(this).find('img:eq('+i+')').is(":hidden")){$(this).find('img:eq('+i+')').fadeIn();}
					else{$(this).find('img:eq('+i+')').fadeOut();}
				}
			}
		}
	});
	
	if(detectmob()){
		$('#footer').hide();
		$('#container').css({'left':'0', 'width':'100%'});
	}
	
});

function login(){
	if(typeof($.cookie('username')) != 'undefined'){ $.removeCookie('username'); $.removeCookie('password'); location.reload(); }
	else{$('#login').dialog({ title: "Log In", buttons: { "Cancel": function() {$(this).dialog("close");}, "OK": function() {
		$('#form_login').submit();
	}}});}
}

function login_check(username, password, data){
	admin = true;
	$('#post_username').val(username);
	$('#edit_username').val(username);
	$('#edit_firstname').val(data[0]['user_firstname']);
	$('#edit_lastname').val(data[0]['user_lastname']);
	$('#edit_email').val(data[0]['user_email']);
	$.cookie('username', username, {expires: 365});
	$.cookie('password', password, {expires: 365});
	$('#header').append('<span style="position: absolute; top: 1%; right: 1%;">Welcome back, '+data[0]['user_firstname']+'</span>');
	$('#footer').append('<img id="settings" src="img/gear.png" width=30px height=30px style="position: fixed; right: 11%; bottom: 1%;"/></span>');
}

function edit_account(){
	$('#edit_account').dialog({ title: "Edit Account", width: 350, buttons: { "Cancel": function() {$(this).dialog("close");}, "OK": function() {
		$('#form_edit_account').submit();
	}}});
}

function detectmob() { //detect if browser is mobile 
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {return true;}
	else {return false;}
}