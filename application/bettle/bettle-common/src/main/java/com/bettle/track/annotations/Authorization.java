package com.bettle.track.annotations;

import com.bettle.track.enums.UserRole;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Authorisation annotation is to decide that the logged in user is allowed to access the path or not.
 * All users can access by default.
 * <p>
 * Create Date: 2017/01/27
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Authorization {

    // To check authentication is required to access path
    boolean authentication() default true;

    // Access levels to define
    UserRole[] accessLevels() default {UserRole.ADMINISTRATOR, UserRole.PROJECT_MANAGER,
            UserRole.PROJECT_LEADER, UserRole.TEAM_LEADER, UserRole.DEVELOPER, UserRole.TESTER,
            UserRole.TEAM_MEMBER, UserRole.CUSTOMER, UserRole.GUEST};
}
