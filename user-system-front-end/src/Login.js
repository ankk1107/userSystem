import React, { useContext, useState } from 'react';
import './index.css'; // 引入CSS文件
import { ThemeContext } from './App';
import axios from 'axios';

function Login({ onSwitchToRegister }) {
  const theme = useContext(ThemeContext)
  console.log(theme)

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 这里可以添加发送请求到后端的逻辑
    console.log('Form data:', formData);
    axios.post('http://localhost:8080/users/login', formData)
      .then(res => {
        console.log(res);
        alert('login success')
      })
      .catch(err => {
        alert(err.response?.data?.message || 'login failed')
        console.log(err)
      })
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>Login</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;