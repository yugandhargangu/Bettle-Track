package com.bettle.track.jpa.repos.user;

import com.bettle.track.jpa.repos.BaseRepository;
import com.bettle.track.entities.user.UserAuth;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * UserAuthRepository is to access UserAuth model.
 * <p>
 * Create Date: 2017/01/27
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
@Repository
@Transactional
public interface UserAuthRepository extends BaseRepository<UserAuth> {
}
