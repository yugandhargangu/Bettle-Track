package com.bettle.track.entities.issue;

import com.bettle.track.entities.AbstractParentEntity;
import com.bettle.track.entities.project.Project;
import com.bettle.track.entities.user.UserGroup;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * IssueFilterField is an Entity for m_filters table.
 * Created date : 2017/02/02.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_filters")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "Issue_filter_field", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class IssueFilterField extends AbstractParentEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "filter_id", nullable = false, insertable = true, updatable = false)
    @NotFound
    private IssueFilter filter_id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false, insertable = true, updatable = false)
    @NotFound
    private Project project_id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_group_id", nullable = false, insertable = true, updatable = false)
    @NotFound
    private UserGroup user_group_id;
}
