package com.bettle.track.jpa.repos.user;

import com.bettle.track.jpa.repos.BaseRepository;
import com.bettle.track.entities.user.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * UserRepository class is for User, UserInfo, UserAuth, UserAndRole models access.
 * <p>
 * Create Date: 2017/01/28
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
@Transactional
@Repository
public interface UserRepository extends BaseRepository<User> {

    /**
     * Finds the user by user_id.
     *
     * @param user_id User Id string
     * @return User or null
     */
    @Query("SELECT u FROM User u WHERE u.active_flag = 1 AND u.user_id = :user_id")
    User findUserByUserId(@Param("user_id") String user_id);

    /**
     * Finds the user by email id.
     *
     * @param email_id User email id string
     * @return User or null
     */
    @Query("SELECT u FROM UserInfo ui JOIN ui.user_id u WHERE u.active_flag = 1 AND ui.active_flag = 1 AND ui.email_id = :email_id")
    User findUserByEmailId(@Param("email_id") String email_id);

    /**
     * Finds the user by user id or email id
     *
     * @param id User Id or Email Id
     * @return User or null
     */
    @Query("SELECT u FROM UserInfo ui JOIN ui.user_id u WHERE u.active_flag = 1 AND ui.active_flag = 1 AND (u.user_id = :id OR ui.email_id = :id)")
    User findUserByUserIdOrEmailId(@Param("id") String id);
}
