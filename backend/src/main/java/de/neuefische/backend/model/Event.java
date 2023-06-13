package de.neuefische.backend.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.Instant;

@Data
@AllArgsConstructor
@Builder
public class Event {
    private String id;
    private String title;
    private String description;
    private Instant start;
    private Instant end;
    private String location;
    private EventCategory category;
    private String creator;
    private EventStatus status;
}
