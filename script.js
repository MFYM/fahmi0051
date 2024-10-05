document.getElementById("belanjaForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let isMember = document.querySelector('input[name="member"]:checked').value;
    let totalBelanja = parseFloat(document.getElementById("total").value);

    // Cek apakah total belanja valid
    if (isNaN(totalBelanja) || totalBelanja < 0) {
        alert("Total belanja tidak valid!");
        return;
    }

    // Buat request AJAX
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "calculate.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    // Callback ketika request selesai
    xhr.onload = function() {
        if (xhr.status === 200) {
            let result = JSON.parse(xhr.responseText);

            // Set result values in the modal
            document.getElementById("totalBelanja").innerText = "Total Belanja: Rp " + result.totalBelanja;
            document.getElementById("diskon").innerText = "Diskon: " + result.diskon + "%";
            document.getElementById("potongan").innerText = "Potongan: Rp " + result.potongan;
            document.getElementById("totalSetelahDiskon").innerText = "Total Setelah Diskon: Rp " + result.totalSetelahDiskon;

            // Show the modal
            let modal = document.getElementById("myModal");
            modal.style.display = "block";
        } else {
            alert("Terjadi kesalahan dalam pengiriman data!");
        }
    };

    // Kirim data ke calculate.php
    let params = "member=" + encodeURIComponent(isMember) + "&total=" + encodeURIComponent(totalBelanja);
    xhr.send(params);
});

// Function to close the modal
let modal = document.getElementById("myModal");
let closeModalBtn = document.querySelector(".close");

closeModalBtn.onclick = function() {
    modal.style.display = "none";
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }
}
