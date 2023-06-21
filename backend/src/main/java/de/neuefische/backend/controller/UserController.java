package de.neuefische.backend.controller;

import de.neuefische.backend.dto.EventHubUserDTO;
import de.neuefische.backend.dto.UserLoginAndRegistrationDTO;
import de.neuefische.backend.dto.UserPreferredCategoriesDTO;
import de.neuefische.backend.service.EventHubUserDetailService;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

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
        List<String> userPreferredCategories = service.getUserPreferredCategories(authentication.getName());
        return new UserLoginAndRegistrationDTO().withUsername(authentication.getName()).withRoles(roles).withPreferredCategories(userPreferredCategories);
    }

    @PostMapping("/logout")
    String logout(HttpSession httpSession) {
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
        return "logged out";
    }

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public EventHubUserDTO postNewUser(@RequestBody UserLoginAndRegistrationDTO user) {
        return service.saveUser(user);
    }

    @PutMapping("/update-preferred-categories")
    public EventHubUserDTO updatePreferredCategories(@RequestBody UserPreferredCategoriesDTO userPreferredCategories) {
       return service.updateUserPreferredCategories(userPreferredCategories);
    }
}
