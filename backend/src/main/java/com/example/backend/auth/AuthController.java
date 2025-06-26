package com.example.backend.auth;

import com.example.backend.dto.AuthRequest;
import com.example.backend.dto.AuthResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request, HttpServletResponse response) {
        String jwt = authService.register(request);
        setJwtCookie(response, jwt, 24 * 60 * 60); // 1 day expiry
        return ResponseEntity.ok(new AuthResponse("Registered and cookie set"));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request, HttpServletResponse response) {
        String jwt = authService.login(request);
        setJwtCookie(response, jwt, 24 * 60 * 60); // 1 day expiry
        return ResponseEntity.ok(new AuthResponse("Logged in and cookie set"));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        clearJwtCookie(response);
        return ResponseEntity.ok("Logged out successfully.");
    }

    // ===== KEY METHOD: Set Cookie for Vercel =====
    private void setJwtCookie(HttpServletResponse response, String jwt, int maxAge) {
        String cookieHeader = String.format(
                "jwt=%s; Path=/; Max-Age=%d; HttpOnly; Secure; SameSite=None", // No Domain attribute
                jwt,
                maxAge);
        response.addHeader("Set-Cookie", cookieHeader);
    }

    private void clearJwtCookie(HttpServletResponse response) {
        String cookieHeader = "jwt=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=None";
        response.addHeader("Set-Cookie", cookieHeader);
    }
}