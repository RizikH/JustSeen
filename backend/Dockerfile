# ---- Build Stage ----
FROM gradle:8.5-jdk21 AS build

# Set working directory
WORKDIR /app

# Copy Gradle files first to leverage Docker cache
COPY gradle gradle
COPY build.gradle settings.gradle ./
COPY backend backend

# Build the JAR
RUN cd backend && ./gradlew bootJar

# ---- Run Stage ----
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy the generated JAR from the build stage
COPY --from=build /app/backend/build/libs/*.jar app.jar
COPY backend/gradlew backend/gradlew
COPY backend/gradle backend/gradle


EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
