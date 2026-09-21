# 🎓 Student Management System

<p align="center">
  <img src="screenshots/Login Page.png" alt="Student Management System" width="900">
</p>

<h2 align="center">✨ Full-Stack Student Management System ✨</h2>

<p align="center">
  A modern web-based application for managing students, courses,
  attendance, fees, messages and administrator settings.
</p>

<p align="center">
  <b>Java • Spring Boot • Spring Data JPA • Hibernate • MySQL • HTML • CSS • JavaScript</b>
</p>

<p align="center">

![Java](https://img.shields.io/badge/Java-21-orange?style=for-the-badge&logo=openjdk)

![Spring Boot](https://img.shields.io/badge/Spring%20Boot-4.x-brightgreen?style=for-the-badge&logo=springboot)

![MySQL](https://img.shields.io/badge/MySQL-Database-blue?style=for-the-badge&logo=mysql)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-yellow?style=for-the-badge&logo=javascript)

![Git](https://img.shields.io/badge/Git-Version%20Control-orange?style=for-the-badge&logo=git)

![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)

</p>

---

# 📌 About The Project

**Student Management System** is a full-stack web application developed to manage common academic and administrative activities in one centralized system.

The project combines a modern frontend built with **HTML, CSS and Vanilla JavaScript** with a backend developed using **Java and Spring Boot**.

The application uses **Spring Data JPA and Hibernate** for database interaction and **MySQL** for persistent data storage.

The main purpose of this project is to demonstrate practical full-stack development concepts such as:

- REST API development
- CRUD operations
- Database integration
- Object-Oriented Programming
- Frontend-backend communication
- Form validation
- Dynamic dashboard
- Notification system
- Search and filtering
- Responsive UI design
- Git and GitHub workflow

---

# ✨ Key Features

| Module | Features |
|---|---|
| 🔐 Login | Admin login, password visibility, validation |
| 📊 Dashboard | Statistics, enrollment chart, recent students, quick actions |
| 👨‍🎓 Students | Add, search, filter, update and delete students |
| ➕ Add Student | Personal and academic information form |
| 📚 Courses | Complete course CRUD |
| 📅 Attendance | Mark and manage attendance |
| 💰 Fees | Fee payment and pending amount management |
| 💬 Messages | Send and manage student messages |
| ⚙️ Settings | Administrator profile and system settings |
| 🔔 Notifications | Automatic operation-based notifications |

---

# 🖥️ Application Screenshots

## 🔐 Login Module

<p align="center">
  <img src="screenshots/Login Page.png" alt="Login Page" width="950">
</p>

The Login module provides administrator access to the Student Management System.

### Features

- Admin username and password
- Password visibility toggle
- Empty-field validation
- Login API integration
- JSON request/response
- Successful login redirection
- Invalid credential handling

### Concepts Used

- HTML Forms
- CSS Styling
- Vanilla JavaScript
- DOM Manipulation
- Event Listeners
- Form Validation
- Fetch API
- HTTP POST Request
- JSON
- REST API Communication

---

## 📊 Dashboard

<p align="center">
  <img src="screenshots/Dashboard Page.png" alt="Dashboard Page" width="950">
</p>

The Dashboard provides a centralized overview of the complete Student Management System.

### Dashboard Statistics

- 👨‍🎓 Total Students
- 📚 Total Courses
- ✅ Active Students
- 💰 Fees Collected
- 📈 Student Enrollment
- 🧑‍🎓 Recent Students
- ⚡ Quick Actions
- 🔔 Notifications

### Dynamic Data

Dashboard information is retrieved directly from the Spring Boot backend using REST APIs.

### JavaScript Concepts Used

- DOM Manipulation
- `fetch()`
- `async/await`
- Promises
- `forEach()`
- `filter()`
- `sort()`
- `slice()`
- Array Processing
- Date Handling
- Dynamic HTML Generation
- Event Listeners
- Number Formatting

---

## 👨‍🎓 Students Management

<p align="center">
  <img src="screenshots/Student Module.png" alt="Students Module" width="950">
</p>

The Students module is used to manage complete student records stored in the database.

### Student Information

- Full Name
- Student ID
- Email
- Phone
- Gender
- Date of Birth
- Course
- Semester
- Admission Year
- Admission Date
- Address
- Status

### Features

- View students
- Search students
- Filter students by course
- Add student
- Edit student
- Delete student
- Dynamic table rendering
- Backend database integration

### Concepts Used

- HTML Tables
- Forms
- DOM Manipulation
- JavaScript Objects
- JavaScript Arrays
- Search Logic
- Filtering
- Event Handling
- Fetch API
- REST API
- CRUD Operations
- JSON Data

---

## ➕ Add Student Module

<p align="center">
  <img src="screenshots/Add Student Module Page.png" alt="Add Student Module" width="950">
</p>

The Add Student module provides a structured form for creating new student records.

### Personal Information

- Full Name
- Student ID
- Email
- Phone
- Gender
- Date of Birth

### Academic Information

- Course
- Admission Year
- Admission Date
- Semester
- Status
- Address

### Concepts Used

- HTML Forms
- Input Fields
- Select Dropdowns
- Date Inputs
- Required Fields
- JavaScript Validation
- Dynamic Course Loading
- JSON
- REST API
- HTTP POST Request
- Async/Await
- Error Handling

---

## 📚 Course Management

<p align="center">
  <img src="screenshots/Course Module Page.png" alt="Courses Module" width="950">
</p>

The Courses module provides complete CRUD functionality for managing courses.

### Course Information

- Course ID
- Course Name
- Course Code
- Duration
- Description

### Example Courses

- **BCA** — Bachelor of Computer Applications
- **BBA** — Bachelor of Business Administration
- **MCA** — Master of Computer Applications
- **MBA** — Master of Business Administration

### Features

- Add new course
- View all courses
- Update course
- Delete course
- Dynamic course list
- Database persistence

### CRUD Operations

```text
CREATE  → POST
READ    → GET
UPDATE  → PUT
DELETE  → DELETE

# 📚 Course Management

<p align="center">
  <img src="screenshots/Course Module Page.png" alt="Courses Module" width="950">
</p>

The Courses module provides complete CRUD functionality for managing courses.

## Course Information

- Course ID
- Course Name
- Course Code
- Duration
- Description

## Example Courses

- **BCA** — Bachelor of Computer Applications
- **BBA** — Bachelor of Business Administration
- **MCA** — Master of Computer Applications
- **MBA** — Master of Business Administration

## Features

- Add new course
- View all courses
- Update course
- Delete course
- Dynamic course list
- Database persistence

## CRUD Operations

```text
CREATE  → POST
READ    → GET
UPDATE  → PUT
DELETE  → DELETE

## Concepts Used

- Java Classes
- JPA Entity
- Repository Pattern
- REST Controller
- HTTP Methods
- JSON
- Fetch API
- CRUD Operations
- MySQL Database

---

# 📅 Attendance Management

<p align="center">
  <img src="screenshots/Attendance Module Page.png" alt="Attendance Module" width="950">
</p>

The Attendance module allows the administrator to mark and manage student attendance records.

## Attendance Information

- Student ID
- Student Name
- Date
- Attendance Status

## Attendance Status

```text
Present
Absent

# 💰 Fee Management

<p align="center">
  <img src="screenshots/Fees Module Page.png" alt="Fees Module" width="950">
</p>

The Fees module is used to manage student fee payments and payment records.

## Fee Information

- Student ID
- Student Name
- Total Fee
- Paid Amount
- Pending Amount
- Payment Date
- Payment Status

## Features

- Add fee payment
- View fee records
- Update payment details
- Delete payment records
- Calculate pending amount
- Manage payment status
- Database persistence
- Backend API integration
- Dashboard fee collection calculation

## Payment Status

- Paid
- Partial
- Pending

## Concepts Used

- HTML Forms
- JavaScript
- Number Handling
- DOM Manipulation
- Fetch API
- REST API
- JSON
- CRUD Operations
- Spring Boot
- Spring Data JPA
- Hibernate
- MySQL

---

# 💬 Messages Module

<p align="center">
  <img src="screenshots/Messages.png" alt="Messages Module Page" width="950">
</p>

The Messages module allows the administrator to send and manage messages for students.

## Message Information

- Student ID
- Student Name
- Subject
- Message
- Date

## Features

- Send message
- View messages
- Update message
- Delete message
- Dynamic message table
- Database persistence
- Backend API integration
- Notification generation

## Concepts Used

- HTML Forms
- JavaScript
- DOM Manipulation
- Event Handling
- Fetch API
- Async/Await
- JSON
- REST API
- CRUD Operations
- Spring Boot
- Spring Data JPA
- Hibernate
- MySQL

---

# ⚙️ Settings Module

<p align="center">
  <img src="screenshots/Settings Module Page.png" alt="Settings Module " width="950">
</p>

The Settings module allows the administrator to manage profile information and system preferences.

## 👤 Administrator Profile

- Administrator Name
- Email
- Phone Number
- System Name

## ⚙️ System Settings

- Email Notifications
- Auto Save
- System Preferences

## 🔐 Password Section

- Current Password
- New Password
- Confirm Password
- Password validation
- Password confirmation

## Features

- Load settings from database
- Update administrator profile
- Update system settings
- Form validation
- Save settings using REST API
- Database persistence
- Settings update notifications

## Concepts Used

- HTML Forms
- JavaScript
- DOM Manipulation
- Form Validation
- Regular Expressions
- Fetch API
- Async/Await
- JSON
- REST API
- CRUD Operations
- Spring Boot
- Spring Data JPA
- Hibernate
- MySQL

> Note: The current password section demonstrates frontend validation. Production-level password hashing and authentication security can be added as a future enhancement.

---

# 🔔 Notification System

The application includes a backend notification system that records important activities performed inside the application.

## Notification Types

- Student
- Course
- Attendance
- Fee
- Message
- Settings

## Automatic Notifications

Notifications are generated when:

- A new student is added
- A new course is added
- Attendance is marked
- A fee payment is added
- A new message is created
- Settings are added
- Settings are updated

## Notification Data

```text
id
title
message
type
date
isRead

# 🛠️ Technology Stack

## 🎨 Frontend Technologies

### HTML5

HTML5 is used to create the complete structure of the application.

### HTML Concepts Used

- Forms
- Input Fields
- Select Dropdowns
- Buttons
- Tables
- Navigation
- Links
- Sections
- Containers
- Semantic Structure
- Form Validation Attributes
- Date and Number Inputs

---

## 🎨 CSS3

CSS3 is used to design the complete user interface.

### CSS Concepts Used

- Flexbox
- CSS Grid
- Responsive Design
- Media Queries
- Gradients
- Glassmorphism
- Box Shadows
- Border Radius
- Transitions
- Hover Effects
- Custom Buttons
- Cards
- Tables
- Forms
- Navigation Styling
- Responsive Layouts

### 🎨 UI Design

The application follows a modern soft UI design using:

- Soft Blue
- Lavender
- Pink
- White
- Glassmorphism
- Rounded Cards
- Soft Shadows
- Clean Typography

---

# ⚡ Vanilla JavaScript

The frontend is developed using **Pure / Vanilla JavaScript** without React, Angular or Vue.

## JavaScript Concepts Used

- Variables
- `const` and `let`
- Functions
- Arrow Functions
- Objects
- Arrays
- Conditions
- Loops
- Array Methods
- DOM Manipulation
- Event Listeners
- Form Validation
- Regular Expressions
- Fetch API
- Promises
- Async/Await
- JSON
- Template Literals
- Date Handling
- String Methods
- Number Formatting
- Dynamic HTML
- Error Handling
- Page Navigation

## Important Array Methods

```javascript
forEach()
filter()
sort()
slice()

const response = await fetch(
    "http://localhost:8080/api/students"
);

const students = await response.json();

await fetch("http://localhost:8080/api/students", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(studentData)
});


☕ Java Backend

The backend is developed using Java 21.

Java Concepts Used
Object-Oriented Programming
Classes
Objects
Encapsulation
Methods
Constructors
Interfaces
Getters and Setters
Private Fields
Dependency Injection
Exception Handling Concepts
🧠 Object-Oriented Programming

The project demonstrates important OOP concepts.

Main Java Classes
Student
Course
Attendance
Fee
Message
Login
Notification
AdminSettings
Encapsulation

Private fields are accessed through getters and setters.

private String name;

public String getName() {
    return name;
}

public void setName(String name) {
    this.name = name;
}
Interfaces

Spring Data repositories are defined using interfaces.

public interface StudentRepository
        extends JpaRepository<Student, Integer> {
}
Constructors

Constructors are used for dependency injection.

public StudentController(
        StudentRepository studentRepository,
        NotificationRepository notificationRepository) {

    this.studentRepository = studentRepository;
    this.notificationRepository = notificationRepository;
}
🌱 Spring Boot

Spring Boot is used to develop the backend REST APIs.

Spring Boot Concepts Used
Spring Web
REST Controllers
Dependency Injection
Spring Data JPA
Repository Pattern
Entity Mapping
JSON Request/Response
CORS
CRUD APIs
HTTP Methods
REST Controller Annotations
@RestController
@RequestMapping
@GetMapping
@PostMapping
@PutMapping
@DeleteMapping
@CrossOrigin

****
# 🔗 JPA / Hibernate

The project uses **Spring Data JPA** and **Hibernate** to connect Java objects with the MySQL database.

## JPA Concepts Used

- Entity Mapping
- Primary Key
- Auto Increment ID
- Repository Pattern
- Object Relational Mapping (ORM)
- Database Persistence
- CRUD Operations

## JPA Annotations Used

```java
@Entity
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
@Column
@Entity
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;
    private String email;
    private String course;
}

}
🔗 REST API

The frontend communicates with the Spring Boot backend through REST APIs.

Student API

GET     /api/students
POST    /api/students
GET     /api/students/{id}
PUT     /api/students/{id}
DELETE  /api/students/{id}

GET     /api/attendance
POST    /api/attendance
GET     /api/attendance/{id}
PUT     /api/attendance/{id}
DELETE  /api/attendance/{id}

p align="center">
💗 Built with Java, Spring Boot, MySQL, HTML, CSS & JavaScript

If you like this project, consider giving the repository a ⭐

</p>











