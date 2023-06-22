package de.neuefische.backend.controller;

import jakarta.servlet.http.HttpSession;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.junit.jupiter.api.Assertions.assertNull;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private HttpSession httpSession;

    @Test
    @DirtiesContext
    void testPostNewUser_shouldReturn_201_and_userDTO_with_role_user() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/register")
                        .contentType("application/json")
                        .content("""
                                {
                                        "username": "user@event.hub",
                                        "password": "123"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201))
                .andExpect(content().json("""
                        {
                                        "username": "user@event.hub",
                                        "roles": [
                                                "user"
                                        ]
                        }
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    void testPostNewUser_shouldReturn_409_when_username_exists() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/register")
                        .contentType("application/json")
                        .content("""
                                {
                                        "username": "user@event.hub",
                                        "password": "123"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201))
                .andExpect(content().json("""
                        {
                                        "username": "user@event.hub",
                                        "roles": [
                                                "user"
                                        ]
                        }
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty());

        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/register")
                        .contentType("application/json")
                        .content("""
                                {
                                        "username": "user@event.hub",
                                        "password": "123"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(409));
    }

    @Test
    @DirtiesContext
    @WithMockUser(username = "user@event.hub")
    void testLogin_shouldReturn_200_and_userDTO_with_role_user_and_list_of_preferred_categories() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/register")
                        .contentType("application/json")
                        .content("""
                                {
                                        "username": "user@event.hub",
                                        "password": "123"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201))
                .andExpect(content().json("""
                        {
                                        "username": "user@event.hub",
                                        "roles": [
                                                "user"
                                        ]
                        }
                        """))
                .andExpect(jsonPath("$.id").isNotEmpty());

        mockMvc.perform((MockMvcRequestBuilders.put("/api/user/update-preferred-categories")
                        .contentType("application/json")
                        .content("""
                                {
                                        "username": "user@event.hub",
                                        "categories": ["MUSIC", "SPORTS"]
                                }
                                """)
                        .with(csrf())))
                .andExpect(status().is(200))
                .andExpect(content().json("""
                        {
                                        "username": "user@event.hub",
                                        "roles": [
                                                "user"
                                        ],
                                        "preferredCategories": ["MUSIC", "SPORTS"]
                        }
                        """));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/login")
                        .contentType("application/json")
                        .with(csrf()))
                .andExpect(status().is(200))
                .andExpect(content().json("""
                        {
                                        "username": "user@event.hub",
                                        "roles": ["ROLE_USER"],
                                        "preferredCategories": ["MUSIC", "SPORTS"]
                        }
                        """));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testLogout_should_invalidate_session_and_clear_context() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/logout")
                        .with(csrf()))
                .andExpect(status().is(200));
        assertNull(httpSession.getAttribute("SPRING_SECURITY_CONTEXT"));
        assertNull(SecurityContextHolder.getContext().getAuthentication());
    }

}