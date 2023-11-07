import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function InfoPage() {
    const location = useLocation();
    const [info, setInfo] = useState(location.state.info);
    const [oldLogin, setOldLogin] = useState(location.state.login);
    const [login, setLogin] = useState(location.state.login);
    const navigateTo = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value });
    }

    useEffect(() => {
        setInfo(info => ({
            ...info,
            login: login,
            oldLogin: oldLogin
        }));
    }, [oldLogin]);

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value });
        setLogin(value);
    }

    const handleSaveChanges = async () => {
        try {
            await axios.put('/Auth/update-info', info);
            alert('Successfully changed!');
            setOldLogin(login);
        }
        catch (error) {
            alert('Something went wrong!');
        }
    }

    const handleLogOut = () => {
        navigateTo('/');
    }

    return (
        <div className="Container p-0 m-0" style={{ position: 'relative', backgroundImage: 'url("https://images.unsplash.com/photo-1625671680827-fdc3014d516d?auto=format&fit=crop&q=80&w=1770&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', backgroundAttachment: 'fixed' }}>
            <button onClick={handleLogOut} className="btn btn-primary d-block mx-auto" style={{ backgroundColor: "#ff007f", border: "1px solid #ff007f", position: 'absolute', top: 10, right: 10 }}>
                Log out
            </button>
            <div className="container p-4 rounded bg-blur" style={{ backgroundColor: "rgba(255, 192, 203, 0.5)", width: "400px", padding: "20px", border: "2px solid #ff007f" }}>
                <div className="card-body">
                    <h5 className="card-title text-center mb-4" style={{ fontFamily: 'cursive' }}>User Information</h5>
                    <div className="mb-3 d-flex">
                        <div className="mr-3" style={{ width: "100px" }}>
                            <label className="form-label">Login:</label>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="login"
                                value={login}
                                onChange={handleLoginChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="mb-3 d-flex">
                        <div className="mr-3" style={{ width: "100px" }}>
                            <label className="form-label">Name:</label>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="name"
                                value={info.name}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="mb-3 d-flex">
                        <div className="mr-3" style={{ width: "100px" }}>
                            <label className="form-label">Surname:</label>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="surname"
                                value={info.surname}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="mb-3 d-flex">
                        <div className="mr-3" style={{ width: "100px" }}>
                            <label className="form-label">Patronymic:</label>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="patronymic"
                                value={info.patronymic}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="mb-3 d-flex">
                        <div className="mr-3" style={{ width: "100px" }}>
                            <label className="form-label">Group:</label>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="group"
                                value={info.group}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="mb-3 d-flex">
                        <div className="mr-3" style={{ width: "100px" }}>
                            <label className="form-label">Phone:</label>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="phone"
                                value={info.phone}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="mb-3 d-flex">
                        <div className="mr-3" style={{ width: "100px" }}>
                            <label className="form-label">ID Card:</label>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="idCard"
                                value={info.idCard}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <div className="mb-3 d-flex">
                        <div className="mr-3" style={{ width: "100px" }}>
                            <label className="form-label">Variant:</label>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="variant"
                                value={info.variant}
                                onChange={handleInputChange}
                                className="form-control"
                            />
                        </div>
                    </div>
                    <button onClick={handleSaveChanges} className="btn btn-primary d-block mx-auto" style={{ backgroundColor: "#ff007f", border: "1px solid #ff007f" }}>Save Changes</button>
                </div>
            </div>
        </div>
    );
}
