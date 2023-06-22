package de.neuefische.backend.repository;

import de.neuefische.backend.model.Event;
import de.neuefische.backend.model.EventCategory;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepository extends MongoRepository<Event,String> {
    List<Event> findByStatus(String status);
    List<Event> findByCategoryIn(List<EventCategory> categories);
    List<Event> findByCreator(String creator);
}
