# 🏛️ Grievance Reporter System

> A comprehensive public grievance management platform built with Spring Boot and React

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://grievance-reporter.vercel.app)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.5-green)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18.x-blue)](https://react.dev)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🎯 Overview

The **Grievance Reporter System** is a full-stack web application designed to streamline the process of filing, tracking, and resolving public grievances. It provides a transparent platform where citizens can report issues to relevant government departments and track their resolution status in real-time.

### Key Highlights
- ✅ Secure user authentication and authorization
- ✅ Real-time grievance tracking
- ✅ Email notifications for status updates
- ✅ Admin dashboard for grievance management
- ✅ Department-wise categorization
- ✅ Docker containerization for easy deployment

## ✨ Features

### For Citizens
- 📝 **Submit Grievances**: File complaints with detailed descriptions and categorization
- 🔍 **Track Status**: Monitor grievance resolution progress in real-time
- 📧 **Email Notifications**: Receive updates on grievance status changes
- 📊 **Dashboard**: View all submitted grievances and their current status
- 🔐 **Secure Access**: Protected user accounts with authentication

### For Administrators
- 👥 **User Management**: Manage citizen accounts and permissions
- 📋 **Grievance Management**: Review, assign, and update grievance status
- 📈 **Analytics Dashboard**: View statistics and insights
- 🏢 **Department Management**: Organize grievances by departments
- ✉️ **Notification System**: Send automated email updates to users

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
│  ┌───────────────────────────────────────────────────────┐ │
│  │           React + Vite Frontend (Port 80)             │ │
│  │  • Landing Page  • Login/Register  • Dashboard       │ │
│  │  • Grievance Form  • Admin Panel  • User Profile     │ │
│  └───────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP/REST API
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                      APPLICATION LAYER                       │
│  ┌───────────────────────────────────────────────────────┐ │
│  │      Spring Boot Backend (Port 8080)                  │ │
│  │  ┌─────────────┐  ┌──────────────┐  ┌─────────────┐ │ │
│  │  │ Controllers │──│   Services   │──│ Repositories│ │ │
│  │  └─────────────┘  └──────────────┘  └─────────────┘ │ │
│  │       │                  │                   │        │ │
│  │       ├─ AuthController  ├─ UserService      │        │ │
│  │       ├─ GrievanceCtrl   ├─ GrievanceService │        │ │
│  │       └─ TestController  └─ EmailService     │        │ │
│  │                                                        │ │
│  │  Security: Spring Security + JWT                      │ │
│  │  Email: Spring Mail (Gmail SMTP)                      │ │
│  └───────────────────────────────────────────────────────┘ │
└──────────────────────────┬──────────────────────────────────┘
                           │ JDBC
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                       DATABASE LAYER                         │
│  ┌───────────────────────────────────────────────────────┐ │
│  │         MySQL / PostgreSQL Database                   │ │
│  │  • Users  • Grievances  • Departments  • Status      │ │
│  └───────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘

                    🐳 Docker Containerization
          ┌──────────────────┐  ┌──────────────────┐
          │ Backend Container│  │ Frontend Container│
          │  (Spring Boot)   │  │   (Nginx + React)│
          └──────────────────┘  └──────────────────┘
                    Docker Bridge Network
```

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 3.2.5
- **Language**: Java 17
- **Build Tool**: Maven
- **Database**: MySQL / PostgreSQL
- **Security**: Spring Security
- **Email**: Spring Mail (Gmail SMTP)
- **ORM**: Spring Data JPA

### Frontend
- **Framework**: React 18.x
- **Build Tool**: Vite
- **Styling**: Tailwind CSS / CSS
- **State Management**: React Context API
- **HTTP Client**: Axios / Fetch API
- **Routing**: React Router

### DevOps
- **Containerization**: Docker & Docker Compose
- **Deployment**: Vercel (Frontend), Render/Railway (Backend)
- **Version Control**: Git & GitHub

## 🚀 Getting Started

### Prerequisites
- Java 17 or higher
- Node.js 16.x or higher
- Maven 3.6+
- MySQL 8.0+ or PostgreSQL 12+
- Docker & Docker Compose (optional)

### Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/Sachin23991/grievance-reporter.git
cd grievance-reporter
```

#### 2. Setup Backend

**Configure Database**

Create a MySQL database:
```sql
CREATE DATABASE grievance_db;
```

Update `backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/grievance_db
spring.datasource.username=your_username
spring.datasource.password=your_password

# Gmail SMTP Configuration
spring.mail.username=your_email@gmail.com
spring.mail.password=your_app_password
```

**Build and Run Backend**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend will run on `http://localhost:8080`

#### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173`

### 🐳 Docker Deployment

**Run with Docker Compose**:
```bash
docker-compose up --build
```

This will start:
- Backend on `http://localhost:8080`
- Frontend on `http://localhost:80`

**Stop containers**:
```bash
docker-compose down
```

## 📁 Project Structure

```
grievance-reporter/
├── backend/
│   ├── src/main/java/com/grievance/
│   │   ├── config/          # Security & app configuration
│   │   ├── controller/      # REST API controllers
│   │   │   ├── AuthController.java
│   │   │   ├── GrievanceController.java
│   │   │   └── TestController.java
│   │   ├── entity/          # JPA entities
│   │   ├── repository/      # Data access layer
│   │   ├── service/         # Business logic
│   │   └── App.java         # Main application
│   ├── src/main/resources/
│   │   └── application.properties
│   ├── Dockerfile
│   └── pom.xml
├── frontend/
│   ├── src/
│   │   ├── assets/          # Images & static files
│   │   ├── components/      # Reusable React components
│   │   ├── context/         # React Context for state
│   │   ├── pages/           # Page components
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── GrievanceForm.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
└── README.md
```

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "SecurePass123"
}
```

### Grievance Endpoints

#### Submit Grievance
```http
POST /api/grievances
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "Street Light Not Working",
  "description": "Street light on Main St has been out for 2 weeks",
  "department": "Public Works",
  "priority": "HIGH"
}
```

#### Get All Grievances
```http
GET /api/grievances
Authorization: Bearer {token}
```

#### Get Grievance by ID
```http
GET /api/grievances/{id}
Authorization: Bearer {token}
```

#### Update Grievance Status (Admin)
```http
PUT /api/grievances/{id}/status
Authorization: Bearer {admin_token}
Content-Type: application/json

{
  "status": "IN_PROGRESS",
  "remarks": "Assigned to field team"
}
```

#### Delete Grievance (Admin)
```http
DELETE /api/grievances/{id}
Authorization: Bearer {admin_token}
```

## 🌐 Deployment

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variable:
   ```
   VITE_API_URL=https://your-backend-url.com
   ```

### Backend (Render/Railway)

1. Connect your GitHub repository
2. Set build command: `mvn clean install`
3. Set start command: `java -jar target/grievance-backend-1.0-SNAPSHOT.jar`
4. Add environment variables:
   ```
   DB_URL=your_database_url
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   SPRING_MAIL_USERNAME=your_email
   SPRING_MAIL_PASSWORD=your_app_password
   ```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/YourFeature`
3. Commit changes: `git commit -m 'Add YourFeature'`
4. Push to branch: `git push origin feature/YourFeature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Sachin Rao**
- GitHub: [@Sachin23991](https://github.com/Sachin23991)
- Project Link: [https://grievance-reporter.vercel.app](https://grievance-reporter.vercel.app)

## 🙏 Acknowledgments

- Spring Boot Documentation
- React Documentation
- Docker Documentation
- All open-source contributors

---

<div align="center">
  <p>Made with ❤️ for better governance</p>
  <p>⭐ Star this repo if you find it useful!</p>
</div>
