package com.bettle.track.entities.test;

import com.bettle.track.entities.AbstractParentEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * TestCaseHistory  is an Entity for m_test_case_history table
 * Created date : 2017/02/14.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_test_case_history")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_test_case_history", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class TestCaseHistory extends AbstractParentEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_case_id", nullable = false, insertable = true, updatable = true)
    private TestCase test_case_id;
    @Column(name = "table_name", length = 50, nullable = true, insertable = true, updatable = true)
    private String table_name;
    @Column(name = "field_name", length = 50, nullable = true, insertable = true, updatable = true)
    private String field_name;
    @Column(name = "old_value", length = 250, nullable = true, insertable = true, updatable = true)
    private String old_value;
    @Column(name = "new_value", length = 250, nullable = false, insertable = true, updatable = true)
    private String new_value;

}
