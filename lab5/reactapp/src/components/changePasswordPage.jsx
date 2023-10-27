import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ChangePasswordPage() {
    const navigateTo = useNavigate();
    const [formData, setFormData] = useState({
        login: '',
        password: '',
        newPassword: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            console.log(formData);
            await axios.put('/Auth/update-password', formData);
            setFormData({
                login: '',
                password: '',
                newPassword: '',
            });
            navigateTo('/');
        }
        catch (ex) {
            alert('Something went wrong!');
        }
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 p-0 m-0" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1627734819947-ba884aea9801?auto=format&fit=crop&q=80&w=1834&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', backgroundAttachment: 'fixed' }}>
            <div className="ChangePasswordContainer p-4 rounded bg-blur" style={{ backgroundColor: "rgba(255, 192, 203, 0.5)", width: "400px", padding: "20px", border: "2px solid #ff007f" }}>
                <h3 className="text-center mb-3" style={{ fontFamily: 'cursive' }}>Change Password</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Login:</label>
                        <input
                            type="text"
                            name="login"
                            value={formData.login}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Current Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">New Password:</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary d-block mx-auto" style={{ backgroundColor: "#ff007f", border: "1px solid #ff007f" }}>
                        Change Password
                    </button>
                </form>
            </div>
        </div>
    );

}
