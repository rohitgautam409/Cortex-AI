import { signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth, googleProvider } from '../../utils/firebase';

import api from '../../utils/axios'

const Home: React.FC = () => {

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
        <div className="h-screen flex bg-[#0d0f14] text-white overflow-hidden">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis dignissimos eveniet dolor amet natus vel minima dolorem fuga nesciunt at doloremque neque, excepturi architecto eaque necessitatibus omnis rem, enim animi!
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur'></div>
        </div>
    );
};

export default Home;