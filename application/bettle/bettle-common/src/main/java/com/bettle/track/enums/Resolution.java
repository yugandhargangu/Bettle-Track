package com.bettle.track.enums;

import com.bettle.track.utils.MessageUtil;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Resolution is a enum of issue's current resolution.
 * The id of the resolution will be in stored in database for each issue.
 * <p>
 * Create Date: 2017/01/20
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum Resolution {
    FIXED(1, "label.fixed", "color.red"),
    WONT_FIX(2, "label.wont_fix", "color.red"),
    DUPLICATE(3, "label.duplicate", "color.red"),
    INCOMPLETE(4, "label.incomplete", "color.red"),
    CANNOT_REPRODUCE(5, "label.cannot_reproduce", "color.red"),
    DONE(6, "label.done", "color.red"),
    WONT_DO(7, "label.wont_do", "color.red");

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
    Resolution(int id, String messageKey, String colorKey) {
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
