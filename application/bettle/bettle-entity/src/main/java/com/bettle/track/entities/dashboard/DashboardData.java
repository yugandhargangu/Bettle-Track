package com.bettle.track.entities.dashboard;

import com.bettle.track.entities.AbstractParentEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * DashboardData is an Entity for m_dashboard_data table
 * Created date : 2017/02/14.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_dashboard_data")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_dashboard_data", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data

public class DashboardData extends AbstractParentEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "dashboard_id", unique = false, nullable = false, insertable = true, updatable = false)
    @NotFound
    private Dashboard dashboard_id;
    @Column(name = "section_no", length = 11, nullable = false, insertable = true, updatable = true)
    private int section_no;
    @Column(name = "sub_section_no", length = 2, nullable = false, insertable = true, updatable = true)
    private int sub_section_no;
    @Column(name = "view_label", length = 100, nullable = false, insertable = true, updatable = true)
    private String view_label;
    @Column(name = "view_type", length = 50, nullable = false, insertable = true, updatable = true)
    private String view_type;
    @Column(name = "view_extra", nullable = false, insertable = true, updatable = true)
    private String view_extra;

}
