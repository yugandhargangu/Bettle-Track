package com.bettle.track.enums;

import com.bettle.track.utils.MessageUtil;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * TestStatus is a enum of test case or test lab current status.
 * The id of the test status will be in stored in database for each test case or test lab.
 * <p>
 * Create Date: 2017/01/20
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum TestStatus {

    NA(0, "label.na", "color.red"),
    NEW(1, "label.new", "color.red"),
    IMPORTED(2, "label.imported", "color.red"),
    PENDING_APPROVAL(3, "label.approval", "color.red"),
    DESIGN(4, "label.design", "color.red"),
    REDESIGN(5, "label.redesign", "color.red"),
    APPROVED(6, "label.approved", "color.red"),
    OBSOLETE(7, "label.obsolete", "color.red");

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
    TestStatus(int id, String messageKey, String colorKey) {
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
