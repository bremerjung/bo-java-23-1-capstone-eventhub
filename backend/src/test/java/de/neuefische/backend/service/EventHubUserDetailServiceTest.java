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
        EventHubUser user = new EventHubUser("1", username, "123", roles, null);
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

        // when
        EventHubUserDTO updatedUserPreferredCategories = eventHubUserDetailService.updateUserPreferredCategories(userPreferredCategories);

        // then
        assertEquals(username, updatedUserPreferredCategories.getUsername());
        assertEquals(categories, updatedUserPreferredCategories.getPreferredCategories());
        assertEquals(categories, user.getPreferredCategories());
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

        // when
        EventHubUserDTO updatedUserPreferredCategories = eventHubUserDetailService.updateUserPreferredCategories(newUserPreferredCategories);

        // then
        assertEquals(username, updatedUserPreferredCategories.getUsername());
        assertEquals(newCategories, updatedUserPreferredCategories.getPreferredCategories());
        assertEquals(newCategories, user.getPreferredCategories());
        verify(userRepository).save(user);
    }

}