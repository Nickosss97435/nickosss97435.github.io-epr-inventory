import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import bgImage from '/404-Ampoule.jpeg';

const NotFound = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      once: true,
    });
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg text-center">
        <h3 className="text-4xl font-bold text-blue-600 mb-4" data-aos="fade-up">
          <span>Oops ! </span>Page<span> Introuvable</span>
        </h3>
        <div className='text-blue-800'>
          <h1 className="text-5xl font-extrabold mb-2" data-aos="zoom-in">
            Erreur 404 
          </h1>
          <h3 className="text-xl mb-4" data-aos="fade-up">Il semblerait que nous ayons perdu le courant !</h3>
          <h2 className='text-lg text-stone-600 mb-6' data-aos="fade-up">Pas de panique</h2>
          <a className="inline-block px-6 py-2 bg-blue-900 text-white rounded-full hover:bg-blue-800 transition duration-300" href='/' data-aos="fade-up">
            Rebranchez vous
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
