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
 * TestSet is an Entity for m_test_set table
 * Created date : 2017/02/14.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_test_set")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_test_set", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class TestSet extends AbstractParentEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "testset_folder_id", nullable = false, insertable = true, updatable = false)
    private TestCaseDir testset_folder_id;
    @Column(name = "testset_label", length = 50, nullable = false, insertable = true, updatable = false)
    private String testset_label;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "test_set_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_test_set_info")
    private Set<TestSetInfo> listTestSetInfos;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "test_set_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_test_set_issue")
    private Set<TestSetIssue> listTestSetIssues;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "test_set_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_test_set_attachment")
    private Set<TestSetAttachment> listTestSetAttachments;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "test_set_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_test_set_exec")
    private Set<TestSetExec> listTestSetExecs;


}
