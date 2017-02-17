package com.bettle.track.config;

import com.bettle.track.SpringBootWebApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;

/**
 * TestConfiguration class is to define test configuration resources.
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
@Configuration
@Import({SpringBootWebApplication.class})
@PropertySource("classpath:/test.properties")
public class TestConfiguration {
}
