package com.bettle.track.utils;

import com.bettle.track.enums.*;
import org.springframework.stereotype.Component;

/**
 * EnumUtils is an utility class enum objects.
 * <p>
 * Create Date: 2017/01/27
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
@Component
public final class EnumUtils {

    private static final String CUSTOM_FIELD_TYPE = "com.bettle.track.enums.CustomFieldType";
    private static final String FILE_TYPE = "com.bettle.track.enums.FileType";
    private static final String ISSUE_PRIORITY = "com.bettle.track.enums.IssuePriority";
    private static final String ISSUE_STATE = "com.bettle.track.enums.IssueState";
    private static final String ISSUE_TYPE = "com.bettle.track.enums.IssueType";
    private static final String RESOLUTION = "com.bettle.track.enums.Resolution";
    private static final String TEST_PRIORITY = "com.bettle.track.enums.TestPriority";
    private static final String TEST_STATUS = "com.bettle.track.enums.TestStatus";
    private static final String USER_ROLE = "com.bettle.track.enums.UserRole";

    /**
     * To get enum object by passing the id of that particular enum.
     *
     * @param enumType Any Enum type
     * @param id       id of enum
     * @param <T>      Enum type
     * @return enum object
     */
    @SuppressWarnings("unchecked")
    public <T extends Enum> T fromId(Class<T> enumType, int id) {
        switch (enumType.getName()) {
            case CUSTOM_FIELD_TYPE:
                for (CustomFieldType customFieldType : CustomFieldType.values()) {
                    if (customFieldType.getId() == id) {
                        return (T) customFieldType;
                    }
                }
                return null;
            case FILE_TYPE:
                for (FileType fileType : FileType.values()) {
                    if (fileType.getId() == id) {
                        return (T) fileType;
                    }
                }
                return null;
            case ISSUE_PRIORITY:
                for (IssuePriority issuePriority : IssuePriority.values()) {
                    if (issuePriority.getId() == id) {
                        return (T) issuePriority;
                    }
                }
                return null;
            case ISSUE_STATE:
                for (IssueState issueState : IssueState.values()) {
                    if (issueState.getId() == id) {
                        return (T) issueState;
                    }
                }
                return null;
            case ISSUE_TYPE:
                for (IssueType issueType : IssueType.values()) {
                    if (issueType.getId() == id) {
                        return (T) issueType;
                    }
                }
                return null;
            case RESOLUTION:
                for (Resolution resolution : Resolution.values()) {
                    if (resolution.getId() == id) {
                        return (T) resolution;
                    }
                }
                return null;
            case TEST_PRIORITY:
                for (TestPriority testPriority : TestPriority.values()) {
                    if (testPriority.getId() == id) {
                        return (T) testPriority;
                    }
                }
                return null;
            case TEST_STATUS:
                for (TestStatus testStatus : TestStatus.values()) {
                    if (testStatus.getId() == id) {
                        return (T) testStatus;
                    }
                }
                return null;
            case USER_ROLE:
                for (UserRole userRole : UserRole.values()) {
                    if (userRole.getId() == id) {
                        return (T) userRole;
                    }
                }
                return null;
            default:
                break;
        }
        return null;
    }

    /**
     * @param ext file extension
     * @return FileType
     */
    public FileType fileTypeFromExtension(String ext) {
        ext = ext.toLowerCase();
        for (FileType fileType : FileType.values()) {
            if (fileType.getExtentions() != null && fileType.getExtentions().contains(ext)) {
                return fileType;
            }
        }
        return FileType.UNKNOWN;
    }

}