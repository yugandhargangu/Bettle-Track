package com.bettle.track.jpa.repos.project;

import com.bettle.track.jpa.repos.BaseRepository;
import com.bettle.track.entities.project.ModuleField;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * ModuleFieldRepository is an repository class of ModuleField entity.
 * <p>
 * Create Date: 2017/02/03
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
@Transactional
@Repository
public interface ModuleFieldRepository extends BaseRepository<ModuleField> {
}
