import { Link, useNavigate } from 'react-router-dom';
import {useState } from 'react';
import axios from 'axios';
import { userContext } from '../context/userContext';
import { useContext } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const {setReady}=useContext(userContext);

  async function loginUserHandler(ev) {
    ev.preventDefault();

    try {
      const resp = await axios.post('http://localhost:3000/api/user/login', {
        email,
        password,
      });

      if (resp.data.success) {
        setReady(true);
        navigate('/index');
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Handle login failure if needed
    }
  }

  return (
    <div className="mt-10 py-10 flex items-center justify-center">
      <div className="max-w-md">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form onSubmit={loginUserHandler}>
          <input
            type="email"
            placeholder="Your Email"
            className="w-full py-2 px-3 mb-4 rounded-lg border focus:outline-none"
            onChange={(ev) => setEmail(ev.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full py-2 px-3 mb-4 rounded-lg border focus:outline-none"
            onChange={(ev) => setPassword(ev.target.value)}
            value={password}
          />
          <button className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600">
            Login
          </button>
        </form>
        <div className="text-center mt-4 text-gray-600">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-pink-500 font-semibold underline">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
}
