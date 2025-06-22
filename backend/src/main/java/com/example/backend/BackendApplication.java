package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		System.out.println("🔍 DB_URL = " + System.getenv("DB_URL"));
		System.out.println("🔍 DB_USER = " + System.getenv("DB_USER"));
		System.out.println("🔍 DB_PASSWORD = " + System.getenv("DB_PASSWORD")); // Optional
		SpringApplication.run(BackendApplication.class, args);
	}

}
