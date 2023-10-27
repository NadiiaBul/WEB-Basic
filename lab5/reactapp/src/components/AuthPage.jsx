import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function AuthPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const navigateTo = useNavigate();

    

    async function handleAuthentication(login, password) {
        try {
            console.log(login);
            console.log(password);

            const response = await axios.post('/Auth/check', { login, password });
            console.log(response);

            const info = response.data;
            if (response.status === 200) {
                console.log('success');
                    navigateTo('/info', { state: { info, login } });
            }
            else if (response.status === 204) {
                navigateTo('/admin');
            }
            else {
                alert('Authentication failed');
            }
        }
        catch (error) {
            console.error('Server request error:', error);
            alert('Something went wrong');
        }
    }

    const register = () => {
        navigateTo('/register');
    }

    const change = () => {
        navigateTo('/change');
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 p-0 m-0" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1635972064135-8ec7711f9895?auto=format&fit=crop&q=80&w=1932&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', backgroundAttachment: 'fixed' }}>
            <div className="AuthContainer p-4 rounded bg-blur" style={{ maxWidth: "340px", backgroundColor: "rgba(255, 192, 203, 0.5)", border: "2px solid #ff007f", fontFamily: 'Segoe UI, sans-serif' }}>
                <h3 className="mb-4" style={{fontFamily: 'cursive' }}>User Authorization</h3>
                <div className="d-flex flex-column align-items-center mb-4">
                    <input
                        type="text"
                        placeholder="Login"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        className="form-control mb-3"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-control mb-3"
                    />
                    <button onClick={() => handleAuthentication(login, password)} className="btn btn-primary" style={{ backgroundColor: "#ff007f", border: "1px solid #ff007f" }}>
                        Sign in
                    </button>
                </div>
                <a href="#" onClick={register} className="text-decoration-underline d-block mb-2" style={{ color: 'black', fontFamily: 'cursive' }}>
                    New user? Sign up
                </a>

                <a href="#" onClick={change} className="text-decoration-underline d-block" style={{ color: 'black', fontFamily: 'cursive' }}>
                    Change password
                </a>
            </div>
        </div>
    );
}