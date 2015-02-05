function beer(){
	if(page_order.indexOf('beer') > page_order.indexOf(window.location.hash.substring(1, window.location.hash.length))){out_direction = 'left'; in_direction = 'right';}
	else{out_direction = 'right'; in_direction = 'left';}
	$.when($('#content').hide('slide', {direction: out_direction}, 500)).done(function(){
		$('#content').html("<center><h1>&nbsp</h1></center>"+
		"<div id='menu' style='padding-left: 50px; margin-top: -50px;'>"+
		"<img src='img/beer1.png' title='' style='padding-top: 15px;'/>"+
		"<img src='img/beer2.png' title='' style='padding-top: 15px;'/>"+
		"<img src='img/beer3.png' title='' style='padding-top: 15px;'/>"+
		"<img src='img/beer4.png' title='' style='padding-top: 15px;'/>"+
		"<img src='img/beer5.png' title='' style='padding-top: 15px;'/>"+
		"</div>");
		var dockOptions = { align: 'left' , size: 60};
		$('#menu').jqDock(dockOptions);
		$('#content').show('slide', {direction: in_direction}, 500);
		
	});
}

function brewery(){
	if(page_order.indexOf('brewery') > page_order.indexOf(window.location.hash.substring(1, window.location.hash.length))){out_direction = 'left'; in_direction = 'right';}
	else{out_direction = 'right'; in_direction = 'left';}
	$.when($('#content').hide('slide', {direction: out_direction}, 500)).done(function(){
		$('#content').html("<center><h1>&nbsp</h1>"+
		"<div class='post'><center><br>Under construction<br><br></div></center>");
		$('#content').show('slide', {direction: in_direction}, 500);
	});
}

function tap(){
	if(page_order.indexOf('tap') > page_order.indexOf(window.location.hash.substring(1, window.location.hash.length))){out_direction = 'left'; in_direction = 'right';}
	else{out_direction = 'right'; in_direction = 'left';}
	$.when($('#content').hide('slide', {direction: out_direction}, 500)).done(function(){
		$('#content').html("<center><h1>The Taproom</h1></center>");
		$('#content').show('slide', {direction: in_direction}, 500);
	});
}

function brew(){
	if(page_order.indexOf('brew') > page_order.indexOf(window.location.hash.substring(1, window.location.hash.length))){out_direction = 'left'; in_direction = 'right';}
	else{out_direction = 'right'; in_direction = 'left';}
	$.when($('#content').hide('slide', {direction: out_direction}, 500)).done(function(){
		$('#content').html("<center><h1>Where It's Made</h1></center>");
		$('#content').show('slide', {direction: in_direction}, 500);
	});
}

function office(){
	if(page_order.indexOf('office') > page_order.indexOf(window.location.hash.substring(1, window.location.hash.length))){out_direction = 'left'; in_direction = 'right';}
	else{out_direction = 'right'; in_direction = 'left';}
	$.when($('#content').hide('slide', {direction: out_direction}, 500)).done(function(){
		$('#content').html("<center><h1>The Office</h1></center>");
		$('#content').show('slide', {direction: in_direction}, 500);
	});
}

function about(){
	if(page_order.indexOf('about') > page_order.indexOf(window.location.hash.substring(1, window.location.hash.length))){out_direction = 'left'; in_direction = 'right';}
	else{out_direction = 'right'; in_direction = 'left';}
	$.when($('#content').hide('slide', {direction: out_direction}, 500)).done(function(){
		$('#content').html("<center><h1>About</h1></center>");
		$('#content').show('slide', {direction: in_direction}, 500);
	});
}

function story(){
	if(page_order.indexOf('story') > page_order.indexOf(window.location.hash.substring(1, window.location.hash.length))){out_direction = 'left'; in_direction = 'right';}
	else{out_direction = 'right'; in_direction = 'left';}
	$.when($('#content').hide('slide', {direction: out_direction}, 500)).done(function(){
		$('#content').html("<center><h1>Story</h1></center>");
		$('#content').show('slide', {direction: in_direction}, 500);
	});
}

function mission(){
	if(page_order.indexOf('mission') > page_order.indexOf(window.location.hash.substring(1, window.location.hash.length))){out_direction = 'left'; in_direction = 'right';}
	else{out_direction = 'right'; in_direction = 'left';}
	$.when($('#content').hide('slide', {direction: out_direction}, 500)).done(function(){
		$('#content').html("<center><h1>Our Mission</h1></center>");
		$('#content').show('slide', {direction: in_direction}, 500);
	});
}

function staff(){
	if(page_order.indexOf('staff') > page_order.indexOf(window.location.hash.substring(1, window.location.hash.length))){out_direction = 'left'; in_direction = 'right';}
	else{out_direction = 'right'; in_direction = 'left';}
	$.when($('#content').hide('slide', {direction: out_direction}, 500)).done(function(){
		$('#content').html("<center><h1>Staff</h1></center>");
		$('#content').show('slide', {direction: in_direction}, 500);
	});
}

function contact(){
	if(page_order.indexOf('contact') > page_order.indexOf(window.location.hash.substring(1, window.location.hash.length))){out_direction = 'left'; in_direction = 'right';}
	else{out_direction = 'right'; in_direction = 'left';}
	$.when($('#content').hide('slide', {direction: out_direction}, 500)).done(function(){
		$('#content').html("<center><h1>Contact</h1></center>");
		$('#content').show('slide', {direction: in_direction}, 500);
	});
}

/////////////////////////////
////////BLOG FUNCTIONS///////
/////////////////////////////

function blog(){
	
	if(page_order.indexOf('blog') > page_order.indexOf(window.location.hash.substring(1, window.location.hash.length))){out_direction = 'left'; in_direction = 'right';}
	else{out_direction = 'right'; in_direction = 'left';}
	$.when($('#content').hide('slide', {direction: out_direction}, 500)).done(function(){
		$('#content').html("<center><h1>&nbsp</h1></center>");
		$.when($('#content').show()).done(function(){
			$.ajax({ type: 'POST', url: 'php/api.php', data: "type=blog", dataType: 'json', success: function(data){
				for (i=0; i<data.length; i++){
					var row = data[i];
					
					var key = row['blog_key'];
					var title = '<h1>'+row['blog_title']+'</h1>';
					var text = '<p>'+row['blog_text'];
					if(row['user_email'] != null){var sig = '<p><a href="mailto:'+row['user_email']+'">'+row['user_firstname']+' '+row['user_lastname'].charAt(0)+'. </a><br>'+moment(row['blog_timestamp']).format("M/D/YY h:mm a")+'</p>';}
					else{var sig = '<p>'+row['user_firstname']+' '+row['user_lastname'].charAt(0)+'. <br>'+moment(row['blog_timestamp']).format("M/D/YY h:mm a")+'</p>';}
					var imgs = row['blog_images'];
					if(imgs == null){ 
						var img='';
						var gallery='';
					}
					else{
						imgs = row['blog_images'].split(',');
						var thumb = imgs[0].replace(/\.[^/.]+$/, "")+"_thumb.gif";
						var img = '<a href="img/blog/'+imgs[0]+'" data-lightbox="post_'+i+'"><img class="preview" src="img/blog/'+thumb+'" align="right"></a>';
						var gallery = '';
						for(j=1; j<imgs.length; j++){
							var thumb = imgs[j].replace(/\.[^/.]+$/, "")+"_thumb.gif";
							gallery += '<a href="img/blog/'+imgs[j]+'" data-lightbox="post_'+i+'"><img class="preview" style="max-height: 3rem;" src="img/blog/'+thumb+'"></a>';
						}
					}
					var pin = row['blog_pin'];
					var display = 'display: none;"';
					if(pin > 0){display = '" class="persistent"';}
					if(detectmob()){var style = 'style="margin-left: 5%; margin-right: 5%; display: none;"';} else{ var style = 'style="display: none;"';}
					$('#content').append('<div class="post" name="'+key+'" '+style+'>'+
					title+
					'&nbsp;&nbsp;&nbsp;<img src="img/pin.png" onClick="post_pin('+key+');" style="height: 2em; padding-top: 10px; '+display+'/>'+
					'&nbsp;&nbsp;&nbsp;<img src="img/edit.png" onClick="post_edit('+key+');" style="height: 2em; padding-top: 10px; display: none;"/>'+
					'&nbsp;&nbsp;&nbsp;<img src="img/trash.png" onClick="post_delete('+key+');" style="height: 2em; padding-top: 10px; display: none;"/>'+
					'&nbsp;&nbsp;&nbsp;<img src="img/fb.png" onClick="post_facebook('+key+');" style="height: 2em; padding-top: 10px; display: none;"/>'+
					img+text+sig+'</span>'+gallery+'</div>');					
				}
			$('.post').each(function(i, obj) {
				$(this).delay(50*i).show('slide', {direction: in_direction}, 500);
			});
			}});
		});
	});
}

function post_new(){
	$('#new_post').dialog({ title: "New Post", width: 650, buttons: { "Cancel": function() {$(this).dialog("close");}, "OK": function() {
		$('#blog').prepend('<div class="post"><center><img src="img/embed/loading2.gif" style="margin: 30px; height: 249px; width: 249px;"/></center></div>');
		$('#form_post').submit();
	}}});
}

function post_edit(blog_key){
	$.ajax({ type: 'POST', url: 'php/api.php', data: "type=blog&blog_key="+blog_key, dataType: 'json', success: function(data){
		$('#edit_post_key').val(data[0]['blog_key']);
		$('#edit_post_title').val(data[0]['blog_title']);
		$('#edit_post_text').jqteVal(data[0]['blog_text']);
		$('#edit_post').dialog({ title: "Edit Post", width: 650, buttons: { "Cancel": function() {$(this).dialog("close");}, "OK": function() {
			$('#form_edit_post').submit();
		}}});
	}});
}

function post_delete(blog_key){
	if(admin){
		$('#delete').dialog({ title: "Delete", width: 400, buttons: { "Cancel": function() {$(this).dialog("close");}, "OK": function() {
			$.ajax({ type: 'POST', url: 'php/api.php', data: "type=delete&blog_key="+blog_key, dataType: 'json', success: function(data){
				blog();
			}});
			$(this).dialog("close");
		}}});
	}
}

function post_pin(blog_key){
	if(admin){
		$.ajax({ type: 'POST', url: 'php/api.php', data: "type=pin&blog_key="+blog_key, dataType: 'json', success: function(data){
			blog();
		}});
	}
}

function post_facebook(blog_key){
	console.log(location.href.split('?')[0].split('#')[0]+'?p='+blog_key+'#blog');
	window.open(
	  'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(location.href.split('?')[0].split('#')[0]+'?p='+blog_key+'#blog'),
	  'facebook-share-dialog', 
	  'width=626,height=436'); 
	return false;
}

/////////////////////////////
///////EVENTS FUNCTIONS//////
/////////////////////////////

function events(){
	if(page_order.indexOf('events') > page_order.indexOf(window.location.hash.substring(1, window.location.hash.length))){out_direction = 'left'; in_direction = 'right';}
	else{out_direction = 'right'; in_direction = 'left';}
	$.when($('#content').hide('slide', {direction: out_direction}, 500)).done(function(){
		$('#content').html("<center><h1>Events</h1></center>");
		$('#content').show('slide', {direction: in_direction}, 500);
	});
}