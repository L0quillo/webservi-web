<?php
session_start();
header('Content-Type: application/json');

$authFile = __DIR__ . '/auth.json';
$dataFile = __DIR__ . '/../data/content.json';

$action = $_GET['action'] ?? '';

function isAuthenticated() {
    return isset($_SESSION['webservi_admin_logged']) && $_SESSION['webservi_admin_logged'] === true;
}

if ($action === 'login') {
    $input = json_decode(file_get_contents('php://input'), true);
    $pass = $input['password'] ?? '';

    if (!file_exists($authFile)) {
        echo json_encode(['success' => false, 'error' => 'Configuración de autenticación no encontrada.']);
        exit;
    }

    $authData = json_decode(file_get_contents($authFile), true);
    $calcHash = hash('sha256', $pass . ($authData['salt'] ?? ''));

    if ($calcHash === ($authData['hash'] ?? '')) {
        $_SESSION['webservi_admin_logged'] = true;
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Contraseña incorrecta.']);
    }
    exit;
}

if ($action === 'logout') {
    $_SESSION['webservi_admin_logged'] = false;
    session_destroy();
    echo json_encode(['success' => true]);
    exit;
}

// All subsequent actions require authentication
if (!isAuthenticated()) {
    http_response_code(401);
    echo json_encode(['success' => false, 'error' => 'No autorizado.']);
    exit;
}

if ($action === 'get_content') {
    if (!file_exists($dataFile)) {
        echo json_encode(['success' => false, 'error' => 'Archivo content.json no encontrado.']);
        exit;
    }
    $json = file_get_contents($dataFile);
    echo $json;
    exit;
}

if ($action === 'save_content') {
    $raw = file_get_contents('php://input');
    $decoded = json_decode($raw, true);

    if (!$decoded) {
        echo json_encode(['success' => false, 'error' => 'Formato JSON inválido.']);
        exit;
    }

    $saved = file_put_contents($dataFile, json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    if ($saved === false) {
        echo json_encode(['success' => false, 'error' => 'No se pudo escribir en data/content.json. Verifique permisos.']);
        exit;
    }

    // Try git commit on SiteGround if available
    $repoDir = escapeshellarg(realpath(__DIR__ . '/..'));
    @exec("cd $repoDir && git add data/content.json && git commit -m 'Contenido actualizado desde panel admin' 2>&1");

    echo json_encode(['success' => true, 'message' => 'Contenido guardado y publicado correctamente.']);
    exit;
}

if ($action === 'change_password') {
    $input = json_decode(file_get_contents('php://input'), true);
    $newPass = trim($input['new_password'] ?? '');

    if (strlen($newPass) < 6) {
        echo json_encode(['success' => false, 'error' => 'La contraseña debe tener al menos 6 caracteres.']);
        exit;
    }

    $salt = bin2hex(random_bytes(16));
    $hash = hash('sha256', $newPass . $salt);

    file_put_contents($authFile, json_encode(['salt' => $salt, 'hash' => $hash], JSON_PRETTY_PRINT));
    echo json_encode(['success' => true, 'message' => 'Contraseña actualizada con éxito.']);
    exit;
}

echo json_encode(['success' => false, 'error' => 'Acción no reconocida.']);
