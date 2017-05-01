package com.bettle.track.entities.test;

import com.bettle.track.entities.AbstractParentEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Set;

/**
 * TestCase  is an Entity for m_test_case table
 * Created date : 2017/02/14.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_test_case")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_test_case", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class TestCase extends AbstractParentEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_folder_id", nullable = false, insertable = true, updatable = false)
    private TestCaseDir test_folder_id;
    @Column(name = "testcase_label", length = 50, nullable = false, insertable = true, updatable = true)
    private String testcase_label;


    @OneToMany(fetch = FetchType.LAZY, mappedBy = "test_case_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_test_case_info")
    private Set<TestCaseInfo> listTestCaseInfos;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "test_case_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_test_case_attachment")
    private Set<TestCaseAttachment> listTestCaseAttachments;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "test_case_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_test_case_history")
    private Set<TestCaseHistory> listTestCaseHistories;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "test_case_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_test_case_issue")
    private Set<TestCaseIssue> listTestCaseIssues;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "test_case_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_test_case_requirement")
    private Set<TestCaseRequirement> listTestCaseRequirements;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "test_case_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_test_case_step")
    private Set<TestCaseStep> listTestCaseSteps;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "test_case_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_test_set_dir")
    private Set<TestSetDir> listTestSetDirs;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "test_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_test_set_exec")
    private Set<TestSetExec> listTestSetExecs;

}
