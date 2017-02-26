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
 * IssueComment is and entity fot m_comment table
 * Created date : 2017/02/03.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_comments")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "issue_comments", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class IssueComment extends AbstractParentEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issue_id", nullable = false, insertable = true, updatable = false)
    @NotFound
    private Issue issue_id;
    @Column(name = "comment", nullable = false, insertable = true, updatable = true)
    private String comment;

}
