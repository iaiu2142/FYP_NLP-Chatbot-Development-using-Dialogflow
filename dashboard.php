<?php
session_start();

// If not logged in, redirect to login page
if (!isset($_SESSION['username'])) {
    header("Location: login.html");
    exit;
}
?>
<?php include 'index.html'; ?>
<!-- Show logout link -->
<a href="logout.php">Logout</a>

