import React from 'react';
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from 'react-icons/bs';

export default function Footerr() {
  return (
    <div className="bg-black text-white py-4 opacity-90 border rounded-lg ">
      <div className="flex justify-center space-x-4 p-5">
        <BsDribbble size={30} />
        <BsFacebook size={30} />
        <BsGithub size={30} />
        <BsInstagram size={30} />
        <BsTwitter size={30} />
      </div>
      <p className="text-center mt-4">© 2024 Your Website. All rights reserved.</p>
    </div>
  );
}
