import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const registerUserHandler = async (ev) => {
    ev.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/api/user/register', {
        name,
        email,
        password,
      });

      if (res.data.success) {
        navigate('/login');
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="mt-10 py-10 flex items-center justify-center">
      <div className="max-w-md">
        <h1 className="text-4xl text-center mb-4">Register</h1>

        <form className="mx-auto" onSubmit={registerUserHandler}>
          <input
            type="text"
            placeholder="Your name"
            className="w-full border my-1 py-2 px-3 mb-3 rounded-2xl"
            onChange={(ev) => setName(ev.target.value)}
            value={name}
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border my-1 py-2 px-3 mb-3 rounded-2xl"
            onChange={(ev) => setEmail(ev.target.value)}
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border my-1 py-2 px-3 mb-3 rounded-2xl"
            onChange={(ev) => setPassword(ev.target.value)}
            value={password}
          />
          <button className="w-full bg-pink-500 text-white py-2 rounded-2xl">
            Register
          </button>
        </form>

        <div className="text-center mt-3 text-gray-500">
          Already have an account?{" "}
          <Link className="underline font-extrabold text-pink-600" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
