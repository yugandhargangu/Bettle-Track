package com.bettle.track.entities.test;


import com.bettle.track.entities.AbstractParentEntity;
import com.bettle.track.entities.project.Project;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Set;

/**
 * TestCaseAttachment  is an Entity for m_test_folder table
 * Created date : 2017/02/14.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_test_folder")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_test_folder", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class TestCaseDir extends AbstractParentEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = " project_id", nullable = false, insertable = true, updatable = false)
    private Project project_id;
    @Column(name = "folder_name", length = 50, nullable = false, insertable = true, updatable = true)
    private String folder_name;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "parent_id", nullable = true, insertable = true, updatable = true)
    private TestCaseDir parent_id;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "test_folder_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_test_case")
    private Set<TestCase> listTestCases;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "testset_folder_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_test_set")
    private Set<TestSet> listTestSets;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "parent_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_test_set_dir")
    private Set<TestSetDir> listTestSetDirs;

}
