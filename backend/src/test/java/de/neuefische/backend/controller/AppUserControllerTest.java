package de.neuefische.backend.controller;

import de.neuefische.backend.dto.AppUserDto;
import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.repository.AppUserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.reactive.server.WebTestClient;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AppUserControllerTest {

    @Autowired
    private WebTestClient webTestClient;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AppUserRepository appUserRepository;


    private String dummyJwt;


    @BeforeEach
    public void clearDb() {
        appUserRepository.deleteAll();

        dummyJwt = generateJwt();
    }

    @Test
    void getLoggedInUser() {
        // GIVEN
        AppUserDto expectedUserDto = new AppUserDto("test_username");

        // WHEN
        AppUserDto actualUserDto = webTestClient.get()
                .uri("/api/user/me")
                .headers(http -> http.setBearerAuth(dummyJwt))
                .exchange()
                .expectStatus().isOk()
                .expectBody(AppUserDto.class)
                .returnResult()
                .getResponseBody();

        // THEN
        assertEquals(expectedUserDto, actualUserDto);
    }


    private String generateJwt() {
        String hashedPassword = passwordEncoder.encode("some-password");
        AppUser dummyUser = AppUser.builder()
                .username("test_username")
                .password(hashedPassword)
                .build();
        appUserRepository.save(dummyUser);

        String jwt = webTestClient.post()
                .uri("/auth/login")
                .bodyValue(AppUser.builder()
                        .username("test_username")
                        .password("some-password")
                        .build())
                .exchange()
                .expectStatus().isOk()
                .expectBody(String.class)
                .returnResult()
                .getResponseBody();

        return jwt;
    }
}