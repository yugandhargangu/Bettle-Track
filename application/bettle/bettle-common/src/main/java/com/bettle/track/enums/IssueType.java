package com.bettle.track.enums;

import com.bettle.track.utils.MessageUtil;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * IssueType is a enum of type of issue.
 * The id of an issue type will be in stored in database for each issue.
 * <p>
 * Create Date: 2017/01/20
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum IssueType {
    BUG(1, "label.bug", "color.red"),
    NEW_FEATURE(2, "label.new_feature", "color.red"),
    IMPROVEMENT(3, "label.improvement", "color.red"),
    TASK(4, "label.task", "color.red"),
    VERIFICATION(5, "label.verification", "color.red");

    private final int id;
    private final String messageKey;
    private final String colorKey;

    /**
     * Constructor.
     *
     * @param id         id
     * @param messageKey message key
     * @param colorKey   color key
     */
    IssueType(int id, String messageKey, String colorKey) {
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