package com.bettle.track.config;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

/**
 * ApplicationStartupListener class is to execute required data on application load.
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
@Component
public class ApplicationStartupListener implements ApplicationListener<ApplicationReadyEvent> {

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        // Application startup code will be here
    }
}
