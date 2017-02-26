package com.bettle.track.entities.issue;

import com.bettle.track.entities.AbstractParentEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Where;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * Category is an entity for m_categories table
 * Created date : 2017/02/02.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_categories")
@Where(clause = "active_flag = 1")
@EqualsAndHashCode(callSuper = true)
@Data
public class Category extends AbstractParentEntity {

    @Column(name = "category", length = 100, nullable = false, insertable = true, updatable = false)
    private String category;
}
