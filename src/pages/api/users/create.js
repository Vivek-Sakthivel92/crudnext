import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const filePath = path.join(process.cwd(), 'users.json');

export default async function handler(req, res) {
  console.log('Request received:', req + '/n' + res);
  if (req.method === 'POST') {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({ success: false, error: 'Name and email are required' });
      }

      // Read existing user data from the JSON file
      const jsonData = fs.readFileSync(filePath, 'utf-8');
      const users = JSON.parse(jsonData);

      // Generate a unique ID using uuid
      const id = uuidv4();

      // Add the new user to the array with the generated ID
      users.push({ id, name, email });

      // Write the updated user data back to the JSON file
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

      console.log('Response sent successfully:', res);
      res.status(200).json({ success: true, user: { id, name, email } });
    } catch (error) {
      console.error('Error processing request:', error);
      console.error(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  }else if (req.method === 'GET') {
    try {
      // Read existing user data from the JSON file
      const jsonData = fs.readFileSync(filePath, 'utf-8');
      const users = JSON.parse(jsonData);

      res.status(200).json({ success: true, users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  } 
}
