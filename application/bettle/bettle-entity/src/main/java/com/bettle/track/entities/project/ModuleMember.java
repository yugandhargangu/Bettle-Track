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
 * ModuleMember is an entity for m_users_modules table
 * Created date : 2017/02/02.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_users_modules")
@Where(clause = "active_flag = 1")
@FilterDefs(
        {@FilterDef(name = "active_user_modules", defaultCondition = "active_flag = 1")}
)
@EqualsAndHashCode(callSuper = true)
@Data
public class ModuleMember extends AbstractParentEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = true, nullable = false, insertable = true, updatable = false)
    @NotFound
    private User user_id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", nullable = false, insertable = true, updatable = true)
    private Module module_id;
    @Column(name = "role_id", length = 11, nullable = false, insertable = true, updatable = true)
    private int role_id;

}
