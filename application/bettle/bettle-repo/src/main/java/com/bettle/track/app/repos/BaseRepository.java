package com.bettle.track.app.repos;

import java.util.List;

public interface BaseRepository<T> {

    List<T> findAll();

    T findOne(long id);

    boolean exists(long id);

    T get(long id);

    T save(T entity);

    void update(T entity);

    void delete(Long id);

}
