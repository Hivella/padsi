import React, { useState } from 'react';

// Endpoints API Anda yang sudah dikonfigurasi di Express.js
const API_BASE_URL = 'http://localhost:3000/auth';

/**
 * UTILITY: Custom Fetch dengan Error Handling
 * @param {string} endpoint - /login atau /register
 * @param {object} body - Data user
 */
const apiFetch = async (endpoint, body) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    const data = await response.json();
    if (!response.ok) {
        // Melempar error dengan pesan dari server
        throw new Error(data.error || 'Terjadi kesalahan server.');
    }
    return data;
};

// --- KOMPONEN: Halaman Dashboard (Blank) ---
const DashboardPage = ({ user, onLogout }) => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Login Berhasil!</h1>
        <p className="text-lg text-gray-600 mb-8">Selamat datang, {user.name} ({user.userId})</p>
        <button 
            onClick={onLogout}
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition duration-300"
        >
            Logout
        </button>
    </div>
);

// --- KOMPONEN: Halaman Login ---
const LoginPage = ({ onNavigate, onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const data = await apiFetch('/login', { username, password });
            onLogin(data); // Kirim data sukses ke komponen App
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthFormLayout title="Login">
            <form onSubmit={handleLogin} className="w-full space-y-4">
                {/* Input Email/Username */}
                <input
                    type="text"
                    placeholder="Masukkan username/email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-5 py-3 border-none rounded-full text-center text-sm shadow-md focus:ring-teal-400 focus:border-teal-400"
                    required
                    disabled={isLoading}
                />

                {/* Input Password */}
                <input
                    type="password"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-3 border-none rounded-full text-center text-sm shadow-md focus:ring-teal-400 focus:border-teal-400"
                    required
                    disabled={isLoading}
                />

                {/* Pesan Error */}
                {error && <p className="text-red-500 text-sm text-center pt-2">{error}</p>}
                
                {/* Tautan Forget Password */}
                <div className="text-right text-sm">
                    <a href="#" className="text-teal-500 hover:text-teal-600 transition">Forget password ?</a>
                </div>

                {/* Tombol Login */}
                <button
                    type="submit"
                    className="w-full py-3 bg-teal-500 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-600 transition duration-300"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Login'}
                </button>
            </form>

            {/* Tautan Sign Up */}
            <p className="text-sm text-gray-700 mt-6">
                Don't have an account ?{' '}
                <a 
                    href="#" 
                    onClick={() => onNavigate('register')} 
                    className="text-teal-500 font-bold hover:text-teal-600"
                >
                    Sign Up
                </a>
            </p>
        </AuthFormLayout>
    );
};

// --- KOMPONEN: Halaman Register ---
const RegisterPage = ({ onNavigate }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setIsLoading(true);

        try {
            await apiFetch('/register', { name, email, password });
            setSuccess('Registrasi berhasil! Silakan Login.');
            // Kosongkan form
            setName('');
            setEmail('');
            setPassword('');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthFormLayout title="Register">
            <form onSubmit={handleRegister} className="w-full space-y-4">
                {/* Input Nama */}
                <input
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-5 py-3 border-none rounded-full text-center text-sm shadow-md focus:ring-teal-400 focus:border-teal-400"
                    required
                    disabled={isLoading}
                />

                {/* Input Email */}
                <input
                    type="email"
                    placeholder="Masukkan email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-3 border-none rounded-full text-center text-sm shadow-md focus:ring-teal-400 focus:border-teal-400"
                    required
                    disabled={isLoading}
                />

                {/* Input Password */}
                <input
                    type="password"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-3 border-none rounded-full text-center text-sm shadow-md focus:ring-teal-400 focus:border-teal-400"
                    required
                    disabled={isLoading}
                />

                {/* Pesan Error/Sukses */}
                {error && <p className="text-red-500 text-sm text-center pt-2">{error}</p>}
                {success && <p className="text-green-500 text-sm text-center pt-2 font-semibold">{success}</p>}

                {/* Tombol Sign Up */}
                <button
                    type="submit"
                    className="w-full py-3 mt-6 bg-teal-500 text-white font-semibold rounded-lg shadow-lg hover:bg-teal-600 transition duration-300"
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Sign Up'}
                </button>
            </form>

            {/* Tautan Login */}
            <p className="text-sm text-gray-700 mt-6">
                Already have an account?{' '}
                <a 
                    href="#" 
                    onClick={() => onNavigate('login')} 
                    className="text-teal-500 font-bold hover:text-teal-600"
                >
                    Login
                </a>
            </p>
        </AuthFormLayout>
    );
};

// --- KOMPONEN LAYOUT BERSAMA ---
const AuthFormLayout = ({ children, title }) => (
    <div className="flex flex-col items-center justify-start min-h-screen bg-teal-50/50">
        
        {/* Area Ilustrasi Atas (Placeholder Design) */}
        <div className="w-full h-64 bg-teal-200/50 flex items-end justify-center relative shadow-inner">
            <div className="p-4 text-center">
                <h1 className="text-2xl font-extrabold text-teal-800">LAUNDRY APP</h1>
                <p className="text-teal-600 text-sm">{title}</p>
            </div>
            
            {/* Placeholder Bola Putih */}
            <div className="absolute -bottom-8 w-20 h-20 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-teal-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 0110 10c0 5.523-4.477 10-10 10S2 17.523 2 12A10 10 0 0112 2zm0 15a1 1 0 100-2 1 1 0 000 2zM12 7h.01"/>
                </svg>
            </div>
        </div>

        {/* Form Container */}
        <div className="w-full max-w-sm p-8 mt-12 bg-white rounded-xl shadow-2xl">
            {children}
        </div>
    </div>
);


// --- KOMPONEN UTAMA APLIKASI ---
const App = () => {
    // State untuk routing: 'login', 'register', 'dashboard'
    const [view, setView] = useState('login'); 
    // State untuk menyimpan data user saat login
    const [currentUser, setCurrentUser] = useState(null);

    const handleLogin = (userData) => {
        setCurrentUser(userData);
        setView('dashboard');
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setView('login');
    };

    const renderView = () => {
        if (currentUser && view === 'dashboard') {
            return <DashboardPage user={currentUser} onLogout={handleLogout} />;
        }
        
        switch (view) {
            case 'register':
                return <RegisterPage onNavigate={setView} />;
            case 'login':
            default:
                return <LoginPage onNavigate={setView} onLogin={handleLogin} />;
        }
    };

    return (
        <div className="min-h-screen">
            {renderView()}
        </div>
    );
};

export default App;