import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth, googleProvider } from '../utils/firebase';

import api from '../utils/axios'

const App: React.FC = () => {

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      const idToken = await result.user.getIdToken();

      const response = await api.post(
        "/auth/login",
        {},
        {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        }
      );

      console.log(response.data);

    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <div className="flex justify-center">
          <button onClick={googleLogin} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-8 rounded-full shadow-md hover:shadow-lg transition-all duration-200">
            Continue with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;