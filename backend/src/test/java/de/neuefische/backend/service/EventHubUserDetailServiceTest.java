package de.neuefische.backend.service;

import de.neuefische.backend.dto.EventHubUserDTO;
import de.neuefische.backend.dto.UserPreferredCategoriesDTO;
import de.neuefische.backend.model.EventCategory;
import de.neuefische.backend.model.EventHubUser;
import de.neuefische.backend.repository.EventHubUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EventHubUserDetailServiceTest {

    EventHubUserRepository userRepository = mock(EventHubUserRepository.class);
    GenerateUUIDService generateUUIDService = mock(GenerateUUIDService.class);
    PasswordEncoder passwordEncoder = mock(PasswordEncoder.class);
    EventHubUserDetailService eventHubUserDetailService = new EventHubUserDetailService(userRepository, passwordEncoder, generateUUIDService);

    @Test
    void testGetUserPreferredCategories_case_preferred_categories_set() {
        // given
        String username = "user@event.hub";
        List<SimpleGrantedAuthority> roles = List.of(new SimpleGrantedAuthority("ROLE_USER"));
        List<EventCategory> preferredCategories = List.of(EventCategory.MUSIC, EventCategory.SPORTS);
        EventHubUser user = new EventHubUser("1", "user@event.hub", "123", roles, preferredCategories);
        when(userRepository.findEventHubUserByUsername(username)).thenReturn(Optional.of(user));
        List<String> expectedCategories = List.of("MUSIC", "SPORTS");

        // when
        List<String> userPreferredCategories = eventHubUserDetailService.getUserPreferredCategories(username);

        // then
        assertEquals(expectedCategories, userPreferredCategories);
    }

    @Test
    void testGetUserPreferredCategories_case_user_not_found() {
        // given
        String username = "user@event.hub";

        // when & then
        assertThrows(UsernameNotFoundException.class, () -> eventHubUserDetailService.getUserPreferredCategories(username));
    }

    @Test
    void testGetUserPreferredCategories_case_no_preferred_categories_present() {
        // given
        String username = "user@event.hub";
        List<SimpleGrantedAuthority> roles = List.of(new SimpleGrantedAuthority("ROLE_USER"));
        EventHubUser user = new EventHubUser("1", username, "123", roles, new ArrayList<>());
        when(userRepository.findEventHubUserByUsername(username)).thenReturn(Optional.of(user));

        // when
        List<String> userPreferredCategories = eventHubUserDetailService.getUserPreferredCategories(username);

        // then
        assertTrue(userPreferredCategories.isEmpty());
    }

    @Test
    void testUpdateUserPreferredCategories_case_no_existing_categories() {
        // given
        String username = "user@event.hub";
        List<EventCategory> categories = List.of(EventCategory.MUSIC, EventCategory.SPORTS);
        UserPreferredCategoriesDTO userPreferredCategories = new UserPreferredCategoriesDTO(username, categories);
        List<SimpleGrantedAuthority> roles = List.of(new SimpleGrantedAuthority("ROLE_USER"));
        EventHubUser user = new EventHubUser("1", username, "123", roles, null);
        when(userRepository.findEventHubUserByUsername(username)).thenReturn(Optional.of(user));
        EventHubUserDTO expectedUser = new EventHubUserDTO("1", username, List.of("ROLE_USER"), categories);

        // when
        EventHubUserDTO updatedUserPreferredCategories = eventHubUserDetailService.updateUserPreferredCategories(userPreferredCategories);

        // then
        assertEquals(expectedUser, updatedUserPreferredCategories);
        verify(userRepository).save(user);
    }

    @Test
    void testUpdateUserPreferredCategories_case_existing_categories() {
        // given
        String username = "user@event.hub";
        List<EventCategory> existingCategories = List.of(EventCategory.EDUCATION);
        List<EventCategory> newCategories = List.of(EventCategory.MUSIC, EventCategory.SPORTS);
        UserPreferredCategoriesDTO newUserPreferredCategories = new UserPreferredCategoriesDTO(username, newCategories);
        List<SimpleGrantedAuthority> roles = List.of(new SimpleGrantedAuthority("ROLE_USER"));
        EventHubUser user = new EventHubUser("1", username, "123", roles, existingCategories);
        when(userRepository.findEventHubUserByUsername(username)).thenReturn(Optional.of(user));
        EventHubUserDTO expectedUser = new EventHubUserDTO("1", username, List.of("ROLE_USER"), newCategories);

        // when
        EventHubUserDTO updatedUserPreferredCategories = eventHubUserDetailService.updateUserPreferredCategories(newUserPreferredCategories);

        // then
        assertEquals(expectedUser, updatedUserPreferredCategories);
        verify(userRepository).save(user);
    }

    @Test
    void testFindAllUsers() {
        // given
        List<EventHubUser> userList = new ArrayList<>();
        List<SimpleGrantedAuthority> roles = List.of(new SimpleGrantedAuthority("ROLE_USER"));
        List<EventCategory> preferredCategories = List.of(EventCategory.MUSIC, EventCategory.SPORTS);
        EventHubUser user1 = new EventHubUser("1", "user1@event.hub", "123", roles, preferredCategories);
        EventHubUser user2 = new EventHubUser("2", "user2@event.hub", "123", roles, preferredCategories);
        userList.add(user1);
        userList.add(user2);
        when(userRepository.findAll()).thenReturn(userList);
        List<EventHubUserDTO> expectedUserDTOs = new ArrayList<>();
        for (EventHubUser user : userList) {
            expectedUserDTOs.add(new EventHubUserDTO(user.getId(), user.getUsername(), user.getRoles().stream().map(SimpleGrantedAuthority::toString).toList(), user.getPreferredCategories()));
        }

        // when
        List<EventHubUserDTO> result = eventHubUserDetailService.findAllUsers();

        // then
        assertEquals(expectedUserDTOs, result);
        verify(userRepository, times(1)).findAll();
    }

    @Test
    void testUpdateUserRole() {
        // given
        String username = "testuser";
        String role = "admin";
        EventHubUser userToUpdate = new EventHubUser();
        userToUpdate.setUsername(username);
        when(userRepository.findEventHubUserByUsername(username)).thenReturn(java.util.Optional.of(userToUpdate));
        when(userRepository.save(userToUpdate)).thenReturn(userToUpdate);

        // when
        EventHubUserDTO updatedUser = eventHubUserDetailService.updateUserRole(username, role);

        // then
        assertEquals(1, updatedUser.getRoles().size());
        assertEquals(role, updatedUser.getRoles().get(0));
        verify(userRepository).findEventHubUserByUsername(username);
        verify(userRepository).save(userToUpdate);
    }

    @Test
    void testUpdateUserRole_UserNotFound() {
        // given
        String username = "nonexistentuser";
        String role = "admin";
        when(userRepository.findEventHubUserByUsername(username)).thenReturn(java.util.Optional.empty());

        // when & then
        assertThrows(UsernameNotFoundException.class, () -> eventHubUserDetailService.updateUserRole(username, role));
        verify(userRepository).findEventHubUserByUsername(username);
        verify(userRepository, never()).save(any());
    }

}