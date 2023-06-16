package de.neuefische.backend.repository;

import de.neuefische.backend.model.EventHubUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventHubUserRepository extends MongoRepository<EventHubUser,String> {
    Optional<EventHubUser> findEventHubUserByUsername(String username);
}
