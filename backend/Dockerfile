# ---- Build Stage ----
FROM gradle:8.5-jdk21 AS build

WORKDIR /app

# Copy only what's needed
COPY gradle gradle
COPY gradlew .
COPY build.gradle settings.gradle ./

# Build the JAR
RUN ./gradlew bootJar

# ---- Run Stage ----
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy the built JAR from the previous stage
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
