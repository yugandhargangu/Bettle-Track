package com.bettle.track.entities.project;

import com.bettle.track.entities.AbstractParentEntity;
import com.bettle.track.entities.issue.Issue;
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
 * Modules is an Entity for m_modules table
 * Created date : 2017/01/27.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_modules")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_modules", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class Module extends AbstractParentEntity {
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "project_id", nullable = false, insertable = true, updatable = false)
    @NotFound
    private Project project_id;
    @Column(name = "module_name", length = 100, nullable = false, insertable = true, updatable = true)
    private String module_name;
    @Column(name = "short_description", length = 1000, nullable = false, insertable = true, updatable = true)
    private String short_description;
    @Column(name = "long_description", nullable = true, insertable = true, updatable = true)
    private String long_description;
    @Column(name = "start_date", nullable = true, insertable = true, updatable = true)
    private LocalDate start_date;
    @Column(name = "end_date", nullable = true, insertable = true, updatable = true)
    private LocalDate end_date;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "module_id", cascade = CascadeType.PERSIST)
    @Filter(name = "issue")
    private Set<Issue> listIssues;

}
