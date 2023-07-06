package de.neuefische.backend.controller;

import de.neuefische.backend.dto.EventDTO;
import de.neuefische.backend.model.Event;
import de.neuefische.backend.model.EventCategory;
import de.neuefische.backend.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/event")
@RequiredArgsConstructor
public class EventController {

    private final EventService eventService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Event addEvent(@RequestBody EventDTO event) {
        Event newEvent = Event.builder()
                .title(event.getTitle())
                .description(event.getDescription())
                .start(event.getStart())
                .end(event.getEnd())
                .location(event.getLocation())
                .category(event.getCategory())
                .creator(event.getCreator())
                .status(event.getStatus())
                .source(event.getSource())
                .imageUrl(event.getImageUrl())
                .locationLatitude(event.getLocationLatitude())
                .locationLongitude(event.getLocationLongitude())
                .build();
        return eventService.saveEvent(newEvent);
    }

    @GetMapping
    public List<Event> getAllEvents() {
        return eventService.findAllEvents();
    }

    @GetMapping("/byCategories")
    public List<Event> getEventsByCategories(@RequestParam(value = "categories") List<EventCategory> categories) {
        return eventService.findEventsByCategory(categories);
    }

    @GetMapping("/creator/{creator}")
    public List<Event> getEventsByCreator(@PathVariable String creator) {
        return eventService.findEventsByCreator(creator);
    }

    @GetMapping("/status/{status}")
    public List<Event> getEventsByStatus(@PathVariable String status) {
        return eventService.findEventsByStatus(status);
    }

    @GetMapping("{id}")
    public Event getEventById(@PathVariable String id) {
        return eventService.findEventById(id);
    }

    @PutMapping("{id}")
    public Event updateEvent(@PathVariable String id, @RequestBody EventDTO event) {
        Event updatedEvent = Event.builder()
                .title(event.getTitle())
                .description(event.getDescription())
                .start(event.getStart())
                .end(event.getEnd())
                .location(event.getLocation())
                .category(event.getCategory())
                .creator(event.getCreator())
                .status(event.getStatus())
                .source(event.getSource())
                .imageUrl(event.getImageUrl())
                .locationLatitude(event.getLocationLatitude())
                .locationLongitude(event.getLocationLongitude())
                .build();
        return eventService.updateEvent(id, updatedEvent);
    }

    @DeleteMapping("{id}")
    public void deleteEvent(@PathVariable String id) {
        eventService.deleteEvent(id);
    }

    @GetMapping("/categories")
    public EventCategory[] getEventCategories() {
        return EventCategory.values();
    }

    @PostMapping("/{id}/image")
    public Event addImageToEvent(@PathVariable String id, @RequestParam("image") MultipartFile image) {
        return eventService.saveImageForEvent(id, image);
    }

}
