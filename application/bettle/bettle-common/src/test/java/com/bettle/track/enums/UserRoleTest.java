package com.bettle.track.enums;

import com.bettle.track.config.TestConfiguration;
import com.bettle.track.utils.MessageUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.servlet.http.HttpServletRequest;

import static org.junit.Assert.assertNotNull;

/**
 * Test class of UserRole.
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestConfiguration.class)
@AutoConfigureMockMvc
public class UserRoleTest {

    @Autowired
    private HttpServletRequest request;

    @Before
    public void tearDown() {
        MessageUtil.remove();
    }

    @Test(expected = JsonProcessingException.class)
    public void toJson_fail() throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.writeValueAsString(UserRole.values());
    }

    @Test
    public void toJson_success() throws JsonProcessingException {
        MessageUtil.add(request);
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonValue = objectMapper.writeValueAsString(UserRole.values());
        assertNotNull(jsonValue);
    }
}
