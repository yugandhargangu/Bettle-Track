package com.bettle.track.entities.test;

import com.bettle.track.entities.AbstractParentEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * TestSetInfo is an Entity for m_test_set_info table
 * Created date : 2017/02/14.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_test_set_info")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_test_set_info", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class TestSetInfo extends AbstractParentEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_set_id", nullable = false, insertable = true, updatable = false)
    private TestSet test_set_id;
    @Column(name = "test_set_name", length = 50, nullable = false, insertable = true, updatable = false)
    private String test_set_name;
    @Column(name = "status_id", length = 11, nullable = false, insertable = true, updatable = false)
    private int status_id;
    @Column(name = "priority_id", length = 11, nullable = false, insertable = true, updatable = false)
    private int priority_id;
    @Column(name = "test_description", length = 1000, nullable = true, insertable = true, updatable = false)
    private String test_description;
    @Column(name = "test_comments", length = 1000, nullable = true, insertable = true, updatable = false)
    private String test_comments;

}
