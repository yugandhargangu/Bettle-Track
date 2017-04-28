package com.bettle.track.config;

import com.bettle.track.exceptions.RedirectException;
import com.bettle.track.exceptions.RestRedirectException;
import com.bettle.track.utils.PathConstants;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * SpringBootControllerAdvice is to handle exceptions and url default responses.
 * <p>
 * Create Date: 2017/01/23
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
@ControllerAdvice
public class SpringBootControllerAdvice {

    @ExceptionHandler(Throwable.class)
    public RedirectView handleException(Throwable t) {
        return new RedirectView(PathConstants.ROOT);
    }

    @ExceptionHandler(RedirectException.class)
    public RedirectView handleRedirectException(RedirectException e) {
        return new RedirectView(PathConstants.ROOT);
    }

    @ExceptionHandler(RestRedirectException.class)
    public void handleRestRedirectException(RestRedirectException e, final HttpServletResponse response) throws IOException {
        response.sendError(HttpStatus.BAD_REQUEST.value());
    }
}
