package com.bettle.track.jpa.repos.project;

import com.bettle.track.jpa.repos.BaseRepository;
import com.bettle.track.entities.project.ProjectPage;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * ProjectPageRepository is to access ProjectPage model.
 * <p>
 * Create Date: 2017/01/27
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
@Transactional
@Repository
public interface ProjectPageRepository extends BaseRepository<ProjectPage> {
}
