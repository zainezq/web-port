# Use an OpenJDK base image
FROM openjdk:21-jdk-slim
# Set the working directory
WORKDIR /app
# Copy the built JAR file
COPY target/web-port-0.0.1-SNAPSHOT.jar app.jar
# Expose port 8080
EXPOSE 9000
# Run the application
CMD ["java", "-jar", "app.jar"]
