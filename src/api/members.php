<?php
include('./Database/db.php');
$db = new Database();
$conn = $db->getConnection();

if (isset($_GET['sessionId']) != '' && isset($_GET['sessionId'])) {

    $session_id = $_GET['sessionId'];
    $sql = "SELECT users.fullName,users.id FROM users LEFT JOIN participants on users.id = participants.user_id LEFT JOIN session on participants.session_id = session.id WHERE session.id ='$session_id'";
    $result = $conn->query($sql);
    // $response = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            http_response_code(201);
            // array_push($response, $row);
            $response[] = $row;
        }
    } else {
        http_response_code(400);

        $response = [];
    }

    echo json_encode($response);
    $conn->close();
}
?>