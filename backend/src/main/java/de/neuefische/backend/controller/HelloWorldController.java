package de.neuefische.backend.controller;

import de.neuefische.backend.model.Event;
import de.neuefische.backend.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("api")
@RequiredArgsConstructor
public class HelloWorldController {

    private final EventRepository eventRepository;

    @GetMapping("/hello")
    public String helloWorld() {
        eventRepository.save(new Event(UUID.randomUUID().toString()));
        return "Hello World";
    }
}
