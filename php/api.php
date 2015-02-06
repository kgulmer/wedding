<?php

include("embed/resize-class.php");
include("connect.php");

if($_POST['type'] == 'login'){
	$username = $_POST['username'];
	$order = "SELECT user_password, user_firstname, user_lastname, user_email FROM user WHERE user_username = '".$username."'";
	$result = mysql_query($order, $db1);
	while($row = mysql_fetch_assoc($result)){$data[] = $row;}
	echo json_encode($data);
}

elseif($_POST['type'] == 'account'){
	$username = $_POST['username'];
	$password = $_POST['new_password'];
	$firstname =  $_POST['firstname'];
	$lastname =  $_POST['lastname'];
	$email = $_POST['email'];
	if($password != ''){$order = "UPDATE user SET user_password = '".md5($password)."', user_firstname = '".$firstname."', user_lastname = '".$lastname."', user_email = '".$email."' WHERE user_username = '".$username."'";}
	else{$order = "UPDATE user SET user_firstname = '".$firstname."', user_lastname = '".$lastname."', user_email = '".$email."' WHERE user_username = '".$username."'";}
	mysql_query($order, $db1);
	echo json_encode($order);
}

elseif($_POST['type'] == 'blog'){
	if (isset($_POST['blog_key']) && !empty($_POST['blog_key'])) {$filter = 'WHERE blog_key = '.$_POST['blog_key'];}
	else{$filter = '';}
	$order = "SELECT 
		blog_key, blog_title, blog_text, blog_images, blog_timestamp, blog_pin, user_firstname, user_lastname, user_email	
		FROM blog LEFT JOIN user ON blog_user_key = user_key ".$filter." ORDER BY blog_pin DESC, blog_timestamp DESC LIMIT 0,20";
		
	$result = mysql_query($order, $db1);
	while($row = mysql_fetch_assoc($result)){$data[] = $row;}
	echo json_encode($data);
}

elseif($_POST['type'] == 'edit'){
	
	$blog_key = $_POST['edit_post_key'];
	$blog_title = $_POST['edit_post_title'];
	$blog_text = mysql_real_escape_string($_POST['edit_post_text']);
	
	$order = "UPDATE blog SET blog_title = '".$blog_title."', blog_text = '".$blog_text."' WHERE blog_key = '".$blog_key."'";;
		
	mysql_query($order, $db1);
	echo json_encode(true);
}

elseif($_POST['type'] == 'delete'){
	
	//delete any images associated with the post
	$blog_key = $_POST['blog_key'];
	$upload_path = '../img/blog/';
	$order = "SELECT blog_images FROM blog WHERE blog_key = '".$blog_key."'";
	$result = mysql_query($order, $db1);
	while($row = mysql_fetch_assoc($result)){$images[] = $row;}
	if($images){
		$images = $images[0]['blog_images'];
		$images = explode(",",$images);
		$len = count($images);
		for($i=0; $i<$len; $i++) {
			unlink($upload_path.$images[$i]);
			unlink($upload_path.preg_replace('/\\.[^.\\s]{3,4}$/', '',$images[$i])."_thumb.gif");
		}
	}
	
	//delete the post from SQL
	$order = "DELETE FROM blog WHERE blog_key = '".$blog_key."'";
	mysql_query($order, $db1);
	echo json_encode(true);
}

elseif($_POST['type'] == 'pin'){
	
	$blog_key = $_POST['blog_key'];
	$order = "SELECT blog_pin FROM blog WHERE blog_key = '".$blog_key."'";
	$result = mysql_query($order, $db1);
	while($row = mysql_fetch_assoc($result)){$pin_check[] = $row;}
	
	if($pin_check[0]['blog_pin'] > 0){
		$order = "UPDATE blog SET blog_pin = NULL WHERE blog_key = '".$blog_key."'";
	}
	
	else{
		$order = "SELECT MAX(blog_pin) AS blog_pin FROM blog";
		$result = mysql_query($order, $db1);
		while($row = mysql_fetch_assoc($result)){$pin[] = $row;}
		$last = $pin[0]['blog_pin'];
		$current = $last + 1;
		$order = "UPDATE blog SET blog_pin = '".$current."' WHERE blog_key = '".$blog_key."'";
	}
	
	mysql_query($order, $db1);
	echo json_encode(true);
}


elseif($_POST['type'] == 'progress'){
	$order = "SELECT progress_upload FROM progress";
	$result = mysql_query($order, $db1);
	while($row = mysql_fetch_assoc($result)){$data[] = $row;}
	
	if($data[0]['progress_upload'] == 100){
		$order = "UPDATE progress SET `progress_upload`=0";
		mysql_query($order, $db1);		
	}
	
	echo json_encode($data);
}

elseif($_POST['type'] == 'post'){
	
	$order = "UPDATE progress SET `progress_upload`=0";
	mysql_query($order, $db1);
	
	//check for images and create thumbnails as necessary
	$filename = $_FILES['post_images']['name'];
	if($filename[0] != ''){
		$upload_path = '../img/blog/';
		$order = "SELECT MAX(blog_images) AS blog_images FROM blog";
		$result = mysql_query($order, $db1);
		while($row = mysql_fetch_assoc($result)){$images[] = $row;}
		$last = $images[0]['blog_images'];
		$last = explode(",",$last);
		$last = end($last);
		$last = preg_replace('/\\.[^.\\s]{3,4}$/', '', $last);
		$current = $last + 1;
		$len = count($filename);
		$images = '';
		for($i=0; $i<$len; $i++) {
			
			$order = "UPDATE progress SET `progress_upload`=".(100*$i/$len);
			mysql_query($order, $db1);
			
			move_uploaded_file($_FILES['post_images']['tmp_name'][$i],$upload_path.($current+$i).".".pathinfo($filename[$i],PATHINFO_EXTENSION));
			$images .= ($current+$i).".".pathinfo($filename[$i],PATHINFO_EXTENSION).",";
			$thumb = preg_replace('/\\.[^.\\s]{3,4}$/', '', ($current+$i));
			$resizeObj = new resize($upload_path.($current+$i).".".pathinfo($filename[$i],PATHINFO_EXTENSION));
			$resizeObj -> resizeImage(150, 150);
			$resizeObj -> saveImage($upload_path.$thumb."_thumb.gif", 300);
		}
		$images = rtrim($images, ',');
		$images = "'".$images."'";
		
	}
	else{$images = "NULL";}
	
	//variables for SQL statement to insert new post
	$title = mysql_real_escape_string($_POST['post_title']);
	$text = mysql_real_escape_string(str_replace("<br>","",$_POST['post_text']));
	$username = $_POST['post_username'];
	$order = "SELECT user_key FROM user WHERE user_username = '".$username."'";
	$result = mysql_query($order, $db1);
	while($row = mysql_fetch_assoc($result)){$users[] = $row;}
	$user_key = $users[0]['user_key'];
	
	$order = "INSERT INTO blog (blog_title, blog_text, blog_images, blog_timestamp, blog_user_key) VALUES ('".$title."','".$text."',".$images.",now(),".$user_key.")";
	mysql_query($order, $db1);
	
	$order = "UPDATE progress SET `progress_upload`=100";
	mysql_query($order, $db1);
	
	echo json_encode(true);
}

?>