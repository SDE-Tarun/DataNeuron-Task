

import { useEffect, useState } from 'react';
import './App.css'
import { Button } from './components/ui/button'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from './components/ui/resizable'
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from 'axios';


// const axios = require('axios');
// let data = JSON.stringify({
//   "fullName": "Akash",
//   "age": 24,
//   "city": "New Delhi"
// });

// let config = {
//   method: 'post',
//   maxBodyLength: Infinity,
//   url: 'http://localhost:3000/save',
//   headers: { 
//     'Content-Type': 'application/json'
//   },
//   data : data
// };





// function App() {
//   return (
//     <div className="h-screen flex">
//       <ResizablePanelGroup
//         direction="horizontal"
//         className="w-screen rounded-lg border"
//       >
//         <ResizablePanel defaultSize={50}>
//           <div className="h-full items-center justify-center p-6">
//             <span>List of Users</span>
//             <Table>          
//               <TableHeader>
//                 <TableRow>
//                   <TableHead className="w-[100px]">FullName</TableHead>
//                   <TableHead>Age</TableHead>
//                   <TableHead>City</TableHead>
//                   <TableHead className="text-right">Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {/* Table rows go here */}
//               </TableBody>
//             </Table>
//           </div>
//         </ResizablePanel>
//         <ResizableHandle />
//         <ResizablePanel defaultSize={50}>
//           <ResizablePanelGroup direction="vertical" className="h-full">
//             <ResizablePanel defaultSize={25}>
//               <div className="flex h-full items-center justify-center p-6">
//                 <span className="font-semibold">Two</span>
//               </div>
//             </ResizablePanel>
//             <ResizableHandle />
//             <ResizablePanel defaultSize={75}>
//               <div className="flex flex-col h-full items-center justify-center p-6">
//                 <span className="font-semibold">Three</span>
//                 <form className="mt-4">
//                   <div className="mb-4">
//                     <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
//                     <input type="text" id="fullName" name="fullName" className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm focus:ring focus:ring-opacity-50 bg-gray-100"/>
//                   </div>
//                   <div className="mb-4">
//                     <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
//                     <input type="number" id="age" name="age" className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm focus:ring focus:ring-opacity-50 bg-gray-100"/>
//                   </div>
//                   <div className="mb-4">
//                     <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
//                     <input type="text" id="city" name="city" className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm focus:ring focus:ring-opacity-50 bg-gray-100"/>  
//                   </div>
//                   <div className="mb-4 flex justify-between">
//     <Button variant="outline">Reset</Button>
//     <Button variant="outline">Save</Button>
//                 </div>
//                 </form>
//               </div>
//             </ResizablePanel>
//           </ResizablePanelGroup>
//         </ResizablePanel>
//       </ResizablePanelGroup>
//     </div>
//   )
// }

// export default App

interface User {
  _id: string;
  fullName: string;
  age: string;
  city: string;
  updateApiCalled: number;
  __v: number;
}

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    city: ""
  });

  const [users, setUsers] = useState<User[]>([]);

  const [userId, setUserId] = useState('');

  const [updateApiCalled, setUpdateApiCalled] = useState(0);

  const [updateCount, setUpdateCount] = useState(0);

  // let userId: string | undefined  = undefined;

  // let updateCount = 0;

  // let updateApiCalled = 0;

  useEffect(() => {
    // Fetch data from the API when the component mounts
      axios.get('http://localhost:3000/updateCount')
      .then(response => {
        console.log('Hii');
        
        setUpdateCount(response.data.sum) ;
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, [users]); // Empty dependency array to run effect only once when component mounts

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios.get('http://localhost:3000/users')
      .then(response => {
        console.log('Hello');
        
        setUsers(response.data.users);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
      axios.get('http://localhost:3000/updateCount')
      .then(response => {
        console.log('Hii');
        
        setUpdateCount(response.data.sum) ;
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (event: any) => {
    console.log(userId, updateApiCalled);
    event.preventDefault();
    console.log("formData", formData);
    let payload: any = {...formData};
    const url = userId ? `http://localhost:3000/update` : 'http://localhost:3000/save';
    if(userId){
       payload = {
        _id : userId,
        updateApiCalled: updateApiCalled + 1, 
        ...formData
      }
    }
    axios({
      method: userId ? 'put' : 'post',
      url: url,
      data: payload
    })
      .then((response) => {
        console.log(response.data);
        // Clear the form data
        setUserId('');
        setFormData({
          fullName: "",
          age: "",
          city: ""
        });
        // Fetch and update the table with new data
        axios.get<{ users: User[] }>('http://localhost:3000/users')
          .then(response => {
            setUsers(response.data.users);
          })
          .catch(error => {
            console.error('Error fetching users:', error);
          });
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  };

  const handleEdit = (user: User) => {
    setFormData({
      fullName: user.fullName,
      age: user.age,
      city: user.city
    });
    setUserId(user._id);
    setUpdateApiCalled(user.updateApiCalled);
    console.log(userId, updateApiCalled);
    console.log("user", user);
  };
  
  return (
    <div className="h-screen flex">
      <ResizablePanelGroup
        direction="horizontal"
        className="w-screen rounded-lg border"
      >
        <ResizablePanel defaultSize={50}>
          <div className="h-full items-center justify-center p-6">
            <span>List of Users</span>
            <Table>          
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">FullName</TableHead>
                  <TableHead>Age</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user._id}>
                    <td>{user.fullName}</td>
                    <td>{user.age}</td>
                    <td>{user.city}</td>
                    <td className="text-right">
                        <Button variant="outline" onClick={() => handleEdit(user)}>Edit</Button>
                      </td>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical" className="h-full">
            <ResizablePanel defaultSize={25}>
              <div className="h-full items-center justify-center p-6">
                <div>Number of Times Add API called : {users.length}</div>
                
                <div>Number of Times Update API called : {updateCount}</div>
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <div className="flex flex-col h-full items-center justify-center p-6">
                {/* <span className="font-semibold">Three</span> */}
                <form className="mt-4" onSubmit={handleSave}>
                  <div className="mb-4">
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input type="text" required id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm focus:ring focus:ring-opacity-50 bg-gray-100"/>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
                    <input type="number" required id="age" name="age" value={formData.age} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm focus:ring focus:ring-opacity-50 bg-gray-100"/>
                  </div>
                  <div className="mb-4">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                    <input type="text" required id="city" name="city" value={formData.city} onChange={handleChange} className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm focus:ring focus:ring-opacity-50 bg-gray-100"/>  
                  </div>
                  <div className="mb-4 flex justify-between">
                    <Button type='submit' variant="outline">Save</Button>
                  </div>
                </form>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default App;

