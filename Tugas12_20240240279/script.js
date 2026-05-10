let databaseRonda = [];

document.getElementById('rondaForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const nama = document.getElementById('nama').value;
    const pos = document.getElementById('posRonda').value;
    const tanggal = document.getElementById('tanggal').value;
    const fotoFile = document.getElementById('foto').files[0];

    // Membaca file foto agar bisa ditampilkan
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const fotoUrl = event.target.result; // Data gambar dalam bentuk Base64

        // 1. Tampilkan di Kartu Hasil
        document.getElementById('outNama').innerText = nama;
        document.getElementById('outPos').innerText = pos;
        document.getElementById('outTanggal').innerText = tanggal;
        document.getElementById('outFoto').src = fotoUrl;
        document.getElementById('outputArea').style.display = 'block';

        // 2. Simpan ke database array
        databaseRonda.push({ nama, pos, tanggal, fotoUrl });

        // 3. Update Tabel
        renderTabel();
        
        // 4. Reset Form
        document.getElementById('rondaForm').reset();
    };

    if (fotoFile) {
        reader.readAsDataURL(fotoFile);
    }
});

function renderTabel() {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = "";

    databaseRonda.forEach((item, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${item.fotoUrl}" class="img-table"></td>
                <td>${item.nama}</td>
                <td>${item.pos}</td>
                <td>${item.tanggal}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}