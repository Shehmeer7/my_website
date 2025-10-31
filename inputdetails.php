<?php
// --- PHP Backend Section ---
$servername="localhost";
$username="root";
$password="";
$databasename="mn";
$conn=mysqli_connect($servername,$username,$password,$databasename);
if(!$conn){
    die("Connection failed:".mysqli_connect_error());
}
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $subject = htmlspecialchars($_POST['subject']);
    $phone = htmlspecialchars($_POST['phone']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    $sql_query = "INSERT INTO details (name,subject,phone,email,message)
                  VALUES ('$name','$subject','$phone','$email','$message')";

    if (mysqli_query($conn, $sql_query)) {
        echo "<script>
                alert('✅ Your message has been submitted successfully!');
                window.location.href='#home';
              </script>";
    } else {
        echo "<script>alert('❌ Error submitting details');</script>";
    }
    mysqli_close($conn);
}
?>
