package com.bettle.track.enums;

import com.bettle.track.utils.MessageUtil;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * IssueState is a enum of priority of an issue.
 * The id of an issue priority will be in stored in database for each issue.
 * <p>
 * Create Date: 2017/01/20
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum IssuePriority {
    BLOCKER(1, "label.blocker", "color.red"),
    CRITICAL(2, "label.critical", "color.red"),
    MAJOR(3, "label.major", "color.red"),
    NORMAL(4, "label.normal", "color.red"),
    MINOR(5, "label.minor", "color.red"),
    TRIVIAL(6, "label.trivial", "color.red");

    private final int id;
    private final String messageKey;
    private final String colorKey;

    /**
     * Constiructor
     *
     * @param id         id
     * @param messageKey message key
     * @param colorKey   color key
     */
    IssuePriority(int id, String messageKey, String colorKey) {
        this.id = id;
        this.messageKey = messageKey;
        this.colorKey = colorKey;
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

    @JsonIgnore
    public String getColorKey() {
        return colorKey;
    }

    public String getColor() {
        return MessageUtil.get().getMessage(colorKey);
    }
}
