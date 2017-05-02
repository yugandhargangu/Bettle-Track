package com.bettle.track.app.repos.common;

import com.bettle.track.app.repos.BaseRepository;
import com.bettle.track.entities.common.AppSettings;

/**
 * AppSettingsRepository is an repository class to access AppSettings entity.
 * Created date : 2017/02/28.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
public interface AppSettingsRepository extends BaseRepository<AppSettings> {

    AppSettings findByKey(String key);
}
