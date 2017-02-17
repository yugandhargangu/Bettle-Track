package com.bettle.track.jpa.repos.user;

import com.bettle.track.jpa.repos.BaseRepository;
import com.bettle.track.entities.user.UserAndRole;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * UserAndRoleRepository class is to access UserAndRole model.
 * <p>
 * Create Date: 2017/01/28
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
@Transactional
@Repository
public interface UserAndRoleRepository extends BaseRepository<UserAndRole> {

}
