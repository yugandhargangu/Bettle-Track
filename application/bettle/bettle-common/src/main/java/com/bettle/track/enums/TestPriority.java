package com.bettle.track.enums;

import com.bettle.track.utils.MessageUtil;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * TestPriority is a enum of test case or test lab priority.
 * The id of the test priority will be in stored in database for each test case or test lab.
 * <p>
 * Create Date: 2017/01/20
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum TestPriority {
    HIGH(1, "label.high", "color.red"),
    MEDIUM(2, "label.medium", "color.red"),
    LOW(3, "label.low", "color.red"),
    LOWER(4, "label.lower", "color.red"),
    LOWEST(5, "label.lowest", "color.red");

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
    TestPriority(int id, String messageKey, String colorKey) {
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
