package de.neuefische.backend.controller;

import de.neuefische.backend.dto.EventHubUserDTO;
import de.neuefische.backend.dto.UserLoginAndRegistrationDTO;
import de.neuefische.backend.service.EventHubUserDetailService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final EventHubUserDetailService service;

    @PostMapping("/login")
    UserLoginAndRegistrationDTO login() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<String> roles = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        return new UserLoginAndRegistrationDTO().withUsername(authentication.getName()).withRoles(roles);
    }

    @PostMapping("/logout")
    String logout(HttpSession httpSession) {
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
        return "logged out";
    }

    @PostMapping("/register")
    public EventHubUserDTO postNewUser(@RequestBody UserLoginAndRegistrationDTO user) {
        return service.saveUser(user);
    }
}
