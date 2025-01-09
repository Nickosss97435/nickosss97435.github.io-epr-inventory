import React, { useState, useEffect } from 'react';
const API_URL = import.meta.env.VITE_API_URL;

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    location: '',
    teamId: ''
  });
console.log(API_URL)
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`http://localhost:5001/api/reports?${queryParams}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      if (response.ok) {
        setReports(data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Erreur lors du chargement des rapports');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchReports();
  };

  const handleExport = async () => {
    try {
      const response = await fetch('http://localhost:5001/api/reports/export', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ filters, reports })
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rapport_ecarts_${new Date().toISOString()}.xlsx`;
        document.body.appendChild(a);
        a.click();
        a.remove();
      } else {
        setError('Erreur lors de l\'export');
      }
    } catch (err) {
      setError('Erreur lors de l\'export');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Rapport des Écarts</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSearch} className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Date début
                </label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                />
              </div>
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  Date fin
                </label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Emplacement
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={filters.location}
                  onChange={handleFilterChange}
                />
              </div>
              <div>
                <label htmlFor="teamId" className="block text-sm font-medium text-gray-700">
                  Équipe
                </label>
                <input
                  type="text"
                  id="teamId"
                  name="teamId"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={filters.teamId}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Rechercher
              </button>
              <button
                type="button"
                onClick={handleExport}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
              >
                Exporter
              </button>
            </div>
          </form>

          {loading ? (
            <div className="text-center py-4">Chargement...</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Emplacement
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Code Article
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantité Système
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantité Comptée
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Écart
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Équipe
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reports.map((report, index) => (
                    <tr key={index} className={report.variance < 0 ? 'bg-red-50' : report.variance > 0 ? 'bg-yellow-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(report.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{report.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{report.itemCode}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{report.systemQuantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{report.countedQuantity}</td>
                      <td className="px-6 py-4 whitespace-nowrap font-medium" style={{
                        color: report.variance < 0 ? 'red' : report.variance > 0 ? 'orange' : 'black'
                      }}>
                        {report.variance}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{report.teamId}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;