# Rehab Click Backend

<p align="center">
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
  <img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101" alt="Socket.io" />
</p>

## Description

**Rehab Click Backend** is a comprehensive rehabilitation platform API built with NestJS and TypeScript. This backend provides a complete solution for managing therapist-patient relationships, exercise routines, appointments, real-time chat, and more.

### 🚀 Key Features

- **JWT Authentication System** - Secure access with refresh tokens
- **User Management** - Support for therapists and patients with distinct roles
- **Real-time Chat** - WebSocket-based messaging system
- **Exercise & Routine Management** - Video uploads and structured workout plans
- **Appointment Scheduling** - Complete appointment management system
- **File Upload Integration** - Supabase storage for images and videos
- **Therapist-Patient Relationships** - Managed connections and assignments
- **Pricing Plans** - Flexible pricing for therapist services

## 🏗️ Architecture

### Modules Structure

```
src/
├── Auth/              # JWT Authentication System
├── Users/             # User Management (Therapists & Patients)
├── Chat/              # Real-time WebSocket Messaging
├── Exercise/          # Exercise Management with Video Upload
├── Routine/           # Workout Routine Management
├── Exercise-Routine/  # Exercise-Routine Junction
├── Routine-Recurrence/# Routine Scheduling & Recurrence
├── Therapist-Patient/ # Therapist-Patient Relationships
├── Therapist-Plans/   # Pricing Plans for Therapists
├── Appointments/      # Appointment Scheduling
├── Prisma/           # Database Service
└── Supabase/         # File Storage Service
```

### Database Schema

The application uses PostgreSQL with Prisma ORM. Key entities include:

- **Usuarios** - Base user entity (therapists and patients)
- **Terapeutas** - Therapist-specific data (experience, title)
- **Pacientes** - Patient-specific data
- **Terapeuta_Paciente** - Therapist-patient relationships
- **Ejercicio** - Exercise definitions with video URLs
- **Rutina** - Workout routines assigned to patients
- **Ejercicio_Rutina** - Exercise-routine associations
- **Recurrencia_Rutina** - Routine scheduling and recurrence
- **PlanesTerapeuta** - Therapist pricing plans
- **Mensajes** - Chat messages between users
- **Citas** - Appointment scheduling

## 🛠️ Technology Stack

- **Framework**: NestJS 11.x
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma 6.x
- **Authentication**: JWT with Passport.js
- **Real-time**: Socket.io WebSockets
- **File Storage**: Supabase
- **Validation**: Class Validator & Class Transformer

## 📋 Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Supabase account (for file storage)

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/rehab_click_db"
DIRECT_URL="postgresql://username:password@localhost:5432/rehab_click_db"

# JWT
JWT_SECRET="your-jwt-secret-key"
REFRESH_JWT_SECRET="your-refresh-jwt-secret-key"

# Supabase
SUPABASE_URL="your-supabase-url"
SUPABASE_KEY="your-supabase-anon-key"

# Server
PORT=3000
```

## 🚀 Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd rehab-click-backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
```bash
# Copy the environment template
cp .env.example .env
# Edit .env with your actual values
```

### 4. Set up the database
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed the database
npx prisma db seed
```

### 5. Start the application
```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run start:prod
```

The server will start on `http://localhost:3000` (or the port specified in your `.env` file).

## 📚 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/login` | User login | No |
| POST | `/auth/refresh` | Refresh JWT token | No |

### User Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/users` | Create new user | No |
| GET | `/users/:id` | Get user by ID | Yes |
| PUT | `/users/:id` | Update user | Yes |
| POST | `/users/upload-photo/:id` | Upload user photo | Yes |
| GET | `/users/therapists` | Get all therapists | Yes |
| GET | `/users/patients` | Get all patients | Yes |

### Chat System

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/chat/messages/:userId1/:userId2` | Get chat messages | Yes |
| WebSocket | `/chat` | Real-time messaging | Yes |

### Exercise Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/exercise` | Create exercise with video | Yes |
| GET | `/exercise` | Get all exercises | Yes |
| GET | `/exercise/:id` | Get exercise by ID | Yes |
| PUT | `/exercise/:id` | Update exercise | Yes |
| DELETE | `/exercise/:id` | Delete exercise | Yes |

### Routine Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/routine` | Create routine | Yes |
| GET | `/routine` | Get all routines | Yes |
| GET | `/routine/:id` | Get routine by ID | Yes |
| PUT | `/routine/:id` | Update routine | Yes |
| DELETE | `/routine/:id` | Delete routine | Yes |

### Therapist-Patient Relationships

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/therapist-patient` | Create relationship | Yes |
| GET | `/therapist-patient` | Get all relationships | Yes |
| PUT | `/therapist-patient/:id` | Update relationship | Yes |
| DELETE | `/therapist-patient/:id` | Delete relationship | Yes |

### Appointments

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/appointment` | Create appointment | Yes |
| GET | `/appointment` | Get all appointments | Yes |
| GET | `/appointment/:id` | Get appointment by ID | Yes |
| PUT | `/appointment/:id` | Update appointment | Yes |
| DELETE | `/appointment/:id` | Delete appointment | Yes |

### Therapist Plans

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/therapist-plans` | Create pricing plan | Yes |
| GET | `/therapist-plans` | Get all plans | Yes |
| PUT | `/therapist-plans/:id` | Update plan | Yes |
| DELETE | `/therapist-plans/:id` | Delete plan | Yes |

## 🔐 Authentication Flow

1. **User Registration/Login**: Users can register as either therapists or patients
2. **JWT Token**: Successful login returns an access token (15 min) and refresh token (7 days)
3. **Protected Routes**: Most endpoints require a valid JWT token in the Authorization header
4. **Token Refresh**: Use the refresh token to obtain new access tokens

### Example Authentication Request

```bash
# Login
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "correo": "user@example.com",
    "password": "password123"
  }'

# Use token in subsequent requests
curl -X GET http://localhost:3000/users/1 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## 🔄 WebSocket Events (Chat)

### Client to Server Events

| Event | Description | Payload |
|-------|-------------|---------|
| `joinRoom` | Join a chat room | `{ room: string }` |
| `leaveRoom` | Leave a chat room | `{ room: string }` |
| `sendMessage` | Send a message | `{ senderId: number, receiverId: number, message: string }` |

### Server to Client Events

| Event | Description | Payload |
|-------|-------------|---------|
| `messageReceived` | New message received | `{ id: number, message: string, senderId: number, receiverId: number, timestamp: Date }` |
| `userJoined` | User joined room | `{ userId: number, room: string }` |
| `userLeft` | User left room | `{ userId: number, room: string }` |

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov

# Watch mode
npm run test:watch
```

## 🐳 Docker Deployment (Optional)

```dockerfile
# Dockerfile example
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
```

```yaml
# docker-compose.yml example
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/rehab_click_db
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: rehab_click_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

## 🔧 Development Commands

```bash
# Start development server
npm run start:dev

# Build the project
npm run build

# Format code
npm run format

# Lint code
npm run lint

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# View database in Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset
```

## 📁 Project Structure

```
rehab-click-backend/
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Database migrations
├── src/
│   ├── Appointments/          # Appointment management
│   ├── Auth/                  # Authentication system
│   ├── Chat/                  # Real-time messaging
│   ├── Exercise/              # Exercise management
│   ├── Exercise-Routine/      # Exercise-routine associations
│   ├── Prisma/               # Database service
│   ├── Routine/              # Routine management
│   ├── Routine-Recurrence/   # Routine scheduling
│   ├── Supabase/             # File storage service
│   ├── Therapist-Patient/    # Relationship management
│   ├── Therapist-Plans/      # Pricing plans
│   ├── Users/                # User management
│   ├── app.module.ts         # Main application module
│   └── main.ts               # Application entry point
├── uploads/                   # Local file uploads (if used)
├── test/                     # Test files
├── package.json              # Project dependencies
└── README.md                 # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the UNLICENSED License - see the package.json file for details.

## 🆘 Support & Contact

For support, please contact the development team or create an issue in the repository.

## 🔄 API Response Format

All API endpoints return responses in the following format:

### Success Response
```json
{
  "status": "success",
  "data": {
    // Response data here
  },
  "message": "Operation completed successfully"
}
```

### Error Response
```json
{
  "status": "error",
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": {} // Additional error details if available
  }
}
```

## 🎯 Future Enhancements

- [ ] Email notifications for appointments
- [ ] Push notifications
- [ ] Advanced analytics and reporting
- [ ] Multi-language support
- [ ] Video call integration for remote sessions
- [ ] Payment gateway integration
- [ ] Mobile app API optimizations
