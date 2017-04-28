package com.bettle.track.utils;


import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import java.io.UnsupportedEncodingException;
import java.security.NoSuchAlgorithmException;

/**
 * Test class of CommonUtil.
 */
@RunWith(SpringRunner.class)
public class CommonUtilTest {

    @Test
    public void hashPassword_success() throws UnsupportedEncodingException, NoSuchAlgorithmException {
        String passwordToHash = "testPassword";
        CommonUtil commonUtil = new CommonUtil();
        String hashPasswordOne = commonUtil.hashPassword(passwordToHash);
        String hashPasswordTwo = commonUtil.hashPassword(passwordToHash);
        Assert.assertTrue(hashPasswordOne.equals(hashPasswordTwo));
    }
}
