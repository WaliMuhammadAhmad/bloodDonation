# HELP.md

## Project Overview

This project is a multi-container application that uses Docker to manage a frontend, backend, and database. The `Dockerfile` is designed to create a unified environment for running the application, which includes Node.js, Java, MySQL, and Ubuntu-based utilities.

---

## Dockerfile

The `Dockerfile` uses a multi-stage build process with the following stages:

1. **Node.js Base**: Provides Node.js for frontend development.
2. **Java Base**: Provides OpenJDK for running the Spring Boot backend.
3. **MySQL Base**: Provides MySQL for database operations.
4. **Ubuntu Base**: Provides additional utilities and dependencies.

### Key Features

- Installs required tools like `git`, `curl`, and `unzip`.
- Copies dependencies from the Node.js, Java, and MySQL stages.
- Sets up a workspace directory for the application.
- Includes a custom Git setup script (`setup-git.sh`).
- Exposes ports `5173`, `8080`, and `3306` for frontend, backend, and database, respectively.

---

## Instructions

1. **Build the Docker Image**:

   ```bash
   docker build -t blood-donation-app .
   ```

2. **Run the Application**:
   Use the following command to start the application:

   ```bash
   docker-compose up
   ```

3. **Access the Application**:
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:8080](http://localhost:8080)
   - Database: Accessible on port `3306`.

---

## Custom Scripts

### `setup-git.sh`

This script is used to configure Git for the project. It is copied into the Docker image and executed during the build process.

---

## Development Workflow

1. **Pull Latest Changes**:
   The `CMD` in the `Dockerfile` ensures the latest changes are pulled from the repository:

   ```bash
   git pull
   ```

2. **Frontend Build**:
   The frontend is built using:

   ```bash
   npm run build
   ```

3. **Backend Execution**:
   The Spring Boot backend is started using:

   ```bash
   ./mvnw spring-boot:run
   ```

---

## Notes

- Ensure Docker and Docker Compose are installed on your system.
- Modify the `docker-compose.yml` file if you need to customize the container configuration.
- For database migrations or custom SQL scripts, place them in the `sql` folder.
- The following environment variables are used in the `docker-compose.yml` file:
  - `SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/bloodmanagementsystem`
  - `SPRING_DATASOURCE_USERNAME=user`
  - `SPRING_DATASOURCE_PASSWORD=password`
  - `MYSQL_ROOT_PASSWORD=root`
  - `MYSQL_DATABASE=bloodmanagementsystem`
  - `MYSQL_USER=user`
  - `MYSQL_PASSWORD=password`

---
