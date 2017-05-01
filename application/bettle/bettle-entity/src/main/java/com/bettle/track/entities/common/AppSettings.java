package com.bettle.track.entities.common;

import com.bettle.track.entities.AbstractParentEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterDefs;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * AppSettings is an Entity for m_settings table
 * Created date : 2017/02/14.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_settings")
@Where(clause = "active_flag = 1")
@FilterDefs({
        @FilterDef(name = "active_app_settings", defaultCondition = "active_flag = 1")
})
@Data
@EqualsAndHashCode(callSuper = true)
public class AppSettings extends AbstractParentEntity {
    @Column(name = "key", length = 100, nullable = false, insertable = true, updatable = true)
    private String key;
    @Column(name = "value", length = 1000, nullable = false, insertable = true, updatable = true)
    private String value;
}
