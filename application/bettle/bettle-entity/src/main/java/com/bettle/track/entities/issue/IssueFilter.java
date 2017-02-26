package com.bettle.track.entities.issue;

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
 * IssueFilter is an Entity for m_filters table.
 * Created date : 2017/02/02.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_filters")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "Issue_filter", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class IssueFilter extends AbstractParentEntity {
    @Column(name = "filter_name", length = 50, nullable = false, insertable = true, updatable = true)
    private String filter_name;
    @Column(name = "filter_description", nullable = false, insertable = true, updatable = true)
    private String filter_description;
    @Column(name = "share_with", length = 1, nullable = false, insertable = true, updatable = true)
    private int share_with;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "filter_id", cascade = CascadeType.PERSIST)
    @Filter(name = "Issue_filter_sharing")
    private Set<IssueFilterSharing> listIssueFilterSharings;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "filter_id", cascade = CascadeType.PERSIST)
    @Filter(name = "Issue_filter_field")
    private Set<IssueFilterField> listIssueFilterFields;
}
