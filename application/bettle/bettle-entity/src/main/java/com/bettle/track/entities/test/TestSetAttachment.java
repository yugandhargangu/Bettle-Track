package com.bettle.track.entities.test;

import com.bettle.track.entities.AbstractParentEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.Where;

import javax.persistence.*;

/**
 * TestSetAttachment is an Entity for m_test_set_attachments table
 * Created date : 2017/02/14.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_test_set_attachments")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_test_set_attachment", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class TestSetAttachment extends AbstractParentEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_set_id", nullable = false, insertable = true, updatable = false)
    private TestSet test_set_id;
    @Column(name = "attachment_name", length = 50, nullable = false, insertable = true, updatable = false)
    private String attachment_name;
    @Column(name = "attachment_path", length = 250, nullable = false, insertable = true, updatable = false)
    private String attachment_path;
}
