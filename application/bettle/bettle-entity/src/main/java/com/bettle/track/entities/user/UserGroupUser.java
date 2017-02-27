package com.bettle.track.entities.user;

import com.bettle.track.entities.AbstractParentEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * UserGroupUser is an entity of  m_user_group_users table.
 * <p>
 * Create Date: 2017/01/27
 *
 * @author Ranjeet Parashar
 * @version 1.0
 * @since 1.0
 */

@Entity
@Table(name = "m_user_group_users")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_user_group_users", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class UserGroupUser extends AbstractParentEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "group_id", unique = false, nullable = false, insertable = true, updatable = false)
    @NotFound
    private UserGroup group_id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = false, nullable = false, insertable = true, updatable = false)
    @NotFound
    private User user_id;

}
