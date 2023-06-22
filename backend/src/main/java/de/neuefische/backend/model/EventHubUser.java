package de.neuefische.backend.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@With
@Document("users")
public class EventHubUser {
    private String id;
    private String username;
    private String password;
    private List<SimpleGrantedAuthority> roles;
    private List<EventCategory> preferredCategories;
}
