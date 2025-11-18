// login-script.js (FIX: Menyimpan JWT dan Redirect)

const LOGIN_ENDPOINT = '/auth/login';

const form = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const username = usernameInput.value;
    const password = passwordInput.value;

    console.log('Mengirim permintaan login...');

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
            
            // --- BARU: SIMPAN TOKEN DI LOCAL STORAGE ---
            localStorage.setItem('authToken', data.token); // Menyimpan token
            localStorage.setItem('userName', data.name);   // Menyimpan nama (opsional untuk personalisasi)
            
            alert(`Login Berhasil! Selamat datang, ${data.name}.`);
            
            // Arahkan ke halaman dashboard
            window.location.href = 'blank.html'; 
            
        } else {
            // Login Gagal
            console.error('Login Gagal:', data.error);
            alert(`Login Gagal: ${data.error || 'Terjadi kesalahan.'}`);
        }
    } catch (error) {
        console.error('Kesalahan Jaringan:', error);
        alert('Gagal terhubung ke server API. Pastikan server berjalan.');
    }
});

// Tambahkan navigasi ke Halaman Register
const signupButton = document.querySelector('.btn-signup');
if (signupButton) {
    signupButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'register.html';
    });
}