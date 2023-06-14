package de.neuefische.backend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import de.neuefische.backend.model.Event;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class EventControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Test
    @DirtiesContext
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
                                """))
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
    void testGetAllEvents_whenGetAllEvents_returnEmptyEventList_andStatusCode200() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/event"))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    @DirtiesContext
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
                                """))
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
                                """))
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
                                """))
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
    void deleteEvent() throws Exception {
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
                                """))
                .andExpect(status().is(201))
                .andReturn();

        String content = result.getResponse().getContentAsString();

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        Event addedEvent = objectMapper.readValue(content, Event.class);

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/event/" + addedEvent.getId()))
                .andExpect(status().isOk());

        mockMvc.perform(MockMvcRequestBuilders.get("/api/event/" + addedEvent.getId()))
                .andExpect(status().isNotFound());
    }
}