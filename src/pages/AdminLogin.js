import React, { useState } from 'react';
import API from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const res = await API.post('/auth/login', { email, password });
    alert("Login Successful! Token: " + res.data.token);
    localStorage.setItem('token', res.data.token);
  };

  return (
    <div style={{textAlign:'center', marginTop:'100px'}}>
      <h2>Admin Login</h2>
      <input placeholder="Email" onChange={(e)=>setEmail(e.target.value)} /><br/><br/>
      <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} /><br/><br/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}