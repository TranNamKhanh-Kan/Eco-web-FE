import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout';
import { FaArrowLeft, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import api from '../../utils/api';

export default function MessageDetail() {
  const { type, id } = useParams(); // type: 'contact' | 'feedback'
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);

  const fetchDetail = async () => {
    setLoading(true);
    setError(null);
    try {
      if (type === 'contact') {
        const res = await api.get(`/api/contacts/${id}`);
        setData(res.data);
      } else {
        const res = await api.get(`/api/feedbacks/${id}`);
        setData(res.data);
      }
    } catch (err) {
      setError('Failed to load message');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [id, type]);

  

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 border rounded-lg hover:bg-gray-50">
            <FaArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="text-5xl font-bold" >
            {type === 'contact' ? 'Contact Detail' : 'Feedback Detail'}
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          {loading && <p className="text-gray-500">Loading...</p>}
          {error && (
            <div className="text-center">
              <p className="text-red-500">{error}</p>
              <button onClick={fetchDetail} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Retry</button>
            </div>
          )}
          {!loading && !error && data && (
            <>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FaUser className="w-5 h-5 text-gray-600" />
                  <span className="font-bold text-lg" >{data.userName}</span>
                </div>
                <span className="text-gray-500" >
                  {new Date(data.createdAt).toLocaleString()}
                </span>
              </div>

              <div className="flex items-center mb-4 gap-6">
                <div className="flex items-center">
                  <FaPhone className="w-4 h-4 text-gray-600 mr-2" />
                  <span className="text-gray-700" >
                    Contact: {data.contactInfo}
                  </span>
                </div>
                {data.email && (
                  <div className="flex items-center">
                    <FaEnvelope className="w-4 h-4 text-gray-600 mr-2" />
                    <span className="text-gray-700" >
                      Email: {data.email}
                    </span>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <p className="text-gray-800 leading-relaxed" >
                  {data.message}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}


