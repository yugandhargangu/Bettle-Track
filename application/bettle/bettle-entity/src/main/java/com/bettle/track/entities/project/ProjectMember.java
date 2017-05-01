package com.bettle.track.entities.project;

import com.bettle.track.entities.AbstractParentEntity;
import com.bettle.track.entities.user.User;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.*;

import javax.persistence.CascadeType;
import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.Set;

/**
 * ProjectMember is an entity of m_users_projects table.
 * <p>
 * Create Date: 2017/01/27
 *
 * @author Ranjeet Parashar
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_users_projects")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_project_members", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class ProjectMember extends AbstractParentEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, insertable = true, updatable = false)
    @NotFound
    private User user_id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false, insertable = true, updatable = false)
    @NotFound
    private Project project_id;
    @Column(name = "role_id", length = 11, nullable = false, insertable = true, updatable = false)
    private int role_id;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "project_member_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_file_access")
    private Set<ProjectFileAccess> listProjectFileAccesses;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "project_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_project_page")
    private Set<ProjectPage> listProjectPages;

}
