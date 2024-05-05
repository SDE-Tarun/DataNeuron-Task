import { useEffect, useState } from "react"; // Importing necessary hooks from React
import "./App.css"; // Importing CSS file for styling
import { Button } from "./components/ui/button"; // Importing Button component
import { // Importing resizable components
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";
import { // Importing table components
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"; // Assuming this is a custom path alias for table components
import axios from "axios"; // Importing Axios for making HTTP requests

// Interface defining the structure of User object
interface User {
  _id: string;
  fullName: string;
  age: string;
  city: string;
  updateApiCalled: number;
  __v: number;
}

function App() {
  const [formData, setFormData] = useState({ // State hook for form data
    fullName: "",
    age: "",
    city: "",
  });

  const [users, setUsers] = useState<User[]>([]); // State hook for users data

  const [userId, setUserId] = useState(""); // State hook for current user ID

  const [updateApiCalled, setUpdateApiCalled] = useState(0); // State hook for update API call count

  const [updateCount, setUpdateCount] = useState(0); // State hook for total update count

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios
      .get("http://localhost:3000/updateCount") // HTTP GET request to fetch update count
      .then((response) => { // Handling successful response
        console.log("Hii");
        setUpdateCount(response.data.sum); // Setting update count state
      })
      .catch((error) => { // Handling error
        console.error("Error fetching users:", error);
      });
  }, [users]); // Dependency array to trigger effect when users state changes

  useEffect(() => {
    // Fetch data from the API when the component mounts
    axios
      .get("http://localhost:3000/users") // HTTP GET request to fetch users data
      .then((response) => { // Handling successful response
        console.log("Hello");
        setUsers(response.data.users); // Setting users state
      })
      .catch((error) => { // Handling error
        console.error("Error fetching users:", error);
      });
    axios
      .get("http://localhost:3000/updateCount") // HTTP GET request to fetch update count
      .then((response) => { // Handling successful response
        console.log("Hii");
        setUpdateCount(response.data.sum); // Setting update count state
      })
      .catch((error) => { // Handling error
        console.error("Error fetching users:", error);
      });
  }, []); // Empty dependency array to trigger effect only once on mount

  const handleChange = (e: any) => { // Event handler for form input change
    setFormData({ // Updating form data state
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (event: any) => { // Event handler for saving form data
    event.preventDefault(); // Preventing default form submission behavior
    let payload: any = { ...formData }; // Creating payload with form data
    const url = userId // Determining API endpoint based on user ID
      ? `http://localhost:3000/update`
      : "http://localhost:3000/save";
    if (userId) { // If user ID exists, it's an update operation
      payload = {
        _id: userId,
        updateApiCalled: updateApiCalled + 1,
        ...formData,
      };
    }
    axios({
      method: userId ? "put" : "post", // Using PUT for update, POST for save
      url: url,
      data: payload, // Sending payload data to the server
    })
      .then((response) => { // Handling successful response
        console.log(response.data);
        // Clear the form data
        setUserId("");
        setFormData({
          fullName: "",
          age: "",
          city: "",
        });
        // Fetch and update the table with new data
        axios
          .get<{ users: User[] }>("http://localhost:3000/users") // Fetching updated users data
          .then((response) => { // Handling successful response
            setUsers(response.data.users); // Updating users state
          })
          .catch((error) => { // Handling error
            console.error("Error fetching users:", error);
          });
      })
      .catch((error) => { // Handling error
        console.error("There was an error!", error);
      });
  };

  const handleEdit = (user: User) => { // Event handler for editing a user
    setFormData({ // Setting form data to the selected user's data
      fullName: user.fullName,
      age: user.age,
      city: user.city,
    });
    setUserId(user._id); // Setting user ID
    setUpdateApiCalled(user.updateApiCalled); // Setting update API call count
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
                {users.map((user) => ( // Mapping over users data to render table rows
                  <TableRow key={user._id}>
                    <td>{user.fullName}</td>
                    <td>{user.age}</td>
                    <td>{user.city}</td>
                    <td className="text-right">
                      <Button
                        variant="outline"
                        onClick={() => handleEdit(user)} // Handling edit button click
                      >
                        Edit
                      </Button>
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
                {/* Form for adding/editing users */}
                <form className="mt-4" onSubmit={handleSave}>
                  <div className="mb-4">
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange} // Handling form input change
                      className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm focus:ring focus:ring-opacity-50 bg-gray-100"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="age"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Age
                    </label>
                    <input
                      type="number"
                      required
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange} // Handling form input change
                      className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm focus:ring focus:ring-opacity-50 bg-gray-100"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      required
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange} // Handling form input change
                      className="mt-1 p-2 block w-full border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 shadow-sm focus:ring focus:ring-opacity-50 bg-gray-100"
                    />
                  </div>
                  <div className="mb-4 flex justify-between">
                    <Button type="submit" variant="outline">
                      Save
                    </Button>
                  </div>
                </form>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default App; // Exporting the App component
