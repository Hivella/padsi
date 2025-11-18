// login-script.js (FIX: Redirect Path Absolut)

// Alamat endpoint login Anda
const LOGIN_ENDPOINT = '/auth/login';

const form = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

// Tangkap element signup button, karena kita hapus script scaling di login.html
const signupButton = document.querySelector('.btn-signup');


// --- Event Listener Utama ---
form.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const username = usernameInput.value;
    const password = passwordInput.value;

    console.log('Mengirim permintaan login...');
    // Anda bisa menambahkan UI feedback di sini (misalnya, menonaktifkan tombol)

    try {
        const response = await fetch(LOGIN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            // Login Berhasil
            console.log('Login Berhasil!', data);
            alert(`Login Berhasil! Selamat datang, ${data.name || 'Pengguna'}.`);
            
            // FIX PENTING: Arahkan ke halaman dashboard menggunakan path ABSOLUT
            window.location.href = '/blank.html'; 
        } else {
            // Login Gagal
            console.error('Login Gagal:', data.error);
            alert(`Login Gagal: ${data.error || 'Terjadi kesalahan.'}`);
        }
    } catch (error) {
        console.error('Kesalahan Jaringan/Server:', error);
        alert('Gagal terhubung ke server API atau terjadi kesalahan jaringan.');
    }
});

// Tambahkan navigasi ke Halaman Register (JANGAN LUPA)
if (signupButton) {
    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = '/register.html'; // Gunakan path absolut
    });
}