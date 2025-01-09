import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useScannerStore from '../stores/scannerStore';

const Inventory = () => {
    const [inventory, setInventory] = useState([]);
    const [currentItem, setCurrentItem] = useState({ itemCode: '', quantity: '' });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    
    const { scannerInfo, clearScannerInfo } = useScannerStore();

    useEffect(() => {
        if (!scannerInfo) {
            navigate('/scanner-setup');
        }
    }, [scannerInfo, navigate]);

    const handleChange = (e) => {
        setCurrentItem({ 
            ...currentItem, 
            [e.target.name]: e.target.value 
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newItem = {
            ...currentItem,
            scannerId: scannerInfo.scannerId,
            teamId: scannerInfo.teamId,
            location: scannerInfo.location,
            timestamp: new Date().toISOString(),
        };
        setInventory([...inventory, newItem]);
        setCurrentItem({ itemCode: '', quantity: '' });
        setSuccess('Article ajouté');
        setTimeout(() => setSuccess(''), 2000);
    };

    const handleExport = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/inventory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({ inventory }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `inventaire_${scannerInfo.location}_${new Date().toISOString()}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            a.remove();
            setSuccess('Export réussi');
            setTimeout(() => setSuccess(''), 2000);
        } catch (err) {
            console.error('Erreur lors de l\'export:', err);
            setError(err.message || 'Erreur lors de l\'export');
            setTimeout(() => setError(''), 3000);
        }
    };

    const handleFinish = async () => {
        try {
            await handleExport();
            clearScannerInfo();
            navigate('/scanner-setup');
        } catch (err) {
            setError('Erreur lors de la finalisation');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-blue-900 text-2xl font-bold mb-4">Inventaire en cours</h2>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <p className="text-sm text-gray-600">Scanner: {scannerInfo?.scannerId}</p>
                            <p className="text-sm text-gray-600">Équipe: {scannerInfo?.teamId}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-600">Emplacement: {scannerInfo?.location}</p>
                            <p className="text-sm text-gray-600">Articles scannés: {inventory.length}</p>
                        </div>
                    </div>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                            {error}
                        </div>
                    )}
                    {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                            {success}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="mb-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="itemCode" className="block text-sm font-medium text-gray-700">Code Barre</label>
                                <input 
                                    id="itemCode" 
                                    name="itemCode" 
                                    type="text" 
                                    required
                                    autoComplete="off"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                    value={currentItem.itemCode} 
                                    onChange={handleChange} 
                                    autoFocus 
                                />
                            </div>
                            <div>
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Quantité</label>
                                <input 
                                    id="quantity" 
                                    name="quantity" 
                                    type="number" 
                                    required
                                    autoComplete="off"
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                                    value={currentItem.quantity} 
                                    onChange={handleChange} 
                                />
                            </div>
                        </div>
                        <button type="submit"
                            className="mt-4 w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800">
                            Ajouter
                        </button>
                    </form>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Code Article</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {inventory.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.itemCode}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6 flex space-x-4">
                        <button onClick={handleExport}
                            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">
                            Exporter
                        </button>
                        <button onClick={handleFinish}
                            className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700">
                            Terminer l'emplacement
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Inventory;