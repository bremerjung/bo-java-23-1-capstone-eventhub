package de.neuefische.backend.dto;

import de.neuefische.backend.model.EventCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EventHubUserDTO {
    private String id;
    private String username;
    private List<String> roles;
    private List<EventCategory> preferredCategories;
}
