package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import de.neuefische.backend.model.Event;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class EventControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    @DirtiesContext
    @WithMockUser
    void testAddEvent_whenAddEvent_returnEventWithId_andStatusCode200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/event")
                        .contentType("application/json")
                        .content("""
                                {
                                        "title": "Title 1",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location",
                                        "category": "MUSIC",
                                        "creator": "Creator",
                                        "status": "NEW"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/event"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                            {
                                "title": "Title 1",
                                "description": "Description",
                                "start": "2023-06-14T10:00:00Z",
                                "end": "2023-06-14T12:00:00Z",
                                "location": "Location",
                                "category": "MUSIC",
                                "creator": "Creator",
                                "status": "NEW"
                            }
                        ]
                        """))
                .andExpect(jsonPath("$[0].id").isNotEmpty());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testGetAllEvents_whenGetAllEvents_returnEmptyEventList_andStatusCode200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/event"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testGetEventById_whenGetEventById_thenReturn200OK_returnCorrectEvent() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/event")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                        "title": "Title 1",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location",
                                        "category": "MUSIC",
                                        "creator": "Creator",
                                        "status": "NEW"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201))
                .andReturn();

        String content = result.getResponse().getContentAsString();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        Event event = objectMapper.readValue(content, Event.class);

        mockMvc.perform(MockMvcRequestBuilders.get("/api/event/" + event.getId()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                                        "title": "Title 1",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location",
                                        "category": "MUSIC",
                                        "creator": "Creator",
                                        "status": "NEW"
                        }
                        """)).andExpect(jsonPath("$.id").value(event.getId()));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testUpdateEvent() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/event")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                        "title": "Title 1",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location",
                                        "category": "MUSIC",
                                        "creator": "Creator",
                                        "status": "NEW"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201))
                .andReturn();

        String content = result.getResponse().getContentAsString();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        Event addedEvent = objectMapper.readValue(content, Event.class);

        mockMvc.perform(MockMvcRequestBuilders.put("/api/event/" + addedEvent.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                        "title": "Updated Title",
                                        "description": "Updated description",
                                        "start": "2023-06-15T10:00:00Z",
                                        "end": "2023-06-15T12:00:00Z",
                                        "location": "New Location",
                                        "category": "THEATRE",
                                        "creator": "Creator 2",
                                        "status": "APPROVED"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().isOk());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/event/" + addedEvent.getId()))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        {
                            "title": "Updated Title",
                            "description": "Updated description",
                            "start": "2023-06-15T10:00:00Z",
                            "end": "2023-06-15T12:00:00Z",
                            "location": "New Location",
                            "category": "THEATRE",
                            "creator": "Creator 2",
                            "status": "APPROVED"
                        }
                        """));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testDeleteEvent() throws Exception {
        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/event")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                        "title": "Title 1",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location",
                                        "category": "MUSIC",
                                        "creator": "Creator",
                                        "status": "NEW"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201))
                .andReturn();

        String content = result.getResponse().getContentAsString();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        Event addedEvent = objectMapper.readValue(content, Event.class);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/event/" + addedEvent.getId()).with(csrf()))
                .andExpect(status().isOk());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/event/" + addedEvent.getId()))
                .andExpect(status().isNotFound());
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testGetEventsByCategories() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/event")
                        .contentType("application/json")
                        .content("""
                                {
                                        "title": "Title 1",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location 1",
                                        "category": "MUSIC",
                                        "creator": "Creator",
                                        "status": "NEW"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/event")
                        .contentType("application/json")
                        .content("""
                                {
                                        "title": "Title 2",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location 2",
                                        "category": "ARTS",
                                        "creator": "Creator",
                                        "status": "NEW"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/event")
                        .contentType("application/json")
                        .content("""
                                {
                                        "title": "Title 3",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location 3",
                                        "category": "MUSIC",
                                        "creator": "Creator",
                                        "status": "NEW"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/event")
                        .contentType("application/json")
                        .content("""
                                {
                                        "title": "Title 4",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location 4",
                                        "category": "THEATRE",
                                        "creator": "Creator",
                                        "status": "NEW"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/event/byCategories?categories=MUSIC,SPORTS,ARTS"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                             {
                                        "title": "Title 1",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location 1",
                                        "category": "MUSIC",
                                        "creator": "Creator",
                                        "status": "NEW"
                             },
                             {
                                        "title": "Title 2",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location 2",
                                        "category": "ARTS",
                                        "creator": "Creator",
                                        "status": "NEW"
                                },
                             {
                                        "title": "Title 3",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location 3",
                                        "category": "MUSIC",
                                        "creator": "Creator",
                                        "status": "NEW"
                             }
                         ]
                        """));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testGetEventsByCreator() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/event")
                        .contentType("application/json")
                        .content("""
                                {
                                        "title": "Title 1",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location 1",
                                        "category": "MUSIC",
                                        "creator": "Creator1",
                                        "status": "NEW"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/event")
                        .contentType("application/json")
                        .content("""
                                {
                                        "title": "Title 2",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location 2",
                                        "category": "ARTS",
                                        "creator": "Creator2",
                                        "status": "NEW"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/event")
                        .contentType("application/json")
                        .content("""
                                {
                                        "title": "Title 3",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location 3",
                                        "category": "MUSIC",
                                        "creator": "Creator2",
                                        "status": "NEW"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/event")
                        .contentType("application/json")
                        .content("""
                                {
                                        "title": "Title 4",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location 4",
                                        "category": "THEATRE",
                                        "creator": "Creator1",
                                        "status": "NEW"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/event/creator/Creator1"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                             {
                                        "title": "Title 1",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location 1",
                                        "category": "MUSIC",
                                        "creator": "Creator1",
                                        "status": "NEW"
                             },
                             {
                                        "title": "Title 4",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location 4",
                                        "category": "THEATRE",
                                        "creator": "Creator1",
                                        "status": "NEW"
                                }

                         ]
                        """));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testGetEventsByStatus() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/event")
                        .contentType("application/json")
                        .content("""
                                {
                                        "title": "Title 1",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location 1",
                                        "category": "MUSIC",
                                        "creator": "Creator1",
                                        "status": "NEW"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/event")
                        .contentType("application/json")
                        .content("""
                                {
                                        "title": "Title 2",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location 2",
                                        "category": "ARTS",
                                        "creator": "Creator2",
                                        "status": "APPROVED"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/event")
                        .contentType("application/json")
                        .content("""
                                {
                                        "title": "Title 3",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location 3",
                                        "category": "MUSIC",
                                        "creator": "Creator2",
                                        "status": "DECLINED"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201));

        mockMvc.perform(MockMvcRequestBuilders.post("/api/event")
                        .contentType("application/json")
                        .content("""
                                {
                                        "title": "Title 4",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location 4",
                                        "category": "THEATRE",
                                        "creator": "Creator1",
                                        "status": "NEW"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/event/status/NEW"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                             {
                                        "title": "Title 1",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location 1",
                                        "category": "MUSIC",
                                        "creator": "Creator1",
                                        "status": "NEW"
                             },
                             {
                                        "title": "Title 4",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location 4",
                                        "category": "THEATRE",
                                        "creator": "Creator1",
                                        "status": "NEW"
                             }
                         ]
                        """));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/event/status/APPROVED"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                             {
                                        "title": "Title 2",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location 2",
                                        "category": "ARTS",
                                        "creator": "Creator2",
                                        "status": "APPROVED"
                             }
                         ]
                        """));

        mockMvc.perform(MockMvcRequestBuilders.get("/api/event/status/DECLINED"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                             {
                                        "title": "Title 3",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location 3",
                                        "category": "MUSIC",
                                        "creator": "Creator2",
                                        "status": "DECLINED"
                             }
                         ]
                        """));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testGetEventCategories() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/event/categories"))
                .andExpect(status().isOk())
                .andExpect(content().json("""
                        [
                             "MUSIC",
                             "ARTS",
                             "THEATRE",
                             "COMEDY",
                             "SPORTS",
                             "EDUCATION",
                             "OTHER"
                         ]
                        """));
    }

    @Test
    @DirtiesContext
    @WithMockUser
    void testAddImageToEvent() throws Exception {
        byte[] imageBytes = {1, 2, 3};
        MockMultipartFile imageFile = new MockMultipartFile("image", "image.jpg", MediaType.IMAGE_JPEG_VALUE, imageBytes);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/event")
                        .contentType("application/json")
                        .content("""
                                {
                                        "title": "Title 1",
                                        "description": "Description",
                                        "start": "2023-06-14T10:00:00Z",
                                        "end": "2023-06-14T12:00:00Z",
                                        "location": "Location",
                                        "category": "MUSIC",
                                        "creator": "Creator",
                                        "status": "NEW"
                                }
                                """)
                        .with(csrf()))
                .andExpect(status().is(201))
                .andReturn();

        String content = result.getResponse().getContentAsString();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        Event event = objectMapper.readValue(content, Event.class);

        mockMvc.perform(MockMvcRequestBuilders.multipart("/api/event/{id}/image", event.getId())
                        .file(imageFile)
                        .with(csrf()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(event.getId()))
                .andExpect(jsonPath("$.image").isNotEmpty());
    }
}