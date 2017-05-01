package com.bettle.track.entities.project;

import com.bettle.track.entities.AbstractParentEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.*;

import javax.persistence.CascadeType;
import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Set;

/**
 * ProjectPage is an entity of m_project_pages table.
 * <p>
 * Create Date: 2017/01/27
 *
 * @author Ranjeet Parashar
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_project_pages")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_project_page", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class ProjectPage extends AbstractParentEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false, insertable = true, updatable = false)
    @NotFound
    private ProjectMember project_id;
    @Column(name = "page_name", length = 50, nullable = false, insertable = true, updatable = true)
    private String page_name;
    @Column(name = "extra_", length = 100, nullable = true, insertable = true, updatable = true)
    private String extra_; // TODO
    @Column(name = "page_content", nullable = false, insertable = true, updatable = true)
    private String page_content;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "project_page_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_project_page_access")
    private Set<ProjectPageAccess> listProjectPageAccesses;
}
