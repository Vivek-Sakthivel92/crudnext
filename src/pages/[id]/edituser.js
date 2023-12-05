import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/layout';

const Index = ({ user }) => {
  const router = useRouter();
  const [userData, setUserData] = useState(user);
  const [error, setError] = useState();

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const handleUpdateUser = async () => {
    try {
      const response = await fetch(`${API_URL}/users/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success) {
        console.log('User updated:', data.user);
        router.push(`/`);
      } else {
        console.error('Failed to update user:', data.error);
        setError(data.error);
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setError(error);
    }
  };

  return (
    <>
      {/* <h1>Edit User</h1>
      <form onSubmit={(e) => { e.preventDefault(); handleUpdateUser(); }}>
        <label>
          Name:
          <input
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          />
        </label>
        <button type="submit">Update User</button>
      </form>       */}
      <Layout pageTitle="Edit User">
        <h1 className='text-[20px] font-bold mb-4'>Edit User</h1>
        <form className='w-[400px] mx-auto form-sec' onSubmit={(e) => { e.preventDefault(); handleUpdateUser(); }}>
          <div className='mb-4'>
            <label className='block'>Name:</label>
            <input type='text' name="name" value={userData.name} onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
          </div>
          <div className='mb-4'>
            <label className='block'>Email:</label>
            <input type='text' name="email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
          </div>
          {error && 
            <p className='text-[#f00] mb-4'>{error}</p>
          }
          <input type='submit' className='bg-[#0087ff] px-5 py-2 rounded-lg text-white hover:bg-[#2096ff] border-[#0087ff] cursor-pointer' value="Submit" />
        </form>
      </Layout>
    </>
  );
};

// This is just a placeholder for user data.
Index.getInitialProps = async ({ query }) => {
  const { id } = query;
  const response = await fetch(`${API_URL}/users/${id}`);
  const data = await response.json();
  const user = data.user || {};
  return { user };
};

export default Index;
