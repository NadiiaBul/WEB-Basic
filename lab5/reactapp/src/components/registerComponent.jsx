import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterComponent() {
    const [userInfo, setUserInfo] = useState({
        login: '',
        password: '',
        name: '',
        surname: '',
        patronymic: '',
        group: '',
        phone: '',
        idcard: '',
        variant: 1
    });

    const navigateTo = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/Auth/create', userInfo);

            setUserInfo({
                login: '',
                password: '',
                name: '',
                surname: '',
                patronymic: '',
                group: '',
                phone: '',
                idcard: '',
                variant: ''
            });

            navigateTo('/');
        } catch (error) {
            alert('Enter your information for registration!');
        }
    }

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 p-0 m-0" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1627734819947-ba884aea9801?auto=format&fit=crop&q=80&w=1834&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', backgroundAttachment: 'fixed' }}>
            <div className="container RegisterComponent p-4 rounded bg-blur" style={{ backgroundColor: "rgba(255, 192, 203, 0.5)", padding: "20px", border: "2px solid #ff007f", width: "460px" }}>
                <h3 className="text-center mb-3" style={{ fontFamily: 'cursive' }}>User Registration</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="login"
                            value={userInfo.login}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Login"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="password"
                            name="password"
                            value={userInfo.password}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Password"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="name"
                            value={userInfo.name}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Name"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="surname"
                            value={userInfo.surname}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Surname"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="patronymic"
                            value={userInfo.patronymic}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Patronymic"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="group"
                            value={userInfo.group}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Group"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="phone"
                            value={userInfo.phone}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="Phone"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="idcard"
                            value={userInfo.idcard}
                            onChange={handleChange}
                            className="form-control"
                            placeholder="ID Card"
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            name="variant"
                            value={userInfo.variant}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary d-block mx-auto" style={{ backgroundColor: "#ff007f", border: "1px solid #ff007f" }}>
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
