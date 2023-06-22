package de.neuefische.backend.service;

import de.neuefische.backend.dto.EventHubUserDTO;
import de.neuefische.backend.dto.UserLoginAndRegistrationDTO;
import de.neuefische.backend.dto.UserPreferredCategoriesDTO;
import de.neuefische.backend.model.EventCategory;
import de.neuefische.backend.model.EventHubUser;
import de.neuefische.backend.repository.EventHubUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventHubUserDetailService implements UserDetailsService {

    private static final String USER_NOT_FOUND_MESSAGE = "User with username %s not found";

    private final EventHubUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final GenerateUUIDService generateUUIDService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        EventHubUser user = userRepository.findEventHubUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MESSAGE, username)));
        return new User(user.getUsername(), user.getPassword(), user.getRoles());
    }

    public EventHubUserDTO saveUser(UserLoginAndRegistrationDTO user) {
        EventHubUser newUser = EventHubUser.builder()
                .id(generateUUIDService.generateUUID())
                .username(user.getUsername())
                .password(passwordEncoder.encode(user.getPassword()))
                .preferredCategories(new ArrayList<>())
                .build();

        if (userRepository.findEventHubUserByUsername(newUser.getUsername()).isPresent()) {
            throw new IllegalArgumentException("User with username " + user.getUsername() + " already exists");
        }

        EventHubUser savedUser = userRepository.save(newUser.withRoles(Collections.singletonList(new SimpleGrantedAuthority("user"))).withPassword(passwordEncoder.encode(user.getPassword())));
        List<String> roles = savedUser.getRoles().stream().map(SimpleGrantedAuthority::toString).toList();
        return new EventHubUserDTO(savedUser.getId(), savedUser.getUsername(), roles, savedUser.getPreferredCategories());
    }

    public List<String> getUserPreferredCategories(String username) {
        EventHubUser user = userRepository.findEventHubUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MESSAGE, username)));

        List<EventCategory> preferredCategories = user.getPreferredCategories();

        if (preferredCategories == null) {
            return Collections.emptyList();
        } else {
            return preferredCategories.stream()
                    .map(EventCategory::toString).toList();
        }
    }

    public EventHubUserDTO updateUserPreferredCategories(UserPreferredCategoriesDTO userPreferredCategories) {
        EventHubUser userToUpdate = userRepository.findEventHubUserByUsername(userPreferredCategories.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException(String.format(USER_NOT_FOUND_MESSAGE, userPreferredCategories.getUsername())));
        userToUpdate.setPreferredCategories(userPreferredCategories.getCategories());
        userRepository.save(userToUpdate);
        return new EventHubUserDTO(userToUpdate.getId(), userToUpdate.getUsername(), userToUpdate.getRoles().stream().map(SimpleGrantedAuthority::toString).toList(), userToUpdate.getPreferredCategories());
    }

}
