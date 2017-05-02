package com.bettle.track.app.repos.common;

import com.bettle.track.app.repos.BaseRepository;
import com.bettle.track.entities.common.IPBlock;

/**
 * IPBlockRepository is an repository class to access IPBlock entity.
 * Created date : 2017/02/28.
 *
 * @author Name  : Ranjeet
 * @version 1.0
 * @since 1.0
 */
public interface IPBlockRepository extends BaseRepository<IPBlock> {
    IPBlock findIPAddrress(String ipAddress);
}
