package com.bettle.track.entities.test;

import com.bettle.track.entities.AbstractParentEntity;
import com.bettle.track.entities.issue.Issue;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.Where;

import javax.persistence.*;


/**
 * TestCaseIssue is an Entity for m_test_case_issues table
 * Created date : 2017/02/14.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_test_case_issues")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_test_case_issue", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class TestCaseIssue extends AbstractParentEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_case_id", nullable = false, insertable = true, updatable = true)
    private TestCase test_case_id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issue_id", nullable = false, insertable = true, updatable = true)
    private Issue issue_id;
}
