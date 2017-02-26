package com.bettle.track.entities.project;

import com.bettle.track.entities.AbstractParentEntity;
import com.bettle.track.entities.issue.IssueField;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.*;

import javax.persistence.CascadeType;
import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Set;

/**
 * ProjectFile is an entity of m_project_files table.
 * <p>
 * Create Date: 2017/01/27
 *
 * @author Ranjeet Parashar
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_custom_fields")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "project_field", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class ProjectField extends AbstractParentEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false, insertable = true, updatable = false)
    @NotFound
    private Project project_id;
    @Column(name = "label", length = 50, nullable = false, insertable = true, updatable = true)
    private String label;
    @Column(name = "select_flag", length = 1, nullable = false, insertable = true, updatable = true)
    private boolean select_flag = false;
    @Column(name = "select_options", nullable = true, insertable = true, updatable = true)
    private String select_options;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "custom_field_id", cascade = CascadeType.PERSIST)
    @Filter(name = "issue_field")
    private Set<IssueField> listFields;

}
