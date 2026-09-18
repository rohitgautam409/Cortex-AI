import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth, googleProvider } from '../../utils/firebase';
import { FcGoogle } from 'react-icons/fc'

import api from '../../utils/axios'

const Home: React.FC = () => {

    const googleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);

            const idToken = await result.user.getIdToken();

            const response = await api.post(
                "/api/auth/login",
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
        <div className="h-screen flex bg-[#0d0f14] text-white overflow-hidden">

            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur'>
                <div className='w-[340px] bg-[#13151c] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-5'>
                    <div className='flex flex-col gap-1'>
                        <h2 className='text-[17px] font-semibold text-slate-100 tracking-tight '>Welcome to CortexAI</h2>
                        <p className='text-[13px] text-slate-500'>Please login to continue using the app</p>
                    </div>
                    <button className='w-full flex items-center justify-center gap-3 py-[11px] rounded-xl text-sm font-medium text-black/90 bg-white hover:bg-grey-200 transition-all duration-150 cusor-pointer' onClick={googleLogin}>
                        <FcGoogle size={15} />
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;