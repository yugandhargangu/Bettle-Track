package com.bettle.track.entities.user;


import com.bettle.track.entities.AbstractParentEntity;
import com.bettle.track.entities.common.IPBlock;
import com.bettle.track.entities.dashboard.Dashboard;
import com.bettle.track.entities.issue.Issue;
import com.bettle.track.entities.project.ModuleMember;
import com.bettle.track.entities.project.ProjectMember;
import com.bettle.track.entities.project.ProjectPageAccess;
import com.bettle.track.entities.test.TestSetExec;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Set;

/**
 * User is an entity of m_users table.
 * <p>
 * Create Date: 2017/01/27
 *
 * @author Ranjeet Parashar
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_users")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_user", defaultCondition = "active_flag == 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class User extends AbstractParentEntity {

    @Column(name = "user_id", length = 8, unique = true, nullable = false, insertable = true, updatable = false)
    private String user_id;
    @Column(name = "login_count", length = 6, unique = false, nullable = false, insertable = true, updatable = true)
    private int login_count = 0;
    @Column(name = "status_flag", length = 1, unique = false, nullable = false, insertable = true, updatable = true)
    private boolean status_flag = false;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_user_info")
    private Set<UserInfo> listUserInfos;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_user_auth")
    private Set<UserAuth> listUserAuths;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_project_page_access")
    private Set<ProjectPageAccess> listProjectPageAccesses;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_user_roles")
    private Set<UserAndRole> listUserAndRoles;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_project_members")
    private Set<ProjectMember> listProjectMembers;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_user_group_users")
    private Set<UserGroupUser> listUserGroups;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_user_modules")
    private Set<ModuleMember> listModuleMembers;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "responsible_user", cascade = CascadeType.PERSIST)
    @Filter(name = "active_issue")
    private Set<Issue> listIssues;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "responsible_user_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_test_set_exec")
    private Set<TestSetExec> listTestSetExecs;


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "unblocked_by", cascade = CascadeType.PERSIST)
    @Filter(name = "active_ip_block")
    private Set<IPBlock> listIPBlocks;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_dashboard")
    private Set<Dashboard> listDashboards;

}
