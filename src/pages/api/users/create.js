import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const filePath = path.join(process.cwd(), 'users.json');

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({ success: false, error: 'Name and email are required' });
      }
      if(API_URL!='https://loquacious-haupia-d67b64.netlify.app/api'){
      // Read existing user data from the JSON file
      const jsonData = fs.readFileSync(filePath, 'utf-8');
      const users = JSON.parse(jsonData);

      // Generate a unique ID using uuid
      const id = uuidv4();

      // Add the new user to the array with the generated ID
      users.push({ id, name, email });

      // Write the updated user data back to the JSON file
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
      
      }else{
        console.log('This is netify users>- ' + process.env.NEXT_PUBLIC_USERS)
        const users = process.env.NEXT_PUBLIC_USERS || '[]';
        // Parse the JSON string to an array
        const usersArray = JSON.parse(users);

        // Generate a unique ID using uuid
        const id = uuidv4();

        // Modify the array as needed
        usersArray.push({ id, name, email });

        // Save the modified array back to the environment variable
        process.env.NEXT_PUBLIC_USERS = JSON.stringify(usersArray);

      }

      res.status(200).json({ success: true, user: { id, name, email } });

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error });
    }
  }else if (req.method === 'GET') {
    try {

      if(API_URL!='https://loquacious-haupia-d67b64.netlify.app/api'){

        // Read existing user data from the JSON file
        const jsonData = fs.readFileSync(filePath, 'utf-8');
        const users = JSON.parse(jsonData);
        res.status(200).json({ success: true, users: users });

      }else{
        console.log('This is netify users>- ' + process.env.NEXT_PUBLIC_USERS);
        const users = process.env.NEXT_PUBLIC_USERS || '[]';
        // Parse the JSON string to an array
        const usersArray = JSON.parse(users);

        // Save the modified array back to the environment variable
        process.env.NEXT_PUBLIC_USERS = JSON.stringify(usersArray);
        res.status(200).json({ success: true, users: usersArray });
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  } 
}
