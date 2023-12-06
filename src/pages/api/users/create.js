import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const filePath = path.join(process.cwd(), 'users.json');

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export let usersArray = [
  {
    "id": "0fe23d9c-cec9-4f2e-a4f6-78ed072ef195",
    "name": "gemvicky & company 1",
    "email": "j.anderson@edbrix1.com"
  },
  {
    "id": "47468b68-0097-4b30-9565-95f846d33346",
    "name": "Naveenkumar Ganasamoorthy 1",
    "email": "anandhmanager@koncert.com"
  },
  {
    "id": "c05052d5-16cf-4579-bb19-1366e61c4deb",
    "name": "Kishore devqa SD org - Test 4",
    "email": "natwentyone@connectleader.com"
  },
  {
    "id": "3d8df686-c4e1-4792-b583-8f54522efa51",
    "name": "gemvicky & company 3",
    "email": "natwentyone@connectleader.com"
  },
  {
    "id": "bc915e99-f696-4fdd-9adf-92b2657ec528",
    "name": "Sourav Magdum",
    "email": "sourav@hexalytics.com"
  }
];

export const handleUserArray = (index, id, name, email) =>{
  console.log('asdf');
  usersArray[index] = {id, name, email}
}

export const handleUserArrayDel = (index) =>{
  console.log('asdf');
  usersArray.splice(index, 1);
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({ success: false, error: 'Name and email are required' });
      }

      // Read existing user data from the JSON file
      // const jsonData = fs.readFileSync(filePath, 'utf-8');
      // const jsonData = usersArray;
      const users = usersArray;

      // Generate a unique ID using uuid
      const id = uuidv4();

      // Add the new user to the array with the generated ID
      users.push({ id, name, email });

      // Write the updated user data back to the JSON file
      // fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
      usersArray = users;

      res.status(200).json({ success: true, user: { id, name, email } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error });
    }
  }else if (req.method === 'GET') {
    try {
      
      if(API_URL!='https://loquacious-haupia-d67b64.netlify.app/api'){
      // Read existing user data from the JSON file
      // const jsonData = fs.readFileSync(filePath, 'utf-8');
      // const users = JSON.parse(jsonData);

      res.status(200).json({ success: true, usersArray });
      }else{
        // console.log('This is netify users>- ' + process.env.NEXT_PUBLIC_USERS);
        // const users = process.env.NEXT_PUBLIC_USERS || '[]';
        // // Parse the JSON string to an array
        // const usersArray = JSON.parse(users);

        // Save the modified array back to the environment variable
        // process.env.NEXT_PUBLIC_USERS = JSON.stringify(usersArray);
        res.status(200).json({ success: true, usersArray });
      }

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  } 
}
