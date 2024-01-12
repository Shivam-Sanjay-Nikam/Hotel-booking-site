import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../context/userContext';

export default function Home() {
  const { user } = useContext(userContext);

  return (
    <section className="text-white">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-pink-500 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
            Welcome! Enjoy your stay with us
          </h1>

          <p className="mx-auto mt-10 max-w-xl sm:text-xl/relaxed text-black">
            "Experience the trust of our customers and discover the best hotel booking services with us."
          </p>

          {user ? (
            <div>
              <div className="text-black p-2 font-mono text-lg uppercase mt-10">
                Welcome {user.name}
              </div>
              <Link
                to="/index"
                className=" mt-3 block uppercase rounded border border-pink-600 bg-pink-500  text-sm font-medium text-white hover:bg-transparent hover:text-pink-600 py-3 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              >
                Go To HomePage 
              </Link>
              
            </div>
          ) : (
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/login"
                className="block w-full rounded border border-pink-600 bg-pink-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-pink-600 focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block w-full rounded border border-pink-600 px-12 py-3 text-sm font-medium text-pink-600 hover:bg-pink-600  hover:text-white focus:outline-none focus:ring active:bg-pink-500 sm:w-auto"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
