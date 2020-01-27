
<?php echo $_POST["name"];  ?> <br /> 
<?php echo $_POST["email"]; ?> <br /> 
<?php 

$email = $_POST["email"]; 
$msg =  wordwrap($_POST["message"], 70);

echo "{$msg} from {$email}";  
 ?> 
