<?php
header('Content-Type: application/json');

// Determine the HTTP method
$method = $_SERVER['REQUEST_METHOD'];

// Handle the request based on the HTTP method
switch ($method) {
    case 'GET':
        // Handle GET requests
        // ...
        break;
    case 'POST':
        // Handle POST requests
        // ...
        break;
    case 'PUT':
        // Handle PUT requests
        // ...
        break;
    case 'DELETE':
        // Handle DELETE requests
        // ...
        break;
    default:
        // Unsupported HTTP method
        http_response_code(405);
        echo json_encode(['error' => 'Method Not Allowed']);
        break;
}

// Example GET request handler
if ($method === 'GET') {
    // Get the requested resource ID (if provided)
    $resourceId = isset($_GET['id']) ? $_GET['id'] : null;

    // Get the resource(s) from the database
    // ...

    // Send the response
    if ($resourceId !== null) {
        // Return a single resource
        echo json_encode(['id' => $resourceId, 'name' => 'Resource Name']);
    } else {
        // Return a list of resources
        echo json_encode([
            ['id' => 1, 'name' => 'Resource 1'],
            ['id' => 2, 'name' => 'Resource 2'],
            ['id' => 3, 'name' => 'Resource 3']
        ]);
    }
}

// Example POST request handler
if ($method === 'POST') {
    // Get the request data
    $requestData = json_decode(file_get_contents('php://input'), true);

    // Validate the request data
    // ...

    // Create the new resource in the database
    // ...

    // Send the response
    http_response_code(201);
    echo json_encode(['message' => 'Resource created successfully']);
}

// Example PUT request handler
if ($method === 'PUT') {
    // Get the requested resource ID
    $resourceId = isset($_GET['id']) ? $_GET['id'] : null;

    // Get the request data
    $requestData = json_decode(file_get_contents('php://input'), true);

    // Validate the request data
    // ...

    // Update the resource in the database
    // ...

    // Send the response
    echo json_encode(['message' => 'Resource updated successfully']);
}

// Example DELETE request handler
if ($method === 'DELETE') {
    // Get the requested resource ID
    $resourceId = isset($_GET['id']) ? $_GET['id'] : null;

    // Delete the resource from the database
    // ...

    // Send the response
    echo json_encode(['message' => 'Resource deleted successfully']);
}