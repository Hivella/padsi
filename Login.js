import React, { useState } from 'react';
import './Login.css'; // Import file CSS

// Endpoint Login Anda
const LOGIN_ENDPOINT = 'http://localhost:3000/auth/login'; 

const LoginPage = ({ onLoginSuccess, onNavigateToSignup }) => { // Menerima props untuk navigasi
    
    // State untuk menyimpan input pengguna
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    // State untuk UI/feedback
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    // Handler untuk tombol Login
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Hapus error sebelumnya
        
        if (!username || !password) {
            setError('Username dan Password wajib diisi.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(LOGIN_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username, // Sesuai dengan field yang diterima Express
                    password: password,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // 1. Login Berhasil (Status 200 OK)
                console.log('Login Berhasil!', data);
                // Lakukan redirect ke halaman kosong/dashboard (sesuai permintaan)
                window.location.href = 'blank.html'; 
                // Atau panggil props jika menggunakan React Router: onLoginSuccess(data);
            } else {
                // 2. Login Gagal (Status 401 Unauthorized, dll.)
                const errorMessage = data.error || 'Kredensial tidak valid (Email/Password salah).';
                setError(errorMessage);
            }
        } catch (networkError) {
            // 3. Kesalahan Jaringan
            console.error('Kesalahan Jaringan:', networkError);
            setError('Gagal terhubung ke server API. Pastikan Express berjalan.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handler untuk navigasi ke Sign Up (menggunakan handleSignUp yang sudah ada)
    const handleSignUp = (e) => {
        e.preventDefault();
        // Logika untuk navigasi ke halaman pendaftaran
        // Jika Anda menggunakan React Router: navigate('/signup');
        console.log('Navigasi ke halaman Sign Up...');
        // Anda bisa tambahkan: onNavigateToSignup();
    };

    return (
        <div className="login-container">
            {/* Bagian atas: Ilustrasi */}
            <div className="header-illustration">
                {/* ⚠️ Ganti dengan komponen atau tag <img> untuk ilustrasi Anda */}
            </div>

            {/* Ilustrasi gelembung/logo di tengah */}
            <div className="center-icon">
                <div className="bubble-placeholder"></div>
            </div>

            <form onSubmit={handleLogin} className="login-form">
                
                {/* Input Username */}
                <input
                    type="text"
                    placeholder="Masukkan username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input-field"
                    required
                    disabled={isLoading}
                />

                {/* Input Password */}
                <input
                    type="password"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                    required
                    disabled={isLoading}
                />

                {/* Pesan Error */}
                {error && <p className="error-message" style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
                
                {/* Tautan Forget Password */}
                <p className="forgot-password-link">
                    <a href="#">Forget password ?</a>
                </p>

                {/* Tombol Login */}
                <button type="submit" className="login-button" disabled={isLoading}>
                    {isLoading ? 'Loading...' : 'Login'}
                </button>
            </form>

            {/* Tautan Sign Up */}
            <p className="signup-prompt">
                Don't have an account ?{' '}
                <a href="#" onClick={handleSignUp} className="signup-link">
                    Sign Up
                </a>
            </p>
        </div>
    );
};

export default LoginPage;