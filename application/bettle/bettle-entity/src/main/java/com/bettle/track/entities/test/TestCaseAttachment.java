package com.bettle.track.entities.test;

import com.bettle.track.entities.AbstractParentEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * TestCaseAttachment  is an Entity for m_test_case_attachments table
 * Created date : 2017/02/14.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_test_case_attachments")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "m_testCaseAttachment", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class TestCaseAttachment extends AbstractParentEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_case_id", nullable = false, insertable = true, updatable = true)
    private TestCase test_case_id;
    @Column(name = "attachment_name", length = 50, insertable = true, updatable = true)
    private String attachment_name;
    @Column(name = "attachment_path", length = 250, insertable = true, updatable = true)
    private String attachment_path;

}
