package de.neuefische.backend.service;

import de.neuefische.backend.exceptions.ImageProcessingException;
import de.neuefische.backend.exceptions.InvalidImageException;
import de.neuefische.backend.model.Event;
import de.neuefische.backend.model.EventCategory;
import de.neuefische.backend.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final GenerateUUIDService generateUUIDService;

    public Event saveEvent(Event event) {
        return eventRepository.save(event.withId(generateUUIDService.generateUUID()));
    }

    public List<Event> findAllEvents() {
        return eventRepository.findAll();
    }

    public Event findEventById(String id) {
        return eventRepository.findById(id).orElseThrow(() -> new NoSuchElementException("Event with id " + id + " does not exist"));
    }

    public List<Event> findEventsByCategory(List<EventCategory> categories) {
        return eventRepository.findByCategoryIn(categories);
    }

    public List<Event> findEventsByCreator(String creator) {
        return eventRepository.findByCreator(creator);
    }

    public List<Event> findEventsByStatus(String status) {
        return eventRepository.findByStatus(status);
    }

    public Event updateEvent(String id, Event event) {
        Event eventToUpdate = findEventById(id);
        eventToUpdate.setTitle(event.getTitle());
        eventToUpdate.setDescription(event.getDescription());
        eventToUpdate.setStart(event.getStart());
        eventToUpdate.setEnd(event.getEnd());
        eventToUpdate.setLocation(event.getLocation());
        eventToUpdate.setCategory(event.getCategory());
        eventToUpdate.setCreator(event.getCreator());
        eventToUpdate.setStatus(event.getStatus());
        eventToUpdate.setSource(event.getSource());
        eventToUpdate.setLocationLatitude(event.getLocationLatitude());
        eventToUpdate.setLocationLongitude(event.getLocationLongitude());
        return eventRepository.save(eventToUpdate);
    }

    public void deleteEvent(String id) {
        eventRepository.deleteById(id);
    }

    public Event saveImageForEvent(String id, MultipartFile image) {
        Event event = findEventById(id);

        if (image == null || image.isEmpty()) {
            throw new InvalidImageException("Image is required");
        }

        try {
            event.setImage(image.getBytes());
        } catch (IOException e) {
            throw new ImageProcessingException("Failed to process image", e);
        }

        return eventRepository.save(event);

    }
}
