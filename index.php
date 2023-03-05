<?php
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);

    if ($data !== null) {
        $response = array(
          'status' => 200,
          'result' => true,
        );
        } else {
        $response = array(
          'status' => 400,
          'result' => false,
        );
    }

    header('Content-Type: application/json');
    echo json_encode($response);
?>


