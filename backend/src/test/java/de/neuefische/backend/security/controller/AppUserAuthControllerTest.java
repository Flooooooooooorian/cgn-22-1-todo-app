package de.neuefische.backend.security.controller;

import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.repository.AppUserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.reactive.server.WebTestClient;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AppUserAuthControllerTest {

    @Autowired
    WebTestClient webTestClient;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    AppUserRepository appUserRepository;

    @Value("${neuefische.todoapp.jwt.secret}")
    private String JWT_SECRET;

    @BeforeEach
    public void clearDb() {
        appUserRepository.deleteAll();
    }

    @Test
    void login_withValidCredentials_returnsJWT() {

        // GIVEN
        AppUser dummyUser = AppUser.builder()
                .username("test_username")
                .password(passwordEncoder.encode("some-password"))
                .build();

        appUserRepository.save(dummyUser);

        // WHEN
        String jwt = webTestClient.post()
                .uri("/auth/login")
                .bodyValue(dummyUser
                        .withPassword("some-password"))
                .exchange()
                .expectStatus().isOk()
                .expectBody(String.class)
                .returnResult()
                .getResponseBody();

        // THEN
        Claims claims = Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(jwt).getBody();
        assertEquals(claims.getSubject(), "test_username");
    }


    @Test
    void login_withWrongCredentials_returns4xxError() {

        // GIVEN
        AppUser dummyUser = AppUser.builder()
                .username("test_username")
                .password(passwordEncoder.encode("some-password"))
                .build();

        appUserRepository.save(dummyUser);

        // WHEN / THEN
        webTestClient.post()
                .uri("/auth/login")
                .bodyValue(dummyUser
                        .withPassword("WRONG_PASSWORD"))
                .exchange()
                .expectStatus().isEqualTo(HttpStatus.FORBIDDEN);
    }
}