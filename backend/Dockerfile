# Use Java 21 base image
FROM eclipse-temurin:21-jdk

# Set working directory
WORKDIR /app

# Copy built jar (assumes you've already run `./gradlew build`)
COPY build/libs/*.jar app.jar

# Expose the port used by Spring Boot
EXPOSE 8080

# Run the jar file
CMD ["java", "-jar", "app.jar"]
