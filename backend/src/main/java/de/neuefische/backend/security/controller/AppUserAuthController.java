package de.neuefische.backend.security.controller;

import de.neuefische.backend.security.model.AppUser;
import de.neuefische.backend.security.service.JWTUtilService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AppUserAuthController {

    private final AuthenticationManager authenticationManager;
    private final JWTUtilService jwtUtilService;


    @Autowired
    public AppUserAuthController(AuthenticationManager authenticationManager, JWTUtilService jwtUtilService) {
        this.authenticationManager = authenticationManager;
        this.jwtUtilService = jwtUtilService;
    }

    @PostMapping("/login")
    public String login(@RequestBody AppUser appUser) {

        // 1) authenticate user
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(appUser.getUsername(), appUser.getPassword()));

        // 2) create JWT
        String jwt = jwtUtilService.createToken(appUser.getUsername());

        return jwt;
    }

}
