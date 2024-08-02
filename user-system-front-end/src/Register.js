import React, { useEffect, useState } from 'react';
import './index.css';
import axios from 'axios';
function Register({ onSwitchToLogin }) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (Object.keys(errors).length) {
            validate();
        }
    }, [formData])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const IsvalidateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const IsvalidateUsername = (username) => {
        return username.length > 0 && username.length < 8;
    };

    const isvalidatePassword = (password) => {
        const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(password);
    };

    const validate = () => {
        let formIsValid = true;
        const newErrors = {};

        if (!IsvalidateEmail(formData.email)) {
            newErrors.email = "Invalid email format";
            formIsValid = false;
        }

        if (!IsvalidateUsername(formData.username)) {
            newErrors.username = "Username must be at least 8 characters long";
            formIsValid = false;
        }

        if (!isvalidatePassword(formData.password)) {
            newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
            formIsValid = false;
        }
        setErrors(newErrors);
        return formIsValid;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            // 这里可以添加发送请求到后端的逻辑
            console.log('Form data:', formData);
            axios.post('http://localhost:8080/users', formData)
                .then(res => {
                    console.log(res)
                    alert('注册成功')
                })
                .catch(err => {
                    console.log('2', err)
                    alert(err.response?.data?.message || '注册失败')
                })
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <h2>Register</h2>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                />
                {errors.username && <p className="error">{errors.username}</p>}
            </div>
            <div>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <button type="submit" disabled={Object.keys(errors).length > 0}>Register</button>
        </form>
    );
}

export default Register;