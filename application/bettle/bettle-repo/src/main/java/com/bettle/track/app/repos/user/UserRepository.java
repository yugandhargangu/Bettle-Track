package com.bettle.track.app.repos.user;

import com.bettle.track.app.repos.BaseRepository;
import com.bettle.track.entities.user.User;

/**
 * UserRepository class is for User, UserInfo, UserAuth, UserAndRole models access.
 * <p>
 * Create Date: 2017/01/28
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
public interface UserRepository extends BaseRepository<User> {

    User findUserByUserId(String user_id);

    User findUserByEmailId(String email_id);

    User findUserByUserIdOrEmailId(String id);
}
