import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ROLES = {
    SUPERADMIN: 0,
    USER: 1,
    ADMIN: 2
}

export default function AdminPage() {
    const [formData, setFormData] = useState({
        login: '',
        newRole: ROLES.USER,
        info: '',
    });

    const [logins, setLogins] = useState([]);

    const [userInfo, setUserInfo] = useState();

    const navigateTo = useNavigate();

    const handleLogOut = () => {
        navigateTo('/');
    }

    const getUserLogins = async () => {
        const response = await axios.get('/Auth/get-logins');
        setLogins(response.data);
    }
    useEffect(() => {
        getUserLogins();
    }, []);

    useEffect(() => {
        setFormData(prevState => ({
            ...prevState,
            info: userInfo
        }));
    }, [userInfo]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name);
        setFormData(prevState => ({
            ...prevState,
            [name]: name === 'newRole' ? parseInt(value, 10) : value
        }));
    }

    const handleLoginChange = async (e) => {
        const { name, value } = e.target;
        if (value === '') {
            setFormData({
                login: '',
                newRole: ROLES.USER,
                info: '',
            });
            return;
        }
        const response = await axios.get('/Auth/get-user-infos/' + value);
        setUserInfo(response.data);
        console.log(response.data);
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        setFormData(prevState => ({
            ...prevState,
            newRole: response.data.newRole
        }));
    }

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setUserInfo(userInfo => ({ ...userInfo, [name]: value }));

    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await axios.put('/Auth/change-role', formData);
            console.log(formData);
            setFormData({
                login: '',
                newRole: ROLES.USER,
                info: '',
            });
        }
        catch (ex) {
            console.error('Server request error:', ex);
            alert('Something went wrong!');
        }
    }

    const handleDelete = async () => {
        try {
            let data = { login: formData.login };
            await axios.delete('/Auth/delete-user', { data });
            console.log(formData);
            setFormData({
                login: '',
                newRole: ROLES.USER,
                info: '',
            });
            await getUserLogins();
            console.log("Successfully deleted!");
        }
        catch (ex) {
            console.error('Server request error:', ex);
        }
    }

    return (
        <div className="Container p-0 m-0" style={{ position: 'relative', backgroundImage: 'url("https://images.unsplash.com/photo-1625671680827-fdc3014d516d?auto=format&fit=crop&q=80&w=1770&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', height: '100vh', backgroundAttachment: 'fixed' }}>
            <button onClick={handleLogOut} className="btn btn-primary d-block mx-auto" style={{ backgroundColor: "#ff007f", border: "1px solid #ff007f", position: 'absolute', top: 10, right: 10 }}>
                Log out
            </button>
            <div className="AdminPage container p-4 rounded bg-blur" style={{ backgroundColor: "rgba(255, 192, 203, 0.5)", width: "400px", padding: "20px", border: "2px solid #ff007f" }}>
                <h2 className="card-title text-center mb-4" style={{ fontFamily: 'cursive' }}>Admin Page</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Choose User From Login:</label>
                    <select
                        className="form-control"
                        name="login"
                        onChange={handleLoginChange}
                        value={formData.login}
                    >
                        <option value=""></option>
                        {logins.map(login => (
                            <option key={login.login} value={login.login}>{login.login}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Role:</label>
                    <select
                        className="form-control"
                        name="newRole"
                        value={formData.newRole}
                        onChange={handleChange}
                    >
                        {Object.values(ROLES).map(role => (
                            <option key={role} value={role}>{role}</option>
                        ))}
                    </select>
                </div>
                {formData.login !== '' && (
                        <h5 className="card-title text-center mb-3" style={{ fontFamily: 'cursive', marginTop: '20px' }}>User information</h5>
                )}
                {formData.login !== '' && (
                        <div className="mb-3 d-flex">
                            <div className="mr-3" style={{ width: "100px" }}>
                                <label className="form-label">Name:</label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={userInfo.name}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                )}
                {formData.login !== '' && (
                        <div className="mb-3 d-flex">
                            <div className="mr-3" style={{ width: "100px" }}>
                                <label className="form-label">Surname:</label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="surname"
                                    value={userInfo.surname}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                )}
                {formData.login !== '' && (
                        <div className="mb-3 d-flex">
                            <div className="mr-3" style={{ width: "100px" }}>
                                <label className="form-label">Patronymic:</label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="patronymic"
                                    value={userInfo.patronymic}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                )}
                {formData.login !== '' && (
                        <div className="mb-3 d-flex">
                            <div className="mr-3" style={{ width: "100px" }}>
                                <label className="form-label">Group:</label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="group"
                                    value={userInfo.group}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                )}
                {formData.login !== '' && (
                        <div className="mb-3 d-flex">
                            <div className="mr-3" style={{ width: "100px" }}>
                                <label className="form-label">Phone:</label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="phone"
                                    value={userInfo.phone}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                )}
                {formData.login !== '' && (
                        <div className="mb-3 d-flex">
                            <div className="mr-3" style={{ width: "100px" }}>
                                <label className="form-label">ID Card:</label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="idCard"
                                    value={userInfo.idCard}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                )}
                {formData.login !== '' && (
                        <div className="mb-3 d-flex">
                            <div className="mr-3" style={{ width: "100px" }}>
                                <label className="form-label">Variant:</label>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="variant"
                                    value={userInfo.variant}
                                    onChange={handleInputChange}
                                    className="form-control"
                                />
                            </div>
                        </div>
                )}
                    <div className="d-flex justify-content-between" style={{ marginTop: '10px' }}>
                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: "#ff007f", border: "1px solid #ff007f" }}>Update User</button>
                        <button onClick={handleDelete} className="btn btn-primary" style={{ backgroundColor: "#B931FC", border: "1px solid #B931FC" }}>Delete User</button>
                    </div>
            </form>
            </div>
        </div>
    );
}

