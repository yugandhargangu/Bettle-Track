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
 * TestSetIssue is an Entity for  m_test_set_issues table
 * Created date : 2017/02/14.
 * <p>
 * import javax.persistence.Entity;
 * import javax.persistence.Table;
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = " m_test_set_issues")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_test_set_issue", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class TestSetIssue extends AbstractParentEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_set_id", nullable = false, insertable = true, updatable = false)
    private TestSet test_set_id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issue_id", nullable = false, insertable = true, updatable = false)
    private Issue issue_id;

}
