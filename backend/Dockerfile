# ---- Build Stage ----
FROM gradle:8.5-jdk21 AS build

WORKDIR /app

# Set up Gradle build files
COPY build.gradle settings.gradle ./
COPY gradle gradle

# Copy gradlew script separately and ensure executable
COPY gradlew ./gradlew
RUN chmod +x ./gradlew

# Now copy the rest of the project
COPY . .

# Build the JAR
RUN ./gradlew bootJar

# ---- Run Stage ----
FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
