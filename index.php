<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width" />
    
    <?php 
		include("php/connect.php");
		if(isset($_GET['p'])) {
		$order = "SELECT 
			blog_key, blog_title, blog_text, blog_images, blog_timestamp, blog_pin, user_firstname, user_lastname, user_email	
			FROM blog LEFT JOIN user ON blog_user_key = user_key WHERE blog_key = ".$_GET['p'];
			
		$result = mysql_query($order, $db1);
		while($row = mysql_fetch_assoc($result)){$data[] = $row;}
	?>
    
    <meta property="og:title" content="<?php echo $data[0]['blog_title']; ?>"/>
    <meta property="og:description" content="<?php echo strip_tags($data[0]['blog_text']); ?>" />
    <?php if($data[0]['blog_images']>0){ ?>
	<meta property="og:image" content="http://www.banginbanjobrewing.com/dev/img/blog/<?php echo substr($data[0]['blog_images'],0,-4);?>_thumb.gif"/><?php } 
	else{ ?>
	<meta property="og:image" content="http://www.banginbanjobrewing.com/dev/img/bbb.png"/>
	<?php } ?>
    <meta property="og:site_name" content="Bangin' Banjo Brewing Company Blog Post"/>
    <meta property="og:type" content="website"/>
    
    <?php } ?>
    
    <link rel="icon" type="image/png" href="favicon.ico">
	<link rel="stylesheet" type="text/css" href="css/stylesheet.css">
	<link rel="stylesheet" type="text/css" href="css/embed/lightbox.css">
	<link rel="stylesheet" type="text/css" href="css/embed/jquery.contextMenu.css">
	<link rel="stylesheet" type="text/css" href="css/embed/jquery-ui.min.css">
	<link rel="stylesheet" type="text/css" href="css/embed/jquery-te-1.4.0.css">
	<script src="js/embed/jquery-1.11.0.min.js"></script>
	<script src="js/embed/jquery-ui.min.js"></script>
	<script src="js/embed/jquery.contextMenu.js"></script>
	<script src="js/embed/jquery.form.min.js"></script>
	<script src="js/embed/jquery.jqDock.min.js"></script>
	<script src="js/embed/jquery-te-1.4.0.min.js"></script>
	<script src="js/embed/jquery.cookie.js"></script>
	<script src="js/embed/lightbox.min.js"></script>
	<script src="js/embed/doubletaptogo.js"></script>
	<script src="js/embed/moment.min.js"></script>
	<script src="js/embed/combodate.js"></script>
	<script src="js/embed/shortcut.js"></script>
	<script src="js/embed/md5.js"></script>
	<title>Hannah and Kyle's Wedding</title>
    
</head>

<body>
    <div id="login" style="display: none;">
        <form id="form_login">
            <table>
            <tr><td>Username: </td><td><input id="username" name="username"/></td></tr>
            <tr><td>Password: </td><td><input type='password' id="password" name="password"/></td></tr>
            <input type="hidden" name="type" value="login"/>
            <input type="submit" style="display: none;">
            </table>
        </form>
    </div>
    <div id="edit_account" style="display: none;">
        <form id="form_edit_account">
            <table>
            <tr><td>Old Password: </td><td><input type='password' id="password_old"/></td></tr>
            <tr><td>New Password: </td><td><input type='password' id="password_new_1"/></td></tr>
            <tr><td>New Password: </td><td><input type='password' id="password_new_2" name="new_password"/></td></tr>
            <tr><td>First Name: </td><td><input id="edit_firstname" name="firstname"/></td></tr>
            <tr><td>Last Name: </td><td><input id="edit_lastname" name="lastname"/></td></tr>
            <tr><td>Email: </td><td><input type="email" id="edit_email" name="email"/></td></tr>
            <input type="hidden" id="edit_username" name="username"/>
            <input type="hidden" name="type" value="account"/>
            <input type="submit" style="display: none;">
            </table>
        </form>
    </div>
    <div id="new_post" style="display: none;">
        <form id="form_post">
            <table>
            <tr><td width=100px>Post Title: </td><td><input name="post_title" style="width: 100%;"/></td></tr>
            <tr><td colspan=2><textarea id="post_text" name="post_text" style="width: 100%; height: 300px;"></textarea></td></tr>
            <tr><td colspan=2>Upload Images (<20mb): <input type="file" name="post_images[]" multiple/></td></tr>
            <input type="hidden" name="type" value="post"/>
            <input type="hidden" id="post_username" name="post_username"/>
            <input type="submit" style="display: none;">
            </table>
        </form>
    </div>
    <div id="edit_post" style="display: none;">
        <form id="form_edit_post">
            <table>
            <tr><td width=100px>Post Title: </td><td><input id="edit_post_title" name="edit_post_title" style="width: 100%;"/></td></tr>
            <tr><td colspan=2><textarea id="edit_post_text" name="edit_post_text" style="width: 100%; height: 300px;"></textarea></td></tr>
            <input type="hidden" name="type" value="edit"/>
            <input type="hidden" id="edit_post_key" name="edit_post_key"/>
            <input type="submit" style="display: none;">
            </table>
        </form>
    </div>
    <div id="delete" style="display: none;">
        <p>Are you sure you want to delete this?
        <p>It is not recoverable.
    </div>
    <div id="container">
        <div id="header">
            <div id="scale">
            </div>
        </div>
        <nav id="nav" role="navigation">
            <a href="#nav" title="Show navigation" style="position: fixed; bottom: 0;"><img src="img/menu.png" height="50px" width="50px" /></a>
            <a href="#" title="Hide navigation" style="position: fixed; bottom: 0;"><img src="img/menu.png" height="50px" width="50px" /></a>
            <ul>
                <li><a href="#main" onclick="main()">Home</a></li>
                <li><a href="#about" onclick="about()">About</a>
                    <ul>
                    <li><a href="#us" onclick="us()">Hannah and Kyle</a></li>
                    <li><a href="#party" onclick="party()">Wedding Party</a></li>
                    </ul>
                </li>
                <li><a href="#wedding" onclick="wedding()">The Wedding</a>
                    <ul>
                    <li><a href="#location" onclick="location()">Where and When</a></li>
                    <li><a href="#food" onclick="food()">Food Stuffs</a></li>
                    <li><a href="#dress" onclick="dress()">Dress Code</a></li>
                	<li><a href="#registry" onclick="registry()">Registry</a></li>
                    <li><a href="#nokids" onclick="nokids()">No Children</a></li>
                    </ul>
                </li>
                <li><a href="#area" onclick="area()">The Area</a>
                    <ul>
                    <li><a href="#todo" onclick="todo()">Things to Do</a></li>
                    <li><a href="#hotels" onclick="hotels()">Hotels</a></li>
                    </ul>
                </li>
                <li><a href="#pictures" onclick="pictures()">Pictures</a>
                    <ul>
                    <li><a href="#meme" onclick="meme()">Meme Generator</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
        <div id="content">
        </div>
    </div>
    <div id="footer"></div>
    <div id="left"></div>
    <div id="right"></div>
</body>
	<script src="js/variables.js"></script>
	<script src="js/initialize.js"></script>
	<script src="js/display.js"></script>
	<script src="js/navigate.js"></script>
</html>