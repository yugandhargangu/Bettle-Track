package com.bettle.track.jpa.repos.project;

import com.bettle.track.jpa.repos.BaseRepository;
import com.bettle.track.entities.project.ProjectMember;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

/**
 * ProjectMemberRepository is to access ProjectMember model.
 * <p>
 * Create Date: 2017/01/27
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
@Transactional
@Repository
public interface ProjectMemberRepository extends BaseRepository<ProjectMember> {
}
