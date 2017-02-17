package com.bettle.track.enums;

import com.bettle.track.utils.MessageUtil;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * UserRole is a enum of user role in a project or project module.
 * The id of an user role will be in stored in database for each project or module.
 * <p>
 * Create Date: 2017/01/20
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum UserRole {
    ADMINISTRATOR(1, "label.administrator"),
    PROJECT_MANAGER(2, "label.project_manager"),
    PROJECT_LEADER(3, "label.project_leader"),
    TEAM_LEADER(4, "label.team_leader"),
    DEVELOPER(5, "label.developer"),
    TESTER(6, "label.tester"),
    TEAM_MEMBER(7, "label.team_member"),
    CUSTOMER(8, "label.customer"),
    GUEST(9, "label.guest");

    private final int id;
    private final String messageKey;

    /**
     * Construtor
     *
     * @param id         Type to display
     * @param messageKey Message key to display
     */
    UserRole(int id, String messageKey) {
        this.id = id;
        this.messageKey = messageKey;
    }

    public int getId() {
        return id;
    }

    @JsonIgnore
    public String getMessageKey() {
        return messageKey;
    }

    public String getMessage() {
        return MessageUtil.get().getMessage(messageKey);
    }
}