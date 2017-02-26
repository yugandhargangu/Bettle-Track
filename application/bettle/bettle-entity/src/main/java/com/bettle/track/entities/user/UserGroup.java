package com.bettle.track.entities.user;

import com.bettle.track.entities.AbstractParentEntity;
import com.bettle.track.entities.issue.IssueFilterField;
import com.bettle.track.entities.issue.IssueFilterSharing;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Set;

/**
 * UserGroup is an entity of m_user_group table.
 * <p>
 * Create Date: 2017/01/27
 *
 * @author Ranjeet Parashar
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_user_group")
@Where(clause = "active_flag = 1")
@EqualsAndHashCode(callSuper = true)
@Data
public class UserGroup extends AbstractParentEntity {

    @Column(name = "group_name", length = 50, unique = false, nullable = false, insertable = true, updatable = true)
    private String group_name;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "group_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_user_group_users")
    private Set<UserGroupUser> listUser = null;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user_group_id", cascade = CascadeType.PERSIST)
    @Filter(name = "Issue_filter_field")
    private Set<IssueFilterField> listIssueFilterFields;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "user_group_id", cascade = CascadeType.PERSIST)
    @Filter(name = "Issue_filter_sharing")
    private Set<IssueFilterSharing> listIssueFilterSharings;
}
