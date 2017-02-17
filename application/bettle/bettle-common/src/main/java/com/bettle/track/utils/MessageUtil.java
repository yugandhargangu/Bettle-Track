package com.bettle.track.utils;

import com.bettle.track.config.StaticContextAccessor;
import org.springframework.context.MessageSource;
import org.springframework.web.servlet.LocaleResolver;

import javax.servlet.http.HttpServletRequest;
import java.util.Locale;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * MessageUtil class is to get message from message sources.
 * <p>
 * Note: This works only on main thread.
 * <p>
 * Create Date: 2017/01/26
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
public class MessageUtil {

    private static final Map<Long, MessageUtil> MESSAGE_SOURCE_MAP = new ConcurrentHashMap<>();
    private final Locale locale;
    private final MessageSource messageSource;

    /**
     * Constructor.
     *
     * @param request HttpServletRequest
     */
    public MessageUtil(HttpServletRequest request) {
        LocaleResolver localeResolver = StaticContextAccessor.getBean(LocaleResolver.class);
        locale = localeResolver.resolveLocale(request);
        messageSource = StaticContextAccessor.getBean(MessageSource.class);
    }

    /**
     * Constructor.
     *
     * @param request HttpServletRequest
     */
    public MessageUtil(HttpServletRequest request, MessageSource messageSource) {
        LocaleResolver localeResolver = StaticContextAccessor.getBean(LocaleResolver.class);
        locale = localeResolver.resolveLocale(request);
        this.messageSource = messageSource;
    }

    /**
     * To add message source to map.
     *
     * @param request HttpServletRequest
     */
    public static synchronized void add(HttpServletRequest request) {
        if (!MESSAGE_SOURCE_MAP.containsKey(Thread.currentThread().getId())) {
            MESSAGE_SOURCE_MAP.put(Thread.currentThread().getId(), new MessageUtil(request));
        }
    }

    /**
     * To remove message source from map.
     */
    public static synchronized void remove() {
        if (MESSAGE_SOURCE_MAP.containsKey(Thread.currentThread().getId())) {
            MESSAGE_SOURCE_MAP.remove(Thread.currentThread().getId());
        }
    }

    /**
     * To get message util object.
     *
     * @return MessageUtil
     */
    public static synchronized MessageUtil get() {
        return MESSAGE_SOURCE_MAP.get(Thread.currentThread().getId());
    }

    /**
     * To get message.
     *
     * @param key  message key
     * @param args arguments
     * @return message
     */
    public String getMessage(String key, Object... args) {
        return messageSource.getMessage(key, args, locale);
    }
}