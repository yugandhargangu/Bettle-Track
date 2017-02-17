package com.bettle.track.exceptions;

/**
 * RestRedirectException class is to send the error response to the particular url when exception occurred.
 * <p>
 * Create Date: 2017/01/23
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
public class RestRedirectException extends Throwable {
    /**
     * Constructor
     */
    public RestRedirectException() {
    }

    /**
     * Constructor
     *
     * @param message exception message
     */
    public RestRedirectException(String message) {
        super(message);
    }

    /**
     * Constructor
     *
     * @param message exception message
     * @param cause   Throwable instance
     */
    public RestRedirectException(String message, Throwable cause) {
        super(message, cause);
    }

    /**
     * Constructor
     *
     * @param cause Throwable instance
     */
    public RestRedirectException(Throwable cause) {
        super(cause);
    }

    /**
     * Constructor
     *
     * @param message            exception message
     * @param cause              Throwable instance
     * @param enableSuppression  boolean
     * @param writableStackTrace boolean
     */
    public RestRedirectException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
