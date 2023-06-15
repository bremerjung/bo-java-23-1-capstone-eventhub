package de.neuefische.backend.service;

import de.neuefische.backend.dto.EventHubUserDTO;
import de.neuefische.backend.dto.UserLoginAndRegistrationDTO;
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

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EventHubUserDetailService implements UserDetailsService {

    private final EventHubUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final GenerateUUIDService generateUUIDService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        EventHubUser user = userRepository.findEventHubUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with username " + username + " not found"));
        return new User(user.getUsername(), user.getPassword(), user.getRoles());
    }

    public EventHubUserDTO saveUser(UserLoginAndRegistrationDTO user) {
        EventHubUser newUser = EventHubUser.builder()
                .id(generateUUIDService.generateUUID())
                .username(user.getUsername())
                .password(passwordEncoder.encode(user.getPassword()))
                .build();

        if(userRepository.findEventHubUserByUsername(newUser.getUsername()).isPresent()) {
            throw new IllegalArgumentException("User with username " + user.getUsername() + " already exists");
        }

        EventHubUser temp = userRepository.save(newUser.withRoles(Collections.singletonList(new SimpleGrantedAuthority("user"))).withPassword(passwordEncoder.encode(user.getPassword())));
        List<String> roles = temp.getRoles().stream().map(SimpleGrantedAuthority::toString).toList();
        return new EventHubUserDTO(temp.getId(), temp.getUsername(), roles);
    }
}
