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
 * ProjectFile is an entity of m_project_files table.
 * <p>
 * Create Date: 2017/01/27
 *
 * @author Ranjeet Parashar
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_project_files")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_project_file", defaultCondition = "active_flag = 1"),
        @FilterDef(name = "active_parent_project_file", defaultCondition = "active_flag = 1 AND parent_id IS NULL")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class ProjectFile extends AbstractParentEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false, insertable = true, updatable = false)
    @NotFound
    private Project project_id;
    @Column(name = "file_type", length = 2, nullable = false, insertable = true, updatable = true)
    private int file_type = 0;
    @Column(name = "file_name", length = 50, nullable = false, insertable = true, updatable = true)
    private String file_name;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id", nullable = true, insertable = true, updatable = true)
    @NotFound
    private ProjectFile parent_id;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "parent_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_project_file")
    private Set<ProjectFile> listProjectFiles;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "project_file_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_file_access")
    private Set<ProjectFileAccess> listProjectFileAccesses;

}
