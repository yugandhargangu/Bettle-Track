package com.bettle.track.entities.test;

import com.bettle.track.entities.AbstractParentEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * TestCaseRequirement is an Entity for m_test_requirements table
 * Created date : 2017/02/14.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_test_requirements")
@Where(clause = "active_flag = 1")
@FilterDefs(
        {@FilterDef(name = "active_test_case_requirement", defaultCondition = "active_flag = 1")}
        )
@EqualsAndHashCode(callSuper = true)
@Data
public class TestCaseRequirement extends AbstractParentEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_case_id", nullable = false, insertable = true, updatable = true)
    private TestCase test_case_id;
    @Column(name = "step_no", length = 2, nullable = false, insertable = true, updatable = false)
    private int step_no;
    @Column(name = "requirement", length = 250, nullable = false, insertable = true, updatable = false)
    private String requirement;
    @Column(name = "step_description", length = 250, nullable = true, insertable = true, updatable = false)
    private String step_description;
    @Column(name = "step_comments", length = 250, nullable = true, insertable = true, updatable = false)
    private String step_comments;

}
