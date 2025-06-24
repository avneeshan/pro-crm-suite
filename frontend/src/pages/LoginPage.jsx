import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../features/auth/authApiSlice';
import { setCredentials } from '../features/auth/authSlice';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [navigate, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const userData = await login({ username, password }).unwrap();
            dispatch(setCredentials({ ...userData }));
            navigate('/');
        } catch (err) {
            // Handle error (e.g., show a toast notification)
            console.error('Failed to log in:', err);
        }
    };
    
    // ... return a form with username, password inputs and a submit button
    // The form's onSubmit would call submitHandler
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form onSubmit={submitHandler} className="p-8 bg-white rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">CRM Login</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 border rounded" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded" required />
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-blue-300">
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    );
};
export default LoginPage;