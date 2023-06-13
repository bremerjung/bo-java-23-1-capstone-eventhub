package de.neuefische.backend.service;

import org.junit.jupiter.api.Test;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

class GenerateUUIDServiceTest {

    @Test
    void testGenerateUUID_shouldReturnValidUUID() {
        // given
        GenerateUUIDService generateUUIDService = new GenerateUUIDService();

        // when
        String actualUUID = generateUUIDService.generateUUID();

        // then
        assertNotNull(actualUUID);
        assertTrue(isValidUUID(actualUUID));
    }

    private boolean isValidUUID(String uuid) {
        try {
            UUID.fromString(uuid);
            return true;
        } catch (IllegalArgumentException exception) {
            return false;
        }
    }

}