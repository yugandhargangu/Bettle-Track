package com.bettle.track.entities.issue;

import com.bettle.track.entities.AbstractParentEntity;
import com.bettle.track.entities.project.ModuleField;
import com.bettle.track.entities.project.ProjectField;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * IssueField is an Entity for m_issue_custom_fields table.
 * Created date : 2017/02/02.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_issue_custom_fields")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_issue_field", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class IssueField extends AbstractParentEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "issue_id", nullable = false, insertable = true, updatable = false)
    @NotFound
    private Issue issue_id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "custom_field_id", nullable = false, insertable = true, updatable = false)
    @NotFound
    private ProjectField custom_field_id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_custom_field_id", nullable = false, insertable = true, updatable = false)
    @NotFound
    private ModuleField module_custom_field_id;

}
