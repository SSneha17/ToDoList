A simple Task List App that enables users to log in and manage their tasks, demonstrating the functionality of Python FastAPI with the MySQL connector and containerization using Docker. The app includes JWT authentication, a navigation bar, and allows users to perform CRUD operations on tasks.

## Tech Stack

- **Backend**:
  - **Python FastAPI**: For building the backend REST API.
  - **MySQL**: Database for storing user and task data.
  - **JWT Authentication**: For secure user login and session management.
  
- **Frontend**:
  - **Angular17**: Framework for building the user interface.
  
- **Other**:
  - **Docker**: For containerizing the app (optional).

## Features

- **Login (JWT Tokens)**: 
  - Users can log in securely using JWT tokens.
  - Tokens are stored in the local storage and used for authentication on subsequent requests.
  
- **Task Management (CRUD Operations)**:
  - Users can **Create**, **Read**, **Update**, and **Delete** tasks.
  - Each task includes a title, description, and completion status.
  
- **Navigation Bar**:
  - A responsive navbar for navigating between the login page and the task list page.

## Project Setup

### Backend Setup (Python FastAPI + MySQL)

1. Clone the repository:

   ```bash
   git clone https://github.com/SSneha17/ToDoList.git
   cd Backend
   
2. Set up a Python virtual environment (optional but recommended):
   ```bash
   python3 -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`

3. Install the backend dependencies:

   ```bash
   pip install -r backend/requirements.txt
   
4. Set up the MySQL database:

Ensure MySQL is installed and running.
Create a database and user for the app.

5. Run the backend FastAPI server:

   ```bash
   uvicorn backend.main:app --reload

The backend should now be running at http://127.0.0.1:8000.

### Frontend Setup (Angular17)
Install Node.js and Angular CLI if they are not already installed.

1. Navigate to the frontend directory:
   ```bash
   cd UI/ToDolist

2. Install frontend dependencies:

   ```bash
   npm install
   
3. Run  docker compose (Ensure Docker Desktop is installed):
   ```bash
   docker-compose up -d
   ng serve -o
   
The frontend should now be running at http://localhost:4200.


### In Action (Screenshots)
![Login](https://github.com/user-attachments/assets/5d917c2d-aa61-4677-a8f4-359f4146cbe4)

![HomePage](https://github.com/user-attachments/assets/73180ae5-39bb-4851-b1d0-0c43a42071ed)

![Edit](https://github.com/user-attachments/assets/52629596-1c86-423d-8d2b-dccc1377eaa4)

![Delete](https://github.com/user-attachments/assets/04350442-ea66-492f-8d0c-bca23f55c460)








