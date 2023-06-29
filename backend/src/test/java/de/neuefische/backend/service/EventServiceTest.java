package de.neuefische.backend.service;

import de.neuefische.backend.exceptions.ImageProcessingException;
import de.neuefische.backend.exceptions.InvalidImageException;
import de.neuefische.backend.model.Event;
import de.neuefische.backend.repository.EventRepository;
import org.junit.jupiter.api.Test;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class EventServiceTest {

    EventRepository eventRepository = mock(EventRepository.class);
    GenerateUUIDService generateUUIDService = mock(GenerateUUIDService.class);
    EventService eventService = new EventService(eventRepository, generateUUIDService);

    @Test
    void testSaveEvent() {
        // given
        Event event = new Event();
        Event expected = new Event();
        when(eventRepository.save(event)).thenReturn(expected);

        // when
        Event actual = eventService.saveEvent(event);

        // then
        verify(eventRepository).save(expected);
        verify(generateUUIDService).generateUUID();
        assertEquals(expected, actual);
    }

    @Test
    void testFindAllEvents() {
        // given
        List<Event> expected = List.of(new Event(), new Event());
        when(eventRepository.findAll()).thenReturn(expected);

        // when
        List<Event> actual = eventService.findAllEvents();

        // then
        verify(eventRepository).findAll();
        assertEquals(expected, actual);
    }

    @Test
    void testFindEventById_case_id_found() {
        // given
        String id = "123";

        // when
        eventRepository.findById(id);

        // then
        verify(eventRepository).findById(id);
    }

    @Test
    void testFindEventById_case_id_not_found() {
        // given
        String id = "123";
        Optional<Event> expected = Optional.of(new Event());
        when(eventRepository.findById(id)).thenReturn(expected);

        // when
        Optional<Event> actual = eventRepository.findById(id);

        // then
        verify(eventRepository).findById(id);
        assertEquals(expected, actual);
    }

    @Test
    void testUpdateEvent() {
        // given
        String id = "123";
        when(eventRepository.findById(id)).thenReturn(Optional.empty());

        // when & then
        assertThrows(NoSuchElementException.class, () -> eventService.findEventById(id));
        verify(eventRepository).findById(id);
    }

    @Test
    void testSaveImageForEvent_case_successful() throws IOException {
        // given
        String id = "123";
        MultipartFile image = new MockMultipartFile("image.jpg", new byte[]{1, 2, 3});
        Event event = new Event();
        event.setId(id);
        //eventRepository.save(event);
        when(eventRepository.findById(id)).thenReturn(Optional.of(event));
        Event eventWithImage = new Event();
        eventWithImage.setImage(image.getBytes());
        when(eventRepository.save(event)).thenReturn(eventWithImage);

        // when
        Event savedEvent = eventService.saveImageForEvent(id, image);

        // then
        verify(eventRepository).save(event);
        assertNotNull(savedEvent.getImage());
        assertEquals(image.getBytes(), savedEvent.getImage());
    }

    @Test
    void testSaveImageForEvent_InvalidImage() {
        // given
        String id = "123";
        MultipartFile image = null;
        Event event = new Event();
        event.setId(id);
        when(eventRepository.findById(id)).thenReturn(Optional.of(event));

        // when & then
        assertThrows(InvalidImageException.class, () -> eventService.saveImageForEvent(id, image));
    }

    @Test
    void testSaveImageForEvent_ImageProcessingFailed() throws IOException {
        // given
        String id = "123";
        MultipartFile image = mock(MultipartFile.class);

        Event event = new Event();
        event.setId(id);
        when(eventRepository.findById(id)).thenReturn(Optional.of(event));
        when(image.getBytes()).thenThrow(new IOException());

        // when & then
        assertThrows(ImageProcessingException.class, () -> eventService.saveImageForEvent(id, image));
    }
}