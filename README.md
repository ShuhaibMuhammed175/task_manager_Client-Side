# Task Manager Application

## Overview

This Task Manager Application is a React-based project that allows users to manage their tasks efficiently. It provides functionalities to view, update, create, and delete tasks, along with filtering tasks based on their status. The application uses a RESTful API for backend interactions and includes user authentication features.

## Features

- **User Authentication**: Register and log in to manage tasks.
- **Task Management**: Create, update, and delete tasks.
- **Task Filtering**: Filter tasks based on their status (Pending/Completed).
- **Task Details**: View detailed information about each task.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Installation

To get started with the Task Manager Application, follow these steps:

1. **Clone the Repository**

    ```bash
    git clone https://github.com/your-username/task-manager.git
    cd task-manager_app
    ```

2. **Install Dependencies**

    Ensure you have Node.js and npm installed. Run the following command to install the necessary dependencies:

    ```bash
    npm install
    ```


3. **Start the Application**

    ```bash
    npm start
    ```

    The application will be available at `http://localhost:3000`.

## Usage

### Authentication

- **Register**: Navigate to `/register` to create a new account.
- **Login**: Navigate to `/login` to access your account.

### Task Management

- **View Tasks**: The homepage displays a list of tasks with options to filter by status.
- **Update Tasks**: Click on a task to update its details. You can change the title, description, and status.
- **Create Tasks**: Navigate to `/create-task` to add a new task.
- **Delete Tasks**: Use the delete button next to each task to remove it from the list.
- **View Task Details**: Click on a task title or description to view detailed information.

### Filtering

- Use the filter buttons to view tasks by their status: All, Completed, or Pending.

## File Structure

- `src/`: Contains all source code for the application.
  - `components/`: React components for various features.
    - `user/`: Components related to user authentication.
    - `tasklist/`: Components for managing and displaying tasks.
    - `navbar/`: Component for the navigation bar.
  - `config/`: Configuration files.
  - `App.js`: Main application component and routing.
  - `index.js`: Entry point of the React application.
- `public/`: Static assets and HTML file.
- `README.md`: This file.

## Component Descriptions

### `App.js`

Sets up routing and renders the main application components.

### `Navbar.js`

Displays the navigation bar with options to log in, register, and manage tasks.

### `TaskLists.js`

Fetches and displays the list of tasks. Handles task updates and deletions.

### `TaskRow.js`

Represents a single row in the task list table with actions for updating and deleting tasks.

### `TaskActions.js`

Provides buttons for updating and deleting tasks.

### `UpdateTask.js`

Allows users to update existing tasks.

### `TaskCreate.js`

Form for creating new tasks.

### `TaskDetail.js`

Displays detailed information about a selected task.

## Styling

- The application uses custom CSS for styling components, ensuring a consistent and polished look.
- CSS files are located in the `src/Components/*/css/` directory.

