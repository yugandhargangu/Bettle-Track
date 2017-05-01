package com.bettle.track.entities.test;

import com.bettle.track.entities.AbstractParentEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * TestCaseActivity  is an Entity for m_test_case_activity table
 * Created date : 2017/02/14.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_test_case_activity")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_testCaseActivity", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class TestCaseActivity extends AbstractParentEntity {
    @Column(name = "activity_name", length = 50, nullable = false, insertable = true, updatable = true)
    private String activity_name;
}
