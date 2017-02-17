package com.bettle.track.utils;

import com.bettle.track.enums.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
public class EnumUtilsTest {

    private static final String WRONG_TYPE = "bettle";

    @Test
    public void fromId() {
        EnumUtils enumUtils = new EnumUtils();
        assertTrue(CustomFieldType.TEXT == enumUtils.fromId(CustomFieldType.class, CustomFieldType.TEXT.getId()));
        assertTrue(FileType.FOLDER == enumUtils.fromId(FileType.class, FileType.FOLDER.getId()));
        assertTrue(IssuePriority.BLOCKER == enumUtils.fromId(IssuePriority.class, IssuePriority.BLOCKER.getId()));
        assertTrue(IssueState.OPEN == enumUtils.fromId(IssueState.class, IssueState.OPEN.getId()));
        assertTrue(IssueType.BUG == enumUtils.fromId(IssueType.class, IssueType.BUG.getId()));
        assertTrue(TestPriority.HIGH == enumUtils.fromId(TestPriority.class, TestPriority.HIGH.getId()));
        assertTrue(TestStatus.NA == enumUtils.fromId(TestStatus.class, TestStatus.NA.getId()));
        assertTrue(Resolution.FIXED == enumUtils.fromId(Resolution.class, Resolution.FIXED.getId()));
        assertTrue(UserRole.ADMINISTRATOR == enumUtils.fromId(UserRole.class, UserRole.ADMINISTRATOR.getId()));
        assertNull(enumUtils.fromId(CustomFieldType.class, 10));
        assertNull(enumUtils.fromId(WrongEnum.class, 1));
    }

    @Test
    public void fileTypeFromExtension() {
        EnumUtils enumUtils = new EnumUtils();
        assertTrue(FileType.UNKNOWN == enumUtils.fileTypeFromExtension(WRONG_TYPE));
        assertTrue(FileType.FOLDER == enumUtils.fileTypeFromExtension(""));
        assertTrue(FileType.TEXT == enumUtils.fileTypeFromExtension("txt"));
        assertTrue(FileType.PICTURE == enumUtils.fileTypeFromExtension("JPG"));
        assertTrue(FileType.MUSIC == enumUtils.fileTypeFromExtension("MP3"));
        assertTrue(FileType.VIDEO == enumUtils.fileTypeFromExtension("mp4"));
        assertTrue(FileType.ARCHIVE == enumUtils.fileTypeFromExtension("zip"));
        assertTrue(FileType.PDF == enumUtils.fileTypeFromExtension("pdf"));
        assertTrue(FileType.WORD == enumUtils.fileTypeFromExtension("doc"));
        assertTrue(FileType.EXCEL == enumUtils.fileTypeFromExtension("xls"));
        assertTrue(FileType.POWERPOINT == enumUtils.fileTypeFromExtension("PPT"));
        assertTrue(FileType.CODE == enumUtils.fileTypeFromExtension("java"));
    }

    private enum WrongEnum {
        // Used for testing
    }
}
