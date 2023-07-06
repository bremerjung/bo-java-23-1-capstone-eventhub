package de.neuefische.backend.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@With
@Document("events")
public class Event {
    @Id
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
    private byte[] image;
    private String imageUrl;
    private String locationLatitude;
    private String locationLongitude;
}
