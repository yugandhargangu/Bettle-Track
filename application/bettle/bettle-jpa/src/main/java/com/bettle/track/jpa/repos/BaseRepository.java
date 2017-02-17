package com.bettle.track.jpa.repos;

import com.bettle.track.entities.AbstractParentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.query.Param;

@NoRepositoryBean
public interface BaseRepository<T extends AbstractParentEntity> extends CrudRepository<T, Long>, JpaRepository<T, Long> {

    @Override
    @Query("UPDATE #{#entityName} e SET e.active_flag = 0 WHERE e.id = :id")
    void delete(@Param("id") Long id);

    /**
     * Use BaseRepository.delete(Long id) method to delete entity.
     *
     * @param entity BaseModel instance
     */
    @Override
    @Query("UPDATE #{#entityName} e SET e.active_flag = 0 WHERE e = :baseModel")
    @Deprecated
    void delete(@Param("baseModel") T entity);

    /**
     * Use BaseRepository.delete(Long id) method to delete entity.
     *
     * @param entities Iterable instance
     */
    @Override
    @Query("UPDATE #{#entityName} e SET e.active_flag = 0 WHERE 0 = 1")
    @Deprecated
    void delete(Iterable<? extends T> entities);

    /**
     * Use BaseRepository.delete(Long id) method to delete entity.
     */
    @Override
    @Query("UPDATE #{#entityName} e SET e.active_flag = 0 WHERE 0 = 1")
    @Deprecated
    void deleteAll();

    /**
     * Use BaseRepository.delete(Long id) method to delete entity.
     */
    @Override
    @Query("UPDATE #{#entityName} e SET e.active_flag = 0 WHERE 0 = 1")
    @Deprecated
    void deleteAllInBatch();

    /**
     * Use BaseRepository.delete(Long id) method to delete entity.
     *
     * @param entities Iterable instance
     */
    @Override
    @Query("UPDATE #{#entityName} e SET e.active_flag = 0 WHERE 0 = 1")
    @Deprecated
    void deleteInBatch(Iterable<T> entities);
}
