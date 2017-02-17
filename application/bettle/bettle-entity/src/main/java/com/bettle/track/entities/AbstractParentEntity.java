package com.bettle.track.entities;

import com.bettle.track.entities.user.User;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

/**
 * AbstractParentEntity is  the  super class of all entities..
 * <p>
 * Create Date: 2017/01/27
 *
 * @author Ranjeet Parashar
 * @version 1.0
 * @since 1.0
 */

@MappedSuperclass
public abstract class AbstractParentEntity {

    @Id
    @GeneratedValue
    @Column(name = "id", length = 11, unique = true, nullable = false, insertable = true, updatable = false)
    private long id;
    @Column(name = "active_flag", length = 1, nullable = false, insertable = true, updatable = true)
    private boolean active_flag = true;
    @Column(name = "created_at", nullable = true, insertable = true, updatable = false)
    private LocalDateTime created_at;
    @Column(name = "updated_at", nullable = true, insertable = false, updatable = true)
    private LocalDateTime updated_at;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = true, insertable = true, updatable = false)
    @NotFound(action = NotFoundAction.IGNORE)
    private User created_by;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "updated_by", nullable = true, insertable = false, updatable = true)
    @NotFound(action = NotFoundAction.IGNORE)
    private User updated_by;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public boolean isActive_flag() {
        return active_flag;
    }

    public void setActive_flag(boolean active_flag) {
        this.active_flag = active_flag;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public LocalDateTime getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(LocalDateTime updated_at) {
        this.updated_at = updated_at;
    }

    public User getCreated_by() {
        return created_by;
    }

    public void setCreated_by(User created_by) {
        this.created_by = created_by;
    }

    public User getUpdated_by() {
        return updated_by;
    }

    public void setUpdated_by(User updated_by) {
        this.updated_by = updated_by;
    }


    @Override
    public boolean equals(Object o) {
        if (o == null || !(o instanceof AbstractParentEntity)) {
            return false;
        }
        if (this == o) {
            return true;
        }
        AbstractParentEntity baseModel = (AbstractParentEntity) o;
        return id == baseModel.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
