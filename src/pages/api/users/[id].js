import fs from 'fs';
import path from 'path';
import { usersArray, handleUserArray, handleUserArrayDel } from './create';

const filePath = path.join(process.cwd(), 'users.json');

export default function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Read existing user data from the JSON file
      // const jsonData = fs.readFileSync(filePath, 'utf-8');
      // const users = JSON.parse(jsonData);
      const users = usersArray;

      // Find the user with the specified ID
      const user = users.find((u) => u.id === id);

      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }

      res.status(200).json({ success: true, user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return res.status(400).json({ success: false, error: 'Name and email are required' });
      }

      // Read existing user data from the JSON file
      // const jsonData = fs.readFileSync(filePath, 'utf-8');
      // const users = JSON.parse(jsonData);
      const users = usersArray;

      // Find the user with the specified ID
      const userIndex = users.findIndex((u) => u.id === id);

      if (userIndex === -1) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }

      // Update the user's information
      users[userIndex] = { id, name, email };

      // Write the updated user data back to the JSON file
      // fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
      handleUserArray(userIndex, id, name, email );

      res.status(200).json({ success: true, user: { id, name, email } });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  } else if (req.method === 'DELETE') {
    try {
      // Read existing user data from the JSON file
      // const jsonData = fs.readFileSync(filePath, 'utf-8');
      // const users = JSON.parse(jsonData);
      const users = usersArray;

      // Find the user with the specified ID
      const userIndex = users.findIndex((u) => u.id === id);

      if (userIndex === -1) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }

      // Remove the user from the array
      users.splice(userIndex, 1);

      // Write the updated user data back to the JSON file
      // fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
      handleUserArrayDel(userIndex);

      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: 'Server error' });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
}
