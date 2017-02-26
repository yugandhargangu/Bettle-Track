package com.bettle.track.entities.dashboard;

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
 * Dashboard is an Entity for m_dashboard table
 * Created date : 2017/02/14.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_dashboard")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_dashboard", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class Dashboard extends AbstractParentEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", unique = false, nullable = false, insertable = true, updatable = false)
    @NotFound
    private User user_id;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "dashboard_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_dashboard_data")
    private Set<DashboardData> listDashboardDataSet;
    @Column(name = "dashboard_title", length = 100, nullable = false, insertable = true, updatable = true)
    private String dashboard_title;
}
