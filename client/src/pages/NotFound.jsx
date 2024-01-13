import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <main className="grid min-h-screen place-items-center bg-dark-200 banner1 px-6 py-24 sm:py-32 lg:px-8 bg-[#E0454B]">
      <div className="text-center relative z-50 cursor-default">
        <p className="text-base font-semibold text-white">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">Page not found</h1>
        <p className="mt-6 text-base leading-7 text-dark-300 text-white">Sorry, we couldn’t find the page you’re looking for.</p>
        <div
          onClick={() => navigate('/')}
          className="mt-10 flex items-center justify-center gap-x-6 cursor-pointer">
          <div
            className="rounded-md bg-black cursor-pointer px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
          >
            Go Back To Home
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
