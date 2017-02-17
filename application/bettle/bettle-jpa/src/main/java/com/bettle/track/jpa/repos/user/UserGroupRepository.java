package com.bettle.track.jpa.repos.user;

import com.bettle.track.jpa.repos.BaseRepository;
import com.bettle.track.entities.user.UserGroup;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * UserGroupRepository is to access UserGroup and UserGroupUser models.
 * <p>
 * Create Date: 2017/01/27
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
@Repository
@Transactional
public interface UserGroupRepository extends BaseRepository<UserGroup> {
}
