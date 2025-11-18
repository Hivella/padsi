// register.js (FIX: Menyimpan JWT dan Redirect ke Dashboard)

const REGISTER_ENDPOINT = '/auth/register'; 

const form = document.getElementById('register-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;

    console.log('Mengirim permintaan registrasi...');

    try {
        const response = await fetch(REGISTER_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // Registrasi Berhasil
            console.log('Registrasi Berhasil!', data);
            
            // --- BARU: SIMPAN TOKEN DI LOCAL STORAGE ---
            localStorage.setItem('authToken', data.token); // Menyimpan token
            localStorage.setItem('userName', data.name);   // Menyimpan nama
            
            alert('Registrasi Berhasil! Mengarahkan ke Dashboard.');
            
            // Arahkan ke halaman dashboard, BUKAN ke login
            window.location.href = 'blank.html'; 
            
        } else {
            // Registrasi Gagal
            console.error('Registrasi Gagal:', data.error);
            alert(`Registrasi Gagal: ${data.error || 'Terjadi kesalahan.'}`);
        }
    } catch (error) {
        console.error('Kesalahan Jaringan:', error);
        alert('Gagal terhubung ke server API. Pastikan server berjalan.');
    }
});