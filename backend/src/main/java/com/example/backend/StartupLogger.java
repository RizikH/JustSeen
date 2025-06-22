package com.example.backend;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class StartupLogger implements CommandLineRunner {

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUser;

    @Override
    public void run(String... args) {
        System.out.println("✅ Resolved DB URL: " + dbUrl);
        System.out.println("✅ Resolved DB User: " + dbUser);
    }
}
