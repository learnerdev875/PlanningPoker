<?php

include('./Database/db.php');
$db = new Database();
$conn = $db->getConnection();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {


    $session_id = isset($_GET['sessionId']) ? $_GET['sessionId'] : null;
    // Retrieve the form data
    $formData = json_decode(file_get_contents('php://input'), true);
    $action = $formData['action'];

    if ($action == 'createNewSession') {

        $session_name = $formData['session_name'];
        $session_description = $formData['session_description'];
        $user_id = $formData['user_id'];

        $session_id_query = "SELECT UUID() as uuid";
        $session_id_result = $conn->query($session_id_query);
        $id_value = mysqli_fetch_assoc($session_id_result);
        $session_id = $id_value['uuid'];

        $sql = "INSERT INTO session(id,name,description) VALUES ('$session_id','$session_name','$session_description');INSERT INTO participants VALUES('$user_id','$session_id','moderator')";

        if ($conn->multi_query($sql) === TRUE) {
            http_response_code(201);
            $response = json_encode(
                array(
                    'success' => true,
                    'message' => 'Successfully created new session',
                    'session_id' => $session_id
                )
            );
        } else {
            http_response_code(400);
            $response = json_encode(
                array(
                    'success' => false,
                    'message' => 'Error creating session'
                )
            );
        }
        echo $response;
        $conn->close();
    }

    if ($action == 'addParticipant') {

        $user_id = $formData['id'];
        $sql = "select * from participants WHERE user_id='$user_id' AND session_id='$session_id'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            echo 'Already in the session';
        } else {
            $sql = "INSERT INTO participants(user_id,session_id) VALUES ('$user_id','$session_id')";
            if ($conn->query($sql) === TRUE) {
                http_response_code(201);
                $response = json_encode(
                    array(
                        'success' => true,
                        'message' => 'Successfully added new participant'
                    )
                );
            } else {
                http_response_code(400);
                $response = json_encode(
                    array(
                        'success' => false,
                        'message' => 'Error adding new Participant'
                    )
                );
            }
            echo $response;
        }
        $conn->close();
    }

}

//validating session

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $action = isset($_GET['action']) ? $_GET['action'] : '';
    $session_id = isset($_GET['sessionId']) ? $_GET['sessionId'] : null;

    if ($action == 'validateSession') {
        $sql = "SELECT * FROM session WHERE id = '$session_id'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            http_response_code(201);
            $response = json_encode(
                array(
                    'isValid' => true
                )
            );
        } else {
            http_response_code(400);
            $response = json_encode(
                array(
                    'isValid' => false
                )
            );
        }

        echo $response;
        $conn->close();

    }

    if ($action == 'checkModerator') {

        $userId = isset($_GET['userId']) ? $_GET['userId'] : null;
        $sql = "SELECT * FROM participants WHERE session_id='$session_id' AND role='moderator' AND user_id='$userId'";
        $result = $conn->query($sql);
        if ($result->num_rows > 0) {
            http_response_code(201);
            echo json_encode(array('isModerator' => true));
        } else {
            http_response_code(400);
            echo json_encode(array('isModerator' => false));
        }
        $conn->close();
    }

}



//ending the session
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {

    $session_id = isset($_GET['sessionId']) ? $_GET['sessionId'] : null;

    $sql = "UPDATE session SET status='complete' WHERE id = '$session_id'";

    if ($conn->query($sql) === TRUE) {

        http_response_code(200);
        echo json_encode(
            array(
                'message' => 'The session is successfully ended'
            )
        );
    } else {
        http_response_code(400);
        echo json_encode(
            array(
                'message' => 'Sorry the session could not end'
            )
        );
    }

    $conn->close();

}

?>