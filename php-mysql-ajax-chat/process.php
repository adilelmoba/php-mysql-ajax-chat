<?php 

    /* CONNECTING THE DATABASE */
    try {
        $database = new PDO('mysql:host=localhost;dbname=chat;charset=utf8', 'root', '');
    }
    catch (Exception $e) {
        die("Erreur " . $e->getMessage());
    }

    /* ANALYSER L'URL */
    $task = 'liste';
    if(array_key_exists('task', $_GET)) {
        $task = $_GET['task'];
    }

    if($task === 'write'){
        postMessage();
    } else {
        getMessage();
    }

    function getMessage() {
        /* SELECTING FROM MESSAGES */
        global $database; // TO KNOW DATABASE FROM THE TOP
        $request = $database-> query('SELECT * FROM messages ORDER BY created_at DESC LIMIT 20');
        $result = $request -> fetchAll();

        // On envoie les messages sous form JSON
        echo json_encode($result);
    }

    function postMessage() {
        /* POSTING MESSAGES */
        global $database;
        if(!array_key_exists('author', $_POST) || !array_key_exists('content', $_POST)) {
            echo json_encode(['status' => 'error','message' => "Erreur d'envoi de message!"]);
            return;
        }
        extract($_POST);
        
        $query = $database-> prepare('INSERT INTO messages(author, content, created_at) values(?, ?)');
        // PERPARE is waiting for parameters BUT, QUERY is not for parameters we use it for SELECTING usually
        $query-> execute([
            'author' => $author,
            'content' => $content
        ]);
        // echo json_encode('status' => 'success');
        echo 'success';
    }

?>