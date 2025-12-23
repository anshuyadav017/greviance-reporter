import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Shield, AlertCircle, CheckSquare, Clock, X, Check, Eye, Filter, Image as ImageIcon, Upload } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGrievance, setSelectedGrievance] = useState(null);

  // Modals
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [resolutionData, setResolutionData] = useState({ note: '', images: [] });
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchGrievances();
  }, []);

  const fetchGrievances = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/grievances`);
      setGrievances(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch grievances", error);
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus, extraData = null) => {
    try {
      setSubmitting(true);
      const payload = { status: newStatus };

      // Handle Rejection
      if (newStatus === 'Rejected' && extraData) {
        payload.rejectionReason = extraData;
      }

      // Handle Resolution
      if (newStatus === 'Resolved' && extraData) {
        payload.resolutionNote = extraData.note;
        payload.adminImages = extraData.images;
      }

      await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/grievances/update/${id}`, payload);

      // Optimistic update
      setGrievances(prev => prev.map(g =>
        g.id === id ? { ...g, status: newStatus, ...payload } : g
      ));

      closeModals();
    } catch (error) {
      console.error("Failed to update status", error);
      alert("Failed to update status");
    } finally {
      setSubmitting(false);
    }
  };

  const closeModals = () => {
    setIsRejectModalOpen(false);
    setIsResolveModalOpen(false);
    setRejectionReason('');
    setResolutionData({ note: '', images: [] });
    setSelectedGrievance(null);
  };

  const openRejectModal = (grievance) => {
    setSelectedGrievance(grievance);
    setIsRejectModalOpen(true);
  };

  const openResolveModal = (grievance) => {
    setSelectedGrievance(grievance);
    setIsResolveModalOpen(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setResolutionData(prev => ({
        ...prev,
        images: [...prev.images, reader.result]
      }));
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/login" replace />;
  }

  const metrics = {
    total: grievances.length,
    pending: grievances.filter(g => g.status === 'Pending').length,
    resolved: grievances.filter(g => g.status === 'Resolved').length,
    rejected: grievances.filter(g => g.status === 'Rejected').length
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen pt-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-serif font-bold text-gray-900">Authority Dashboard</h2>
            <p className="text-gray-500">Manage public grievances and assign actions.</p>
          </div>
          <div className="flex gap-4">
            <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
              <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></span> System Online
            </span>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricBox title="Total Complaints" value={metrics.total} icon={<Shield className="text-gray-400" />} />
          <MetricBox title="Pending" value={metrics.pending} valueColor="text-yellow-600" icon={<Clock className="text-yellow-400" />} />
          <MetricBox title="Resolved" value={metrics.resolved} valueColor="text-green-600" icon={<CheckSquare className="text-green-400" />} />
          <MetricBox title="Rejected" value={metrics.rejected} valueColor="text-red-600" icon={<AlertCircle className="text-red-400" />} />
        </div>

        {/* Management Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-green-50 text-green-900 uppercase text-xs font-bold tracking-wider">
                <tr>
                  <th className="p-4 border-b border-green-100">ID</th>
                  <th className="p-4 border-b border-green-100">Date</th>
                  <th className="p-4 border-b border-green-100">Citizen</th>
                  <th className="p-4 border-b border-green-100">Category</th>
                  <th className="p-4 border-b border-green-100">Description</th>
                  <th className="p-4 border-b border-green-100">Evidence</th>
                  <th className="p-4 border-b border-green-100">Status</th>
                  <th className="p-4 border-b border-green-100 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading ? (
                  <tr><td colSpan="8" className="p-8 text-center text-gray-500">Loading grievances...</td></tr>
                ) : grievances.length === 0 ? (
                  <tr><td colSpan="8" className="p-8 text-center text-gray-500">No grievances found.</td></tr>
                ) : (
                  grievances.map((g) => (
                    <tr key={g.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-4 font-mono font-medium text-gray-600">#{g.id}</td>
                      <td className="p-4 text-gray-500 text-sm">{g.dateRaised || 'N/A'}</td>
                      <td className="p-4 font-medium">{g.user ? g.user.fullName : 'Anonymous'}</td>
                      <td className="p-4">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold">{g.category}</span>
                      </td>
                      <td className="p-4 text-gray-600 max-w-xs truncate" title={g.description}>
                        {g.description}
                      </td>
                      <td className="p-4 text-center">
                        {g.userImages && g.userImages.length > 0 ? (
                          <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded flex items-center justify-center gap-1 w-fit mx-auto">
                            <ImageIcon size={12} /> {g.userImages.length}
                          </span>
                        ) : <span className="text-gray-300">-</span>}
                      </td>
                      <td className="p-4">
                        <StatusBadge status={g.status} />
                      </td>
                      <td className="p-4">
                        <div className="flex justify-end gap-2">
                          {g.status === 'Pending' && (
                            <>
                              <button
                                onClick={() => handleUpdateStatus(g.id, 'In Progress')}
                                className="p-1 text-green-600 hover:bg-green-50 rounded border border-green-200"
                                title="Approve / Verify"
                              >
                                <Check size={16} />
                              </button>
                              <button
                                onClick={() => openRejectModal(g)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded border border-red-200"
                                title="Reject"
                              >
                                <X size={16} />
                              </button>
                            </>
                          )}
                          {g.status === 'In Progress' && (
                            <button
                              onClick={() => openResolveModal(g)}
                              className="p-1 text-blue-600 hover:bg-blue-50 rounded border border-blue-200"
                              title="Resolve with Proof"
                            >
                              <CheckSquare size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Rejection Modal */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Reject Grievance #{selectedGrievance?.id}</h3>
            <p className="text-gray-500 text-sm mb-4">Please provide a reason for rejection. This will be visible to the citizen.</p>

            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none min-h-[100px]"
              placeholder="Reason for rejection (e.g., Duplicate complaint, Lack of evidence...)"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
            />

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeModals}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedGrievance.id, 'Rejected', rejectionReason)}
                disabled={!rejectionReason.trim() || submitting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Processing...' : 'Confirm Rejection'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resolution Modal */}
      {isResolveModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <CheckSquare size={20} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Resolve Issue #{selectedGrievance?.id}</h3>
                <p className="text-xs text-gray-500">Provide resolution details for the citizen.</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-gray-700 mb-1 block">Resolution Note</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none min-h-[100px]"
                  placeholder="Describe how the issue was resolved (e.g., 'Pothole filled and leveled')..."
                  value={resolutionData.note}
                  onChange={(e) => setResolutionData(prev => ({ ...prev, note: e.target.value }))}
                />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 mb-1 block">Upload Proof (Optional)</label>
                <div className="border border-dashed border-gray-300 rounded-lg p-4 text-center hover:bg-gray-50 transition-colors relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                  <span className="text-xs text-gray-500">Click to upload image</span>
                </div>
              </div>

              {resolutionData.images.length > 0 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {resolutionData.images.map((img, idx) => (
                    <div key={idx} className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shrink-0 relative group">
                      <img src={img} alt="proof" className="w-full h-full object-cover" />
                      <button
                        onClick={() => setResolutionData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }))}
                        className="absolute top-0 right-0 bg-red-500 text-white p-0.5 rounded-bl opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={closeModals}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateStatus(selectedGrievance.id, 'Resolved', resolutionData)}
                disabled={!resolutionData.note.trim() || uploading || submitting}
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {submitting ? 'Processing...' : uploading ? 'Uploading...' : 'Confirm Resolution'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

const MetricBox = ({ title, value, valueColor, icon }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <div className="flex justify-between items-start mb-2">
      <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">{title}</p>
      {icon}
    </div>
    <h3 className={`text-4xl font-bold ${valueColor || 'text-gray-900'}`}>{value}</h3>
  </div>
);

const StatusBadge = ({ status }) => {
  const styles = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'In Progress': 'bg-blue-100 text-blue-800',
    'Resolved': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800'
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-bold ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

export default AdminDashboard;
