# ---- Build Stage ----
FROM gradle:8.5-jdk21 AS build

WORKDIR /app

# Only copy things needed for dependency resolution first (for better layer caching)
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle

RUN chmod +x gradlew
RUN ./gradlew dependencies

# Copy the rest of the app
COPY . .

# Build the JAR
RUN ./gradlew bootJar

# ---- Run Stage ----
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy only the built JAR
COPY --from=build /app/build/libs/*.jar app.jar

# Set the port explicitly (for Fly.io to bind to)
EXPOSE 8080

# Start Spring Boot
CMD ["java", "-jar", "app.jar"]
