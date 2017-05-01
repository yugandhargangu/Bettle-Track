package com.bettle.track.entities.test;

import com.bettle.track.entities.AbstractParentEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * TestSetDir is an Entity for m_test_set_folder table
 * Created date : 2017/02/14.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_test_set_folder")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_test_set_dir", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class TestSetDir extends AbstractParentEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_case_id", nullable = false, insertable = true, updatable = false)
    private TestCase test_case_id;
    @Column(name = "folder_name", length = 50, nullable = false, insertable = true)
    private String folder_name;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id", nullable = false, insertable = true, updatable = false)
    private TestCaseDir parent_id;

}
