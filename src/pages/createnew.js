import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/layout';
import { useRouter } from 'next/router';

console.log('API_URL:', process.env.NEXT_PUBLIC_API_URL);
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
console.log('Final API_URL:', API_URL);


export default function Index() {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [error, setError] = useState();
const router = useRouter();

const createUser = async (user) => {
  console.log(user)
  try {
    console.log('Fetching data before:', `${API_URL}/users/create`);
    const response = await fetch(`${API_URL}/users/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });    

    const data = await response.json();
    console.log('Fetching data after:', `${API_URL}/users/create`);
    console.log(data)
    if (data.success) {
      console.log(API_URL + 'api url');
      console.log('User created:', data.user);
      // Redirect to the home page
      router.push('/');
    } else {
      console.log(API_URL + 'api url');
      console.error('Failed to create user:', data.error);
      setError(data.error);
    }
  } catch (error) {
    console.log(API_URL + 'from catch api url');
    console.error('Error creating user:', error);
    setError(error);
  }
};

const handleSubmit = (e) =>{
  e.preventDefault();
  createUser({ name, email });
};

  return (
    <>
      <Layout pageTitle="Create New User">
        <h1 className='text-[20px] font-bold mb-4'>Create New User</h1>
        <form className='w-[400px] mx-auto form-sec' onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block'>Name:</label>
            <input type='text' name="name" value={name} onChange={(e)=>setName(e.target.value)} />
          </div>
          <div className='mb-4'>
            <label className='block'>Email:</label>
            <input type='text' name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          {error && 
            <p className='text-[#f00] mb-4'>{error}</p>
          }
          <input type='submit' className='bg-[#0087ff] px-5 py-2 rounded-lg text-white hover:bg-[#2096ff] border-[#0087ff] cursor-pointer' value="Submit" />
        </form>
      </Layout>
    </>

  );
}