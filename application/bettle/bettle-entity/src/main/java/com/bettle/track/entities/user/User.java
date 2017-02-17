package com.bettle.track.entities.user;


import com.bettle.track.entities.AbstractParentEntity;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.Where;

import javax.persistence.*;
import java.util.Set;

/**
 * User is an entity of m_users table.
 * <p>
 * Create Date: 2017/01/27
 *
 * @author Ranjeet Parashar
 * @version 1.0
 * @since 1.0
 */
@Entity
@Table(name = "m_users")
@Where(clause = "active_flag = 1")
public class User extends AbstractParentEntity {

    @Column(name = "user_id", length = 8, unique = true, nullable = false, insertable = true, updatable = false)
    private String user_id;
    @Column(name = "login_count", length = 6, unique = false, nullable = false, insertable = true, updatable = true)
    private int login_count = 0;
    @Column(name = "status_flag", length = 1, unique = false, nullable = false, insertable = true, updatable = true)
    private boolean status_flag = false;

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public int getLogin_count() {
        return login_count;
    }

    public void setLogin_count(int login_count) {
        this.login_count = login_count;
    }

    public boolean isStatus_flag() {
        return status_flag;
    }

    public void setStatus_flag(boolean status_flag) {
        this.status_flag = status_flag;
    }
}
