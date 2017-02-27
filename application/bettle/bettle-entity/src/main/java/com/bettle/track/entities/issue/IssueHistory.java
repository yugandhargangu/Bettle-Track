package com.bettle.track.entities.issue;


import com.bettle.track.entities.AbstractParentEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * IssueTag is an Entity for m_issues_history table.
 * Created date : 2017/02/02.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_issues_history")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_issue_history", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class IssueHistory extends AbstractParentEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issue_id", nullable = false, insertable = true, updatable = false)
    @NotFound
    private Issue issue_id;
    @Column(name = "history_type", length = 10, nullable = false, insertable = true, updatable = false)
    private String history_type;
    @Column(name = "history_id", length = 11, nullable = false, insertable = true, updatable = false)
    private int history_id;
}
