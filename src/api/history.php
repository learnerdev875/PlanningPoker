<?php
include('./Database/db.php');
$db = new Database();
$conn = $db->getConnection();

if (isset($_GET['userId']) != '' && isset($_GET['userId'])) {

    $userId = $_GET['userId'];
    $sql = "SELECT session.id,session.name,session.status,session.createdAt FROM session LEFT JOIN participants ON session.id = participants.session_id LEFT JOIN users ON participants.user_id = users.id WHERE users.id = '$userId'";
    $response = array();
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            http_response_code(201);
            $response[] = $row;
        }
    } else {
        http_response_code(400);
        $response[] =
            array(
                'error' => true,
                'message' => 'No Past Sessions'
            );
    }

    echo json_encode($response);
    $conn->close();

}
?>