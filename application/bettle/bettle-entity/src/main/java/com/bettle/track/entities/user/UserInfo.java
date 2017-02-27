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
 * UserInfo is an entity of  m_user_info table.
 * <p>
 * Create Date: 2017/01/27
 *
 * @author Ranjeet Parashar
 * @version 1.0
 * @since 1.0
 */

@Entity
@Table(name = "m_user_info")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_user_info", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class UserInfo extends AbstractParentEntity {

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id", unique = false, nullable = false, insertable = true, updatable = false)
    @NotFound
    private User user_id;
    @Column(name = "email_id", length = 100, unique = false, nullable = false, insertable = true, updatable = false)
    private String email_id;
    @Column(name = "full_name", length = 100, unique = false, nullable = false, insertable = true, updatable = false)
    private String full_name;
    @Column(name = "position", length = 100, unique = false, nullable = false, insertable = true, updatable = false)
    private String position;
    @Column(name = "receive_email", length = 1, unique = false, nullable = false, insertable = true, updatable = false)
    private boolean receive_email;
    @Column(name = "email_type_html", length = 1, unique = false, nullable = false, insertable = true, updatable = false)
    private boolean email_type_html;
    @Column(name = "language", length = 10, unique = false, nullable = false, insertable = true, updatable = false)
    private String language;
    @Column(name = "time_zone", length = 50, unique = true, nullable = false, insertable = true, updatable = false)
    private String time_zone;

}
