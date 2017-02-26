package com.bettle.track.entities.issue;

import com.bettle.track.entities.AbstractParentEntity;
import com.bettle.track.entities.project.Module;
import com.bettle.track.entities.project.Project;
import com.bettle.track.entities.test.TestCaseIssue;
import com.bettle.track.entities.test.TestSetIssue;
import com.bettle.track.entities.user.User;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.*;

import javax.persistence.CascadeType;
import javax.persistence.*;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.time.LocalDate;
import java.util.Set;

/**
 * Issue is an entity for m_issues table
 * Created date : 2017/02/02.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_issues")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "issue", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class Issue extends AbstractParentEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = true, insertable = true, updatable = false)
    @NotFound
    private Project project_id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", nullable = true, insertable = true, updatable = true)
    @NotFound
    private Module module_id;
    @Column(name = "issue_type_id", length = 11, nullable = false, insertable = true, updatable = true)
    private int issue_type_id;
    @Column(name = "summary", length = 100, nullable = false, insertable = true, updatable = true)
    private String summary;
    @Column(name = "priority_id", length = 11, nullable = false, insertable = true, updatable = true)
    private int priority_id;
    @Column(name = "due_date", nullable = true, insertable = true, updatable = true)
    private LocalDate due_date;
    @Column(name = "affect_version", length = 100, nullable = true, insertable = true, updatable = true)
    private String affect_version;
    @Column(name = "fix_version", length = 100, nullable = true, insertable = true, updatable = true)
    private String fix_version;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "responsible_user", nullable = true, insertable = true, updatable = true)
    @NotFound
    private User responsible_user;
    @Column(name = "environment", length = 1000, nullable = true, insertable = true, updatable = true)
    private String environment;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "issue_id", cascade = CascadeType.PERSIST)
    @Filter(name = "issue_tag")
    private Set<IssueTag> listIssueTags;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "issue_id", cascade = CascadeType.PERSIST)
    @Filter(name = "issues_categories")
    private Set<IssueCategory> listIssueCategories;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "issue_id", cascade = CascadeType.PERSIST)
    @Filter(name = "issue_desc")
    private Set<IssueDesc> listIssueDescs;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "issue_id", cascade = CascadeType.PERSIST)
    @Filter(name = "issue_procedures")
    private Set<IssueProcedure> listIssueProcedures;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "issue_id", cascade = CascadeType.PERSIST)
    @Filter(name = "issue_attachment")
    private Set<IssueAttchment> listIssueAttchments;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "issue_id", cascade = CascadeType.PERSIST)
    @Filter(name = "issue_comments")
    private Set<IssueComment> listIssueComments;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "issue_id", cascade = CascadeType.PERSIST)
    @Filter(name = "issue_status")
    private Set<IssueStatus> listIssueStatuses;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "issue_id", cascade = CascadeType.PERSIST)
    @Filter(name = "issue_history")
    private Set<IssueHistory> listIssueHistories;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "issue_id", cascade = CascadeType.PERSIST)
    @Filter(name = "issue_field")
    private Set<IssueField> listIssueFields;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "issue_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_test_case_issue")
    private Set<TestCaseIssue> listTestCaseIssues;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "issue_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_test_set_issue")
    private Set<TestSetIssue> listTestSetIssues;

}
