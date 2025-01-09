import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useScannerStore from '../stores/scannerStore';

const ScannerSetup = () => {
  const [setup, setSetup] = useState({
    scannerId: '',
    teamId: '',
    location: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const setScannerInfo = useScannerStore(state => state.setScannerInfo);

  const handleChange = (e) => {
    setSetup({
      ...setup,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/scanner/setup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(setup),
      });

      const data = await response.json();

      if (response.ok) {
        setScannerInfo(setup);
        navigate('/inventory');
      } else {
        setError(data.message || 'Erreur lors de la configuration');
      }
    } catch (err) {
      setError('Erreur lors de la configuration');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-blue-900">
          Configuration Scanner
        </h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="scannerId" className="block text-sm font-medium text-gray-700">
              N° de Douchette
            </label>
            <input
              id="scannerId"
              name="scannerId"
              type="text"
              required
              autoComplete="off"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={setup.scannerId}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="teamId" className="block text-sm font-medium text-gray-700">
              N° d'Équipe
            </label>
            <input
              id="teamId"
              name="teamId"
              type="text"
              required
              autoComplete="off"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={setup.teamId}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Emplacement
            </label>
            <input
              id="location"
              name="location"
              type="text"
              required
              autoComplete="off"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              value={setup.location}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-900 hover:bg-blue-800"
          >
            Commencer l'inventaire
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScannerSetup;