# Use an official Maven image to build the application
FROM maven:3.9.4-eclipse-temurin-23 AS build

# Set the working directory inside the container for the build process
WORKDIR /app

# Copy the Maven project files into the container
COPY . .

# Run Maven to clean and build the project
RUN mvn clean install -DskipTests

# Use an official JDK image for the final application runtime
FROM eclipse-temurin:23-jdk

# Set the working directory inside the container for the runtime
WORKDIR /app

# Copy the built JAR file from the Maven build stage
COPY --from=build /app/target/bloodmanagementsystem-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your Spring Boot app uses
EXPOSE 8080

# Run the Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
