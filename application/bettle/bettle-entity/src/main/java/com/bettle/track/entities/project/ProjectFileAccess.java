package com.bettle.track.entities.project;

import com.bettle.track.entities.AbstractParentEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * ProjectFileAccess is an entity of m_project_files_access table.
 * <p>
 * Create Date: 2017/01/27
 *
 * @author Ranjeet Parashar
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_project_files_access")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_file_access", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class ProjectFileAccess extends AbstractParentEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_file_id", nullable = false, insertable = true, updatable = false)
    @NotFound
    private ProjectFile project_file_id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, insertable = true, updatable = false)
    @NotFound
    private ProjectMember project_member_id;
    @Column(name = "write_access", length = 1, nullable = false, insertable = true, updatable = true)
    private boolean write_access = true;
    @Column(name = "read_access", length = 1, nullable = false, insertable = true, updatable = true)
    private boolean read_access = true;

}
