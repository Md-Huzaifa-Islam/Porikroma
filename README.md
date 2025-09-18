# Travel Application - Full Stack

A complete travel application built with **React + TypeScript** (Frontend) and **Java Spring Boot** (Backend) with MySQL database.

## 🏗️ Architecture

### Backend (Spring Boot)

- **Java 21** with Spring Boot 3.2
- **MySQL** database with JPA/Hibernate
- **REST API** endpoints
- **Spring Security** for authentication
- **Maven** for dependency management

### Frontend (React + Vite)

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Vite** for fast development

### Database Entities

- **User** - User accounts and authentication
- **Trip** - Travel trips and itineraries
- **Destination** - Travel destinations
- **Accommodation** - Hotels and lodging
- **Transportation** - Travel options
- **Local Services** - Local guides and services
- **Expenses** - Trip expenses tracking
- **Ratings** - User ratings and reviews
- **Messages** - User communications
- **Bookings** - Reservation management

## 🚀 Quick Start

### Prerequisites

```bash
# Required software
- Java 21+
- Maven 3.6+
- Node.js 18+
- npm 9+
- MySQL 8+
```

### 1. Clone and Setup

```bash
cd /home/md-huzaifa-islam/Downloads/project
```

### 2. MySQL Setup

```bash
# Install MySQL (if not already installed)
sudo apt update
sudo apt install mysql-server

# Start MySQL service
sudo systemctl start mysql
sudo systemctl enable mysql

# Secure MySQL installation
sudo mysql_secure_installation

# Create database and user
sudo mysql -u root -p
```

In MySQL console:

```sql
CREATE DATABASE travel_app;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'i am not a hacker';
FLUSH PRIVILEGES;
EXIT;
```

### 3. Start Application

#### Option A: Use the automated script

```bash
./start.sh
```

#### Option B: Manual startup

**Start Backend:**

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

**Start Frontend (in new terminal):**

```bash
cd frontend
npm install
npm run dev
```

## 🌐 Access Points

- **Frontend Application**: http://localhost:5173
- **Backend API**: http://localhost:8080/api
- **API Documentation**: http://localhost:8080/api/swagger-ui.html (if configured)

## 📚 API Endpoints

### Authentication

- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Users

- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Trips

- `GET /api/trips` - Get all trips
- `POST /api/trips` - Create new trip
- `GET /api/trips/{id}` - Get trip by ID
- `PUT /api/trips/{id}` - Update trip
- `DELETE /api/trips/{id}` - Delete trip

### Destinations

- `GET /api/destinations` - Get all destinations
- `POST /api/destinations` - Create destination
- `GET /api/destinations/search` - Search destinations

## 🔧 Configuration

### Backend Configuration

File: `backend/src/main/resources/application.properties`

```properties
# Database
spring.datasource.url=jdbc:mysql://localhost:3306/travel_app?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=i am not a hacker

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true

# Server
server.port=8080

# CORS
spring.web.cors.allowed-origins=http://localhost:5173
```

### Frontend Configuration

File: `frontend/src/services/apiClient.ts`

```typescript
const API_BASE_URL = "http://localhost:8080/api";
```

## 🛠️ Development

### Backend Development

```bash
cd backend
mvn spring-boot:run
# Backend runs on http://localhost:8080
```

### Frontend Development

```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

### Build for Production

```bash
# Backend
cd backend
mvn clean package

# Frontend
cd frontend
npm run build
```

## 📁 Project Structure

```
travel-app/
├── backend/                 # Spring Boot backend
│   ├── src/main/java/com/travelapp/
│   │   ├── entity/         # JPA entities
│   │   ├── repository/     # Data repositories
│   │   ├── service/        # Business logic
│   │   ├── controller/     # REST controllers
│   │   └── config/         # Configuration
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── services/       # API services
│   │   ├── contexts/       # React contexts
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
├── start.sh               # Automated startup script
└── README.md
```

## 🐛 Troubleshooting

### Common Issues

1. **MySQL Connection Failed**

   ```bash
   # Check MySQL status
   sudo systemctl status mysql

   # Reset MySQL password
   sudo mysql -u root -p
   ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'i am not a hacker';
   ```

2. **Backend Build Errors**

   ```bash
   # Clean and rebuild
   cd backend
   mvn clean install -DskipTests
   ```

3. **Frontend Dependencies Issues**

   ```bash
   # Clear node_modules and reinstall
   cd frontend
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **CORS Errors**
   - Ensure backend allows `http://localhost:5173` in CORS configuration
   - Check that both servers are running on correct ports

### Logs and Debugging

**Backend Logs:**

```bash
cd backend
mvn spring-boot:run
# Logs appear in terminal
```

**Frontend Logs:**

```bash
cd frontend
npm run dev
# Check browser console for client-side errors
```

**Database Logs:**

```bash
# MySQL error logs
sudo tail -f /var/log/mysql/error.log
```

## 🎯 Features Implemented

- ✅ User authentication (login/register)
- ✅ RESTful API with Spring Boot
- ✅ MySQL database with proper relationships
- ✅ React frontend with TypeScript
- ✅ Responsive design with Tailwind CSS
- ✅ API integration between frontend and backend
- ✅ Error handling and loading states
- ✅ Modern UI with animations

## 🔜 Future Enhancements

- JWT token authentication
- File upload for user avatars
- Real-time messaging
- Payment integration
- Google Maps integration
- Email notifications
- Mobile app (React Native)

## 📧 Support

For issues and questions, please check the troubleshooting section above or create an issue in the project repository.
