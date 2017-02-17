package com.bettle.track.jpa.repos.project;

import com.bettle.track.jpa.repos.BaseRepository;
import com.bettle.track.entities.project.Project;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * ProjectRepository is to handle Project model.
 */
@Transactional
@Repository
public interface ProjectRepository extends BaseRepository<Project> {
}
