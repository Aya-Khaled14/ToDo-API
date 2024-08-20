## To-DO API
### User and Todo Management API using Express, Mongoose, and MongoDB Atlas

API for managing users and their associated todo items. The API will allow users to create and retrieve user profiles and todo tasks. Additionally, the API will include features for authentication, error handling, form-data handling, and email notifications. The API is built using Node.js, Express.js, and MongoDB Atlas with Mongoose for data modeling.

## Project Components

### 1. Models

#### User Model:
- **name:** The name of the user (string, required).
- **email:** The email of the user (string, required, unique).
- **password:** The password of the user (string, required).
- **type:** The type of the user (string, required, default: 'user'). Possible values: user, admin.
- **createdAt:** The date and time the user was created (Date, default: current date and time).

#### Todo Model:
- **title:** The title of the todo (string, required).
- **description:** The description of the todo (string, optional).
- **completed:** A boolean indicating if the todo is completed (default: false).
- **user:** A reference to the user who created the todo (ObjectId, required).
- **filePath:** Metadata about the attached file (string, optional).
- **createdAt:** The date and time the todo was created (Date, default: current date and time).

### 2. Authentication

Implement JWT-based authentication to secure the API endpoints. Users must authenticate to create and retrieve todos. Use bcrypt to hash passwords before storing them in the database.

### 3. Routes

#### User Routes (/users):
- **POST /users/register:** Register a new user with name, email, and password.
- **POST /users/login:** Authenticate a user with email and password and return a JWT.
- **GET /users:** Retrieve a list of all users (admin only).

#### Todo Routes (/todos):
- **POST /todos:** Create a new todo. Required fields are title and user. Optional fields are description, completed, and filePath.
- **GET /todos:** Retrieve a list of all todos, with user details populated.

### 4. Middleware

- **Error Handling Middleware:** Implement centralized error handling to capture and respond to errors consistently.
- **Catch-all Middleware:** Handle undefined routes with a 404 error response.

### 5. Validation

Use express-validator to validate request data for user registration, login, and todo creation.

#### User Registration Validation
- Name Validation: Ensure the name field is a non-empty string.
- Email Validation: Ensure the email field is a valid email address and not already in use.
- Password Validation: Ensure the password field meets minimum security requirements, such as length and complexity.

#### User Login Validation
- Email Validation: Ensure the email field is a valid email address.
- Password Validation: Ensure the password field is provided.

#### Todo Creation Validation
- Title Validation: Ensure the title field is a non-empty string.
- User Validation: Ensure the user field is a valid ObjectId referring to an existing user.
- Description Validation (Optional): Ensure the description field, if provided, is a string.
- File Validation (Optional): Ensure the filePath field, if provided, is a string.

### 6. File Uploads

Implement file upload functionality using multer to allow users to attach files (images or videos) to their todos. Store file path in the database and the files themselves in a specified directory.
