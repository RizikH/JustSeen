# ---- Build Stage ----
FROM gradle:8.5-jdk21 AS build

WORKDIR /app

# Copy Gradle wrapper scripts and config
COPY gradlew .
COPY gradle gradle
COPY build.gradle settings.gradle ./

# Ensure gradlew is executable
RUN chmod +x gradlew

# Copy the rest of your source code
COPY . .

# Build the JAR
RUN ./gradlew bootJar

# ---- Run Stage ----
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy the built jar
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
