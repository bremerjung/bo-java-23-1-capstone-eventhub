package de.neuefische.backend.dto;

import de.neuefische.backend.model.EventCategory;
import de.neuefische.backend.model.EventStatus;
import lombok.Data;

import java.time.Instant;

@Data
public class EventDTO {
    private String id;
    private String title;
    private String description;
    private Instant start;
    private Instant end;
    private String location;
    private EventCategory category;
    private String creator;
    private EventStatus status;
    private String source;
    private String imageUrl;
    private String locationLatitude;
    private String locationLongitude;
}
