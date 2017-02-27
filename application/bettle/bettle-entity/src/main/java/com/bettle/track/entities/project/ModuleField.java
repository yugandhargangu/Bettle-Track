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
 * ModuleField is an Entity used for m_module_custom_fields table.
 * Created date : 2017/02/02.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_module_custom_fields")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_module_field", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class ModuleField extends AbstractParentEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", unique = true, nullable = false, insertable = true, updatable = false)
    @NotFound
    private Module module_id;
    @Column(name = "label", length = 11, nullable = false, insertable = true, updatable = true)
    private String label;
    @Column(name = "select_flag", length = 1, nullable = false, insertable = true, updatable = true)
    private boolean select_flag;
    @Column(name = "select_options", nullable = false, insertable = true, updatable = true)
    private String select_options;
    @Column(name = "null_flag", length = 1, nullable = false, insertable = true, updatable = true)
    private boolean null_flag;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "module_custom_field_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_issue_field")
    private Set<IssueField> listIssueFields;

}
