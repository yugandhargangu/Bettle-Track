package com.bettle.track.enums;

import com.bettle.track.utils.MessageUtil;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * IssueState is a enum of state of issue.
 * The id of an issue state will be in stored in database for each issue.
 * <p>
 * Create Date: 2017/01/20
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum IssueState {
    OPEN(1, "label.open", "color.red"),
    IN_PROGRESS(2, "label.in_progress", "color.red"),
    REOPENED(3, "label.reopened", "color.red"),
    RESOLVED(4, "label.resolved", "color.red"),
    CLOSED(5, "label.closed", "color.red");


    private final int id;
    private final String messageKey;
    private final String colorKey;

    /**
     * Constructor
     *
     * @param id         id
     * @param messageKey message key
     * @param colorKey   color key
     */
    IssueState(int id, String messageKey, String colorKey) {
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
