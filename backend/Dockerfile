# ---- Build Stage ----
FROM gradle:8.5-jdk21 AS build

WORKDIR /app

# Copy only what's needed first to leverage Docker cache
COPY gradle gradle
COPY gradlew .
COPY build.gradle settings.gradle ./
RUN chmod +x gradlew

# Now copy the rest of the source code
COPY . .

# Build the JAR
RUN ./gradlew bootJar

# ---- Run Stage ----
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
