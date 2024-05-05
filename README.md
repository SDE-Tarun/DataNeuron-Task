Installation:-
To set up the project locally, follow these steps:

Clone the repository: git clone <repository_url>
Navigate to the project directory: cd <project_directory>
Install dependencies: npm install

Database Setup:-
To set up the database for this project, follow these steps:
Install MongoDB on your system if not already installed.
Start MongoDB service.

Routes:-
This project provides the following API routes:

GET /api/users
Description: Fetch all users from the database.
Method: GET
Endpoint: /api/users
Parameters: None
Response:

json
Copy code
{
  "users": [
    {
      "_id": "user_id",
      "fullName": "User Name",
      "age": 30,
      "city": "City Name"
    },
    ...
  ]
}
POST /api/save
Description: Save a new user to the database.
Method: POST
Endpoint: /api/save
Request Body:

json
Copy code
{
  "fullName": "User Name",
  "age": 30,
  "city": "City Name"
}
Response:

json
Copy code
{
  "message": "User successfully created"
}
PUT /api/update
Description: Update user data in the database.
Method: PUT
Endpoint: /api/update
Request Body:

json
Copy code
{
  "_id": "user_id",
  "fullName": "Updated Name",
  "age": 35,
  "city": "Updated City"
}
Response:

json
Copy code
{
  "fullName": "Updated Name",
  "age": 35,
  "city": "Updated City"
}
GET /api/updateCount
Description: Get the total count of update API calls.
Method: GET
Endpoint: /api/updateCount
Response:

json
Copy code
{
  "sum": 10
}

Usage:-
To run the project, use the following command: npm run dev
