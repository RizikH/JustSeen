package com.example.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.util.Base64;

@Component
public class EncryptionKeyProvider {

    private final SecretKeySpec secretKey;

    public EncryptionKeyProvider(@Value("${encryption.key}") String base64Key) {
        byte[] decoded = Base64.getDecoder().decode(base64Key);
        if (decoded.length != 16) {
            throw new IllegalArgumentException("AES-128 key must be 16 bytes");
        }
        this.secretKey = new SecretKeySpec(decoded, "AES");
    }

    public SecretKeySpec getKey() {
        return secretKey;
    }
}
