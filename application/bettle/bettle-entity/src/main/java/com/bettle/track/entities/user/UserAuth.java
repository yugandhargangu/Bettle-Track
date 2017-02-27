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
 * UserAuth is an entity of m_user_auth table.
 * <p>
 * Create Date: 2017/01/27
 *
 * @author Ranjeet Parashar
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_user_auth")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_user_auth", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class UserAuth extends AbstractParentEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = false, nullable = false, insertable = true, updatable = false)
    @NotFound
    private User user_id;
    @Column(name = "passcode", length = 200, nullable = false, insertable = true, updatable = false)
    private String passcode;

}

