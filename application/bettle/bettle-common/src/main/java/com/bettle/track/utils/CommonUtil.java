package com.bettle.track.utils;

import org.springframework.stereotype.Component;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

/**
 * CommonUtil class contains all of the common util methods.
 *
 * @author Yugandhar Gangu
 * @version 1.0
 * @since 1.0
 */
@Component
public class CommonUtil {

    /**
     * To create hash string for a password.
     *
     * @param passwordToHash Password to hash
     * @return Hash string
     * @throws NoSuchAlgorithmException     exception
     * @throws UnsupportedEncodingException exception
     */
    public String hashPassword(String passwordToHash) throws NoSuchAlgorithmException, UnsupportedEncodingException {
        MessageDigest md = MessageDigest.getInstance(Constants.SHA_512);
        byte[] bytes = md.digest(passwordToHash.getBytes(Constants.CHARSET_UTF8));
        StringBuilder sb = new StringBuilder();
        for (byte aByte : bytes) {
            sb.append(Integer.toString((aByte & 0xff) + 0x100, 16).substring(1));
        }
        return sb.toString();
    }
}
