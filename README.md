# PeopleFlow – Smart User Management Dashboard

## Overview

PeopleFlow is a modern and responsive User Management Dashboard built using React and Vite. The application allows administrators to view, search, filter, sort, add, edit, and delete users while consuming data from the JSONPlaceholder REST API.

---

## Features

* User listing with responsive table
* Search users by name or email
* Multi-field filtering

  * First Name
  * Last Name
  * Email
  * Department
* Sorting functionality
* Pagination (10, 25, 50, 100)
* Add user
* Edit user
* Delete user
* Form validation
* Toast notifications
* Error handling
* Dark/Light theme
* Responsive design

---

## Tech Stack

* React 18
* Vite
* JavaScript (ES6+)
* Axios
* CSS Modules
* React Icons
* React Toastify
* JSONPlaceholder API

---

## Project Structure

src/

* components/
* pages/
* hooks/
* services/
* context/
* styles/
* utils/

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

---

## API Used

JSONPlaceholder REST API:

https://jsonplaceholder.typicode.com/users

---

## Assumptions

* Since JSONPlaceholder is a mock API, Create, Update, and Delete operations do not persist after refreshing the application.
* Local React state is updated after successful API responses to simulate real-world CRUD operations.
* Departments are assigned dynamically for demonstration purposes.

---

## Challenges Faced

* Handling non-persistent CRUD operations with JSONPlaceholder.
* Splitting full names into first name and last name.
* Managing search, filter, sorting, and pagination simultaneously.
* Implementing a reusable component architecture.
* Supporting both dark and light themes.

---

## Future Improvements

* JWT Authentication
* Role-Based Access Control
* Node.js and PostgreSQL backend
* CSV and Excel export
* Bulk user operations
* Unit testing using Jest and React Testing Library
* Dashboard analytics
* User profile pages

---

## Learning Outcomes

This project strengthened my understanding of:

* React component architecture
* State management with Hooks
* API integration using Axios
* Reusable UI components
* Performance optimization using useMemo and useCallback
* Responsive design principles
* Scalable frontend application development
