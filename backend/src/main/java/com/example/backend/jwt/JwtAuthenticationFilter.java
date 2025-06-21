package com.example.backend.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println("🔍 JwtAuthenticationFilter triggered");

        String token = null;

        // 🔍 Look for the JWT cookie
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("jwt".equals(cookie.getName())) {
                    token = cookie.getValue();
                    System.out.println("✅ JWT cookie found: " + token);
                    break;
                }
            }
        }

        // ✅ If token exists and user not already authenticated
        if (token != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            if (jwtUtil.validateToken(token)) {
                String email = jwtUtil.validateTokenAndGetEmail(token);
                System.out.println("✅ JWT is valid. Email extracted: " + email);

                // ➕ Add role for authorization (required to avoid 403s)
                List<SimpleGrantedAuthority> authorities = Collections.singletonList(
                        new SimpleGrantedAuthority("ROLE_USER")
                );

                UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(email, null, authorities);

                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(auth);

                System.out.println("🔐 Security context updated with user: " + email);
            } else {
                System.out.println("❌ Invalid JWT token.");
            }
        }

        filterChain.doFilter(request, response);
    }
}
