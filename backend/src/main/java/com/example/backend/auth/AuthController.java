package com.example.backend.auth;

import com.example.backend.dto.AuthRequest;
import com.example.backend.dto.AuthResponse;
import jakarta.servlet.http.Cookie;
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
        response.addCookie(createJwtCookie(jwt));
        return ResponseEntity.ok(new AuthResponse("Registered and cookie set"));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request, HttpServletResponse response) {
        String jwt = authService.login(request);
        response.addCookie(createJwtCookie(jwt));
        return ResponseEntity.ok(new AuthResponse("Logged in and cookie set"));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", "");
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        cookie.setAttribute("SameSite", "None");

        response.addCookie(cookie);
        return ResponseEntity.ok("Logged out successfully.");
    }

    private Cookie createJwtCookie(String jwt) {
        Cookie cookie = new Cookie("jwt", jwt);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(24 * 60 * 60);
        cookie.setAttribute("SameSite", "None");
        return cookie;
    }

}
