'use client';
import { signOut, useSession } from 'next-auth/react';

interface HeaderProps {
 title?: string;
 showLogout?: boolean;
}

export default function Header({ title = 'Zurich Portal', showLogout = true }: HeaderProps) {
    const { data: session } = useSession();
   
    const handleSignOut = async () => {
      await signOut({ 
        callbackUrl: '/',
        redirect: true 
      });
      window.location.href = '/';
    };

 return (
   <header className="bg-blue-600 text-white p-4">
     <div className="container mx-auto flex justify-between items-center">
       <h1 className="text-2xl font-bold">{title}</h1>
       {showLogout && session && (
         <button
           onClick={handleSignOut}
           className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-50"
         >
           Logout
         </button>
       )}
     </div>
   </header>
 );
}