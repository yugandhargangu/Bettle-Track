package com.bettle.track.entities.test;

import com.bettle.track.entities.AbstractParentEntity;
import com.bettle.track.entities.user.User;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * TestSetExec is an Entity for m_test_set_exec table
 * Created date : 2017/02/14.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_test_set_exec")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_test_set_exec", defaultCondition = "active_flag = 1")
})
@EqualsAndHashCode(callSuper = true)
@Data
public class TestSetExec extends AbstractParentEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_set_id", nullable = false, insertable = true, updatable = false)
    private TestSet test_set_id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "test_id", nullable = false, insertable = true, updatable = false)
    private TestCase test_id;
    @Column(name = "step_no", length = 2, nullable = false, insertable = true, updatable = true)
    private int step_no;
    @Column(name = "test_exec_status", length = 2, nullable = false, insertable = true, updatable = true)
    private int test_exec_status;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "responsible_user_id", nullable = false, insertable = true, updatable = false)
    private User responsible_user_id;
    @Column(name = "exec_at", nullable = false, insertable = true, updatable = true)
    private LocalDateTime exec_at;
    @Column(name = "software", length = 250, nullable = true, insertable = true, updatable = true)
    private String software;
    @Column(name = "hardware", length = 250, nullable = true, insertable = true, updatable = true)
    private String hardware;
    @Column(name = "exec_comments", length = 250, nullable = true, insertable = true, updatable = true)
    private String exec_comments;

}
