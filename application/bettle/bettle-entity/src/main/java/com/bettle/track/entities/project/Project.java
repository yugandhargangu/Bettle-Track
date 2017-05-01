package com.bettle.track.entities.project;

import com.bettle.track.entities.AbstractParentEntity;
import com.bettle.track.entities.issue.Issue;
import com.bettle.track.entities.issue.IssueFilterField;
import com.bettle.track.entities.issue.IssueFilterSharing;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Set;

/**
 * Project is an entity of class of m_projects table..
 * <p>
 * Create Date: 2017/01/27
 *
 * @author Ranjeet Parashar
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_projects")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_project", defaultCondition = "active_flag == 1")

})

@EqualsAndHashCode(callSuper = true)
@Data
public class Project extends AbstractParentEntity {

    @Column(name = "project_id", length = 8, unique = true, nullable = false, insertable = true, updatable = false)
    private String project_id;
    @Column(name = "project_name", length = 100, nullable = false, insertable = true, updatable = true)
    private String project_name;
    @Column(name = "project_type", length = 100, nullable = false, insertable = true, updatable = true)
    private String project_type;
    @Column(name = "short_description", length = 1000, nullable = false, insertable = true, updatable = true)
    private String short_description;
    @Column(name = "long_description", nullable = true, insertable = true, updatable = true)
    private String long_description;
    @Column(name = "start_date", nullable = true, insertable = true, updatable = true)
    private LocalDate start_date;
    @Column(name = "end_date", nullable = true, insertable = true, updatable = true)
    private LocalDate end_date;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "project_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_project_members")
    private Set<ProjectMember> listProjectMembers;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "project_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_parent_project_file")
    private Set<ProjectFile> listProjectFiles;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "project_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_modules")
    private Set<Module> listModules;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "project_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_project_field")
    private Set<ProjectField> listProjectFields;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "project_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_issue")
    private Set<Issue> listIssues;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "project_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_issue_filter_field")
    private Set<IssueFilterField> listIssueFilterFields;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "project_id", cascade = CascadeType.PERSIST)
    @Filter(name = "active_issue_filter_sharing")
    private Set<IssueFilterSharing> listIssueFilterSharings;

}
