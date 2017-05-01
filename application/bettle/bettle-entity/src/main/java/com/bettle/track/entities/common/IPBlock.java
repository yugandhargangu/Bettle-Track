package com.bettle.track.entities.common;

import com.bettle.track.entities.AbstractParentEntity;
import com.bettle.track.entities.user.User;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * IPBlock is an Entity for m_ip_block table
 * Created date : 2017/02/14.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_ip_block")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_ip_block", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class IPBlock extends AbstractParentEntity {
    @Column(name = "ip_addr", length = 50, nullable = false, insertable = true, updatable = true)
    private String ip_addr;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "unblocked_by", nullable = true, insertable = true, updatable = false)
    private User unblocked_by;
}
