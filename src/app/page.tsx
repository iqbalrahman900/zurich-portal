'use client';
import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
 const handleSignIn = async () => {
   try {
     await signIn('google', {
       callbackUrl: '/users',
       redirect: true
     });
   } catch (error) {
     console.error('Sign in failed:', error);
   }
 };

return (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <div className="p-8 bg-white rounded-lg shadow-md w-full max-w-md">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-8 text-gray-800">Zurich Customer Portal - MUHAMMAD IQBAL</h1>
        <button
          onClick={handleSignIn}
          className="flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg px-6 py-2 text-gray-600 hover:bg-gray-50 w-full"
        >
          <Image 
            src="https://tineye.com/assets/chrome-logo-sm-EINgPHrZ.png"
            alt="Google logo" 
            width={20} 
            height={20} 
            priority 
          />
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
);
}