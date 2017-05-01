package com.bettle.track.entities.test;


import com.bettle.track.entities.AbstractParentEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * TestCaseParam is an Entity for m_test_parameters table
 * Created date : 2017/02/14.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_test_parameters")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "m_test_case_info", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class TestCaseParam extends AbstractParentEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_case_id", nullable = false, insertable = true, updatable = false)
    private TestCase test_case_id;
    @Column(name = "step_no", length = 2, nullable = false, insertable = true, updatable = true)
    private int step_no;
    @Column(name = "param_name", length = 50, nullable = false, insertable = true, updatable = true)
    private String param_name;
    @Column(name = "default_value", length = 250, nullable = true, insertable = true, updatable = true)
    private String default_value;
    @Column(name = "param_description", length = 250, nullable = true, insertable = true, updatable = true)
    private String param_description;
    @Column(name = "param_comments", length = 250, nullable = true, insertable = true, updatable = true)
    private String param_comments;


}
