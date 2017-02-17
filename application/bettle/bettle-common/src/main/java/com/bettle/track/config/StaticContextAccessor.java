package com.bettle.track.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;

import javax.annotation.PostConstruct;

/**
 * StaticContextAccessor class is to access context statically.
 * <p>
 * Create Date: 2017/01/26
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
@Component
public class StaticContextAccessor {

    private static StaticContextAccessor instance;

    @Autowired
    private WebApplicationContext webApplicationContext;

    /**
     * To get bean from context.
     *
     * @param klass Class type
     * @param <T>   Return type
     * @return Object
     */
    public static <T> T getBean(Class<T> klass) {
        return instance.webApplicationContext.getBean(klass);
    }

    /**
     * To get bean from context.
     *
     * @param beanName Bean name
     * @return Bean Object
     */
    public static Object getBean(String beanName) {
        return instance.webApplicationContext.getBean(beanName);
    }

    @PostConstruct
    public void registerInstance() {
        instance = this;
    }
}
