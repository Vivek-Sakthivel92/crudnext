import React, { useEffect, useState } from 'react';
import Layout from '@/components/layout/layout';
import Link from 'next/link';

export default function Index() {
  const [isLoading,setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [nodata, setNodata] = useState(false);
  // useEffect(() => {
  //   const timer = setTimeout(()=>{
  //     fetch("./users.json")
  //           .then((res) => res.json())
  //           .then((json) => {
  //             alert(json)
  //             if(json.length){
  //               setUsers(json);
  //             }else{
  //               setNodata(!nodata);
  //             }
  //             setIsLoading(!isLoading);
  //           });
  //     },2000);
  //     return () => clearTimeout(timer);
  // }, []);

  useEffect(() => {
    // Fetch the list of users from your API or database
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users/create', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }); 
        // Assuming you have an API route to fetch users
        const data = await response.json();
        console.log(data)
        setUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

    const usersList = users.map((item, index) => {
      return (<tr key={index.toString()}>
        <td>{index+1}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>
          <div className='flex gap-2 justify-center'>
            <button className='bg-[#0087ff] px-2 py-1 rounded text-white text-[12px] hover:bg-[#2096ff]'>Edit</button>
            <button className='bg-[#ddd] px-2 py-1 rounded text-[#666] hover:text-[#fff] text-[12px] hover:bg-[#999]'>Delete</button>
          </div>
        </td>
      </tr>);
    })

  return (
    <>
      <Layout pageTitle="Home">
        <div className='flex justify-between items-center mb-5'>
          <h1 className='text-[20px] font-bold'>Team list</h1>
          <Link href="/createnew" className='bg-[#0087ff] px-5 py-2 rounded-lg text-white hover:bg-[#2096ff]'>Add New +</Link>
        </div>
        <div>
          <table className='w-full'>
            <thead>
              <tr>
                <th>S.no</th>
                <th>Name</th>
                <th>Email</th>
                <th className='actions'>Actions</th>
              </tr>
            </thead>
            <tbody>

              {usersList}

            </tbody>
          </table>
        </div>
      </Layout>
    </>

  );
}