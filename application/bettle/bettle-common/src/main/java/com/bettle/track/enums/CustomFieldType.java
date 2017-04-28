package com.bettle.track.enums;

import com.bettle.track.utils.MessageUtil;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * CustomFieldType is a enum of custom field type.
 * The id of a custom field type will be in stored in database for custom fields.
 * <p>
 * Create Date: 2017/01/26
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum CustomFieldType {
    TEXT(1, "label.textbox", false),
    DROPDOWN(2, "label.dropdown", true),
    TEXTAREA(3, "label.textarea", false),
    MULTI_TEXT(4, "label.multi_text", false),
    RADIO(5, "label.radio", true),
    CHECKBOX(6, "label.checkbox", true);

    private final int id;
    private final String messageKey;
    private final boolean required;

    /**
     * @param id         id
     * @param messageKey message key
     * @param required   True if Values are mandatory
     */
    CustomFieldType(int id, String messageKey, boolean required) {
        this.id = id;
        this.messageKey = messageKey;
        this.required = required;
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

    public boolean isRequired() {
        return required;
    }
}