# ---- Build Stage ----
FROM gradle:8.5-jdk21 AS build

WORKDIR /app

# Cache dependencies first
COPY build.gradle settings.gradle gradlew ./  
COPY gradle ./gradle

RUN chmod +x gradlew
RUN ./gradlew dependencies

# NOW copy the rest of the source code
COPY . .

# THEN build the jar with source included
RUN ./gradlew bootJar

# ---- Run Stage ----
FROM eclipse-temurin:21-jdk

WORKDIR /app

# Copy only the final jar
COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080

CMD ["java", "-jar", "app.jar"]
