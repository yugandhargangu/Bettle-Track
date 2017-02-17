package com.bettle.track.exceptions;

/**
 * RedirectException class is to redirect to the particular url when exception occurred.
 * <p>
 * Create Date: 2017/01/23
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
public class RedirectException extends Throwable {
    /**
     * Constructor
     */
    public RedirectException() {
    }

    /**
     * Constructor
     *
     * @param message exception message
     */
    public RedirectException(String message) {
        super(message);
    }

    /**
     * Constructor
     *
     * @param message exception message
     * @param cause   Throwable instance
     */
    public RedirectException(String message, Throwable cause) {
        super(message, cause);
    }

    /**
     * Constructor
     *
     * @param cause Throwable instance
     */
    public RedirectException(Throwable cause) {
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
    public RedirectException(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}
