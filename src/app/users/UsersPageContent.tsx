'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchUsers, toggleEmailVisibility, UserState } from '../store/features/userSlice';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function UsersPageContent() {
 const dispatch = useDispatch<AppDispatch>();
 const { users, loading, error } = useSelector((state: RootState) => state.user as UserState);

 useEffect(() => {
   dispatch(fetchUsers());
 }, [dispatch]);

 const filteredUsers = users.filter(user => 
   user.first_name.startsWith('G') || user.last_name.startsWith('W')
 );

 const maskEmail = (email: string) => {
   const [username, domain] = email.split('@');
   return `${username[0]}${'*'.repeat(username.length - 1)}@${domain}`;
 };

 if (loading) return <div className="text-black">Loading...</div>;
 if (error) return <div className="text-black">Error: {error}</div>;

 return (
   <div className="min-h-screen flex flex-col bg-white">
     <Header />
     <main className="container mx-auto p-4 flex-grow">
       <h2 className="text-xl font-bold mb-4 text-black">Users List</h2>
       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
         {filteredUsers.map(user => (
           <div key={user.id} className="border p-4 rounded shadow">
             <div className="text-2xl font-bold text-black text-center mb-4">
               {user.first_name.charAt(0)}{user.last_name.charAt(0)}
             </div>
             <h3 className="font-semibold text-center text-black">
               {user.first_name} {user.last_name}
             </h3>
             <p className="text-center text-black mt-2">
               {user.isEmailVisible ? user.email : maskEmail(user.email)}
             </p>
             <button
               onClick={() => dispatch(toggleEmailVisibility(user.id))}
               className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
             >
               {user.isEmailVisible ? 'Hide Email' : 'Show Email'}
             </button>
           </div>
         ))}
       </div>
     </main>
     <Footer />
   </div>
 );
}