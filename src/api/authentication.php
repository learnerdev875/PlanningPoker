<?php
include('./Database/db.php');
$db = new Database();
$conn = $db->getConnection();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Retrieve the form data
    $formData = json_decode(file_get_contents('php://input'), true);
    $action = $formData['action'];
    if ($action == 'login') {
        $email = $formData['email'];
        $password = $formData['password'];

        $query = "SELECT * from users WHERE email = '$email'";
        $result = $conn->query($query);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                if (password_verify($password, $row['password'])) {
                    header("HTTP/1.1 200 OK");
                    $response = json_encode(
                        array(
                            'message' => 'Successfully logged in',
                            'success' => true,
                            'data' => $row
                        )
                    );
                } else {
                    header("HTTP/1.1 400 Bad Request");
                    $response = json_encode(
                        array(
                            'message' => 'Incorrect password',
                            'success' => false
                        )
                    );
                }
            }

        } else {
            header("HTTP/1.1 400 Bad Request");
            $response = json_encode(
                array(
                    'message' => 'Invalid email',
                    'success' => false
                )
            );
        }
        echo $response;
        $conn->close();
    } else if ($action == 'signup') {
        $fullName = $formData['fullName'];
        $email = $formData['email'];
        $password = $formData['password'];

        $hashedPassword = password_hash($password, PASSWORD_BCRYPT);


        $sql = "INSERT INTO users(fullName,email,password) VALUES ('$fullName','$email','$hashedPassword')";
        if ($conn->query($sql) === TRUE) {
            // Generate a success response
            $response = json_encode(['success' => true]);
        } else {
            // Generate an error response
            $response = json_encode(['error' => 'Something went wrong']);
        }

        echo $response;
        $conn->close();
    }
}
?>