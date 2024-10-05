<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $is_member = isset($_POST['member']) ? $_POST['member'] : '';
    $total_belanja = filter_var($_POST['total'], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
    $diskon = 0;

    // Validasi total belanja
    if ($total_belanja === false || $total_belanja < 0) {
        echo json_encode(['error' => 'Total belanja tidak valid.']);
        exit;
    }

    // Logika perhitungan diskon
    if ($is_member == "yes") {
        if ($total_belanja > 1000000) {
            $diskon = 15;
        } elseif ($total_belanja >= 500000) {
            $diskon = 10;
        }
    } else {
        if ($total_belanja > 1000000) {
            $diskon = 10;
        } elseif ($total_belanja >= 500000) {
            $diskon = 5;
        }
    }

    $potongan = ($total_belanja * $diskon) / 100;
    $total_akhir = $total_belanja - $potongan;

    // Mengembalikan hasil perhitungan dalam format JSON
    $response = array(
        "totalBelanja" => number_format($total_belanja, 0, ',', '.'),
        "diskon" => $diskon,
        "potongan" => number_format($potongan, 0, ',', '.'),
        "totalSetelahDiskon" => number_format($total_akhir, 0, ',', '.')
    );

    echo json_encode($response);
}
?>
