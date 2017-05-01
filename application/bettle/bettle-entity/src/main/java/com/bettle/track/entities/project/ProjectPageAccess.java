package com.bettle.track.entities.project;

import com.bettle.track.entities.AbstractParentEntity;
import com.bettle.track.entities.user.User;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * ProjectPageAccess is an entity of m_project_pages_access table.
 * <p>
 * Create Date: 2017/01/27
 *
 * @author Ranjeet Parashar
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_project_pages_access")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_project_page_access", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class ProjectPageAccess extends AbstractParentEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_page_id", nullable = false, insertable = true, updatable = false)
    @NotFound
    private ProjectPage project_page_id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, insertable = true, updatable = false)
    @NotFound
    private User user_id;
    @Column(name = "write_access", length = 1, nullable = false, insertable = true, updatable = true)
    private boolean write_access = true;
    @Column(name = "read_access", length = 1, nullable = false, insertable = true, updatable = true)
    private boolean read_access = true;

}
