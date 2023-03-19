<?php
include('./Database/db.php');
$db = new Database();
$conn = $db->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // $session_id = isset($_GET['sessionId']) ? $_GET['sessionId'] : null;
    // Retrieve the form data
    $formData = json_decode(file_get_contents('php://input'), true);
    $action = $formData['action'];

    if ($action == 'addNewStory') {
        $sessionId = $formData['sessionId'];
        $storyName = $formData['storyName'];

        //uuid for story id
        $story_id_query = "SELECT UUID() as uuid";
        $story_id_result = $conn->query($story_id_query);
        $id_value = mysqli_fetch_assoc($story_id_result);
        $story_id = $id_value['uuid'];

        $query = "SELECT * FROM stories WHERE status='active' AND session_id='$sessionId'";
        $result = $conn->query($query);

        if ($result->num_rows > 0) {

            $sql = "INSERT INTO stories(id,session_id,name,status) VALUES('$story_id','$sessionId','$storyName','pending')";

            if ($conn->query($sql) === TRUE) {
                http_response_code(200);
                echo json_encode(
                    array(
                        'message' => 'Successfully added new story but with pending status'
                    )
                );
            } else {
                http_response_code(400);
                echo json_encode(
                    array(
                        'message' => 'Error adding new story'
                    )
                );
            }

        } else {

            $sql = "INSERT INTO stories(id,session_id,name) VALUES('$story_id','$sessionId','$storyName')";

            if ($conn->query($sql)) {
                http_response_code(200);
                echo json_encode(
                    array(
                        'message' => 'Successfully added first status'
                    )
                );
            } else {
                http_response_code(400);
                echo json_encode(
                    array(
                        'message' => 'Error creating first story'
                    )
                );
            }

        }
        $conn->close();
    }

    if ($action == 'updateStory') {
        $storyId = $formData['storyId'];
        $sql = "UPDATE stories SET status = CASE WHEN id='$storyId[id]' THEN 'active' ELSE 'pending' END";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(
                array(
                    'message' => 'successfully redirected to new story'
                )
            );
        } else {
            echo json_encode(
                array(
                    'message' => 'error in updating the status of user story'
                )
            );
        }


        $conn->close();
    }

    if ($action == 'updateResult') {
        $result = $formData['avg'];
        $storyId = $formData['storyId'];
        $sessionId = $formData['sessionId'];

        $sql = "UPDATE stories SET result='$result' WHERE id='$storyId' AND session_id='$sessionId'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(
                array(
                    'message' => 'Successfully updated stories table',
                    'success' => true
                )
            );
        } else {
            echo json_encode(
                array(
                    'message' => 'Error on updating stories table',
                    'success' => false
                )
            );
        }
        $conn->close();
    }
    if ($action == 'updateStatus') {
        $storyId = $formData['storyId'];
        $sessionId = $formData['sessionId'];

        $sql = "UPDATE stories SET status='completed' WHERE id='$storyId' AND session_id='$sessionId'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(
                array(
                    'message' => 'Successfully updated stories table'
                )
            );
        } else {
            echo json_encode(
                array(
                    'message' => 'Error on updating stories table'
                )
            );
        }
        $conn->close();
    }


}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $session_id = isset($_GET['sessionId']) ? $_GET['sessionId'] : null;
    $action = isset($_GET['action']) ? $_GET['action'] : '';

    if ($action == 'getActiveStory') {

        $sql = "SELECT * FROM stories WHERE session_id='$session_id' and status='active'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                http_response_code(200);
                $response[] = $row;
            }
        } else {
            http_response_code(400);
            $response = [];
        }

        echo json_encode($response);
        $conn->close();

    } else {

        $sql = "SELECT * FROM stories WHERE session_id='$session_id'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                http_response_code(200);
                $response[] = $row;
            }
        } else {
            http_response_code(400);
            $response = [];
        }

        echo json_encode($response);
        $conn->close();
    }

}
?>