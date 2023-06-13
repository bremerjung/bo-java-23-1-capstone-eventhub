package de.neuefische.backend.service;

import de.neuefische.backend.model.Event;
import de.neuefische.backend.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
        return eventRepository.save(eventToUpdate);
    }

    public void deleteEvent(String id) {
        eventRepository.deleteById(id);
    }
}
