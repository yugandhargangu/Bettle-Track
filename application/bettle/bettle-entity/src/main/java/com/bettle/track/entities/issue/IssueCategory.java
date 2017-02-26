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
 * IssueCategory  is an Entity for m_issues_categories
 * Created date : 2017/02/02.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_issues_categories")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "issues_categories", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class IssueCategory extends AbstractParentEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issue_id", nullable = false, insertable = true, updatable = false)
    @NotFound
    private Issue issue_id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false, insertable = true, updatable = false)
    @NotFound
    private Category category_id;

}
