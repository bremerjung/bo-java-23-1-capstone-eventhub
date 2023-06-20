package de.neuefische.backend.dto;

import de.neuefische.backend.model.EventCategory;
import lombok.Data;

import java.util.List;

@Data
public class UserPreferredCategoriesDTO {
    private String username;
    private List<EventCategory> categories;
}
