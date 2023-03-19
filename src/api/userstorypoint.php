<?php
include('./Database/db.php');
$db = new Database();
$conn = $db->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $postData = file_get_contents('php://input');
    $body = json_decode($postData, true);

    $action = $body['action'];
    $point = $body['point'];
    $userId = $body['userId'];
    $storyId = $body['storyId'];

    if ($action == 'addStoryPoint') {
        //distinguishing insert new point and updating current point
        $query = "SELECT * FROM story_points WHERE story_id='$storyId' AND user_id='$userId'";
        if ($conn->query($query)->num_rows > 0) {
            $sql = "UPDATE story_points SET points ='$point' WHERE story_id='$storyId' and user_id='$userId'";
            if ($conn->query($sql) === TRUE) {
                http_response_code(200);
                echo json_encode(
                    array(
                        'updateSuccess' => true
                    )
                );
            } else {
                http_response_code(400);
                echo json_encode(
                    array(
                        'updateSuccess' => false
                    )
                );
            }
        } else {

            $sql = "INSERT INTO story_points VALUES('$storyId','$userId','$point')";

            if ($conn->query($sql) === TRUE) {
                http_response_code(200);
                echo json_encode(
                    array(
                        'insertSuccess' => true,

                    )
                );
            } else {
                http_response_code(400);
                echo json_encode(
                    array(
                        'insertSuccess' => false
                    )
                );
            }
        }

        $conn->close();
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $storyId = isset($_GET['storyId']) ? $_GET['storyId'] : null;

    $sql = "SELECT users.fullName,story_points.points FROM users 
    LEFT JOIN story_points ON users.id = story_points.user_id 
    LEFT JOIN stories ON story_points.story_id = stories.id
    WHERE stories.id = '${storyId}'";
    $result = $conn->query($sql);
    $response = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {

            array_push(
                $response,
                array(
                    'fullName' => $row['fullName'],
                    'points' => $row['points']
                )
            );
        }
    } else {
        $response = [];
    }
    echo json_encode($response);
    $conn->close();

}

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $storyId = isset($_GET['storyId']) ? $_GET['storyId'] : null;

    $sql = "DELETE FROM story_points WHERE story_id='$storyId'";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(
            array(
                'message' => 'All story points resetted'
            )
        );
    } else {
        echo json_encode(
            array(
                'message' => 'Error resetting story points'
            )
        );
    }
    $conn->close();
}

?>