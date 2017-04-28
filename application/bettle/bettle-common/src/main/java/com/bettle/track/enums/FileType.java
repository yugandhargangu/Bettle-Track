package com.bettle.track.enums;

import java.util.Arrays;
import java.util.List;

/**
 * FileType is an enum of file type.
 * The id of file type will be stored in project file table.
 */
public enum FileType {
    UNKNOWN(0, "file-empty", null),
    FOLDER(1, "folder", new String[]{""}),
    TEXT(2, "file-text", new String[]{"1st", "abw", "act", "adoc", "aim", "ans", "apkg", "apt", "asc",
            "asc", "ascii", "ase", "aty", "awp", "awt", "aww", "bad", "bbs", "bdp", "bdr", "bean", "bib",
            "bib", "bibtex", "bml", "bna", "boc", "brx", "btd", "bzabw", "calca", "charset", "chart",
            "chord", "cnm", "cod", "crwl", "cws", "cyi", "dca", "dfti", "dgs", "diz", "dne", "docxml",
            "docz", "dox", "dropbox", "dsc", "dvi", "dwd", "dx", "dxb", "dxp",
            "eio", "eit", "emf", "eml", "emlx", "emulecollection", "epp", "err", "err", "etf", "etx",
            "euc", "fadein.template", "faq", "fbl", "fcf", "fdf", "fdr", "fds", "fdt", "fdx", "fdxt",
            "fft", "fgs", "flr", "fodt", "fountain", "fpt", "frt", "fwd", "fwdn", "gdoc", "gmd", "gpd",
            "gpn", "gsd", "gthr", "gv", "hbk", "hht", "hs", "hwp", "hwp", "hz", "idx", "iil", "ipf",
            "ipspot", "jarvis", "jis", "jnp", "joe", "jp1", "jrtf", "kes", "klg", "klg", "knt", "kon",
            "kwd", "latex", "lbt", "lis", "lnt", "log", "lp2", "lst", "lst", "ltr", "ltx", "lue", "luf",
            "lwp", "lxfml", "lyt", "lyx", "man", "mbox", "mcw", "md5.txt", "me", "mell", "mellel", "min",
            "mnt", "msg", "mw", "mwd", "mwp", "nb", "ndoc", "nfo", "ngloss", "njx", "notes", "now",
            "nwctxt", "nwm", "nwp", "ocr", "odif", "odm", "odo", "odt", "ofl", "opeico", "openbsd", "ort",
            "ott", "p7s", "pages", "pages-tef", "pdpcmd", "pfs", "pfx", "pjt", "plantuml", "pmo", "prt",
            "prt", "psw", "pu", "pvj", "pvm", "pwd", "pwdp", "pwdpl", "pwi", "pwr", "qdl", "qpf", "rad",
            "readme", "rft", "ris", "rpt", "rst", "rtd", "rtf", "rtfd", "rtx", "run", "rvf", "rzk", "rzn",
            "saf", "safetext", "sam", "sam", "save", "scc", "scm", "scriv", "scrivx", "sct", "scw", "sdm",
            "sdoc", "sdw", "se", "session", "sgm", "sig", "skcard", "sla", "sla.gz", "smf", "sms", "ssa",
            "story", "strings", "stw", "sty", "sub", "sublime-project", "sublime-workspace", "sxg", "sxw",
            "tab", "tab", "tdf", "tdf", "template", "tex", "text", "textclipping", "thp", "tlb", "tm",
            "tmd", "tmv", "tpc", "trelby", "tvj", "txt", "u3i", "unauth", "unx", "uof", "uot", "upd",
            "utf8", "utxt", "vct", "vnt", "vw", "wbk", "webdoc", "wn", "wp", "wp4", "wp5", "wp6", "wp7",
            "wpa", "wpd", "wpd", "wpd", "wpl", "wps", "wps", "wpt", "wpt", "wpw", "wri", "wsd", "wtt",
            "wtx", "xbdoc", "xbplate", "xdl", "xdl", "xwp", "xwp", "xwp", "xy", "xy3", "xyp", "xyw",
            "zabw", "zrtf", "zw"}),
    PICTURE(3, "file-image", new String[]{"ani", "bmp", "cal", "fax", "gif", "img", "jbg", "jpe", "jpeg",
            "jpg", "mac", "pbm", "pcd", "pcx", "pct", "pgm", "png", "ppm", "psd", "ras", "tga", "tiff",
            "wmf"}),
    MUSIC(4, "file-audio", new String[]{"3gp", "aa", "aac", "aax", "act", "aiff", "amr", "ape", "au", "awb",
            "dct", "dss", "dvf", "flac", "gsm", "iklax", "ivs", "m4a", "m4b", "m4p", "mmf", "mp3", "mpc",
            "msv", "mogg", "oga", "ogg", "opus", "ra", "raw", "rm", "sln", "tta", "vox", "wav", "wma", "wv",
            "webm"}),
    VIDEO(5, "file-movie", new String[]{"3g2", "3gp", "amv", "asf", "avi", "drc", "f4a", "f4b", "f4p",
            "f4v", "flv", "m4v", "mkv", "mov", "qt", "mp4", "m4p", "m4v", "mpg", "mp2", "mpeg", "mpe",
            "mpv", "m2v", "mxf", "nsv", "ogg", "ogv", "rm", "rmvb", "roq", "svi", "vob", "webm", "wmv",
            "yuv"}),
    ARCHIVE(6, "file-archive", new String[]{"0", "000", "7z", "7z.001", "7z.002", "a00", "a01", "a02", "ace", "agg",
            "ain", "alz", "apz", "ar", "arc", "archiver", "arh", "ari", "arj", "ark", "asr", "b1", "b64",
            "ba", "bh", "bndl", "boo", "bundle", "bz", "bz2", "bza", "bzip", "bzip2", "c00", "c01", "c02",
            "c10", "car", "cb7", "cba", "cbr", "cbt", "cbz", "cdz", "comppkg.hauptwerk.rar",
            "comppkg_hauptwerk_rar", "cp9", "cpgz", "cpt", "cxarchive", "czip", "dar", "dd", "deb", "dgc",
            "dist", "dl_", "dz", "ecs", "efw", "egg", "epi", "f", "fdp", "fp8", "fzbz", "fzpz", "gca",
            "gmz", "gz", "gz2", "gza", "gzi", "gzip", "ha", "hbc", "hbc2", "hbe", "hki", "hki1", "hki2",
            "hki3", "hpk", "hyp", "iadproj", "ice", "ipg", "ipk", "ish", "isx", "ita", "ize", "j",
            "jar.pack", "jgz", "jic", "jsonlz4", "kgb", "kz", "layout", "lbr", "lemon", "lha", "libzip",
            "lnx", "lqr", "lz", "lzh", "lzm", "lzma", "lzo", "lzx", "md", "mint", "mou", "mpkg", "mzp",
            "mzp", "nex", "nz", "oar", "oz", "p01", "p19", "pack.gz", "package", "pae", "pak", "paq6",
            "paq7", "paq8", "paq8f", "paq8l", "paq8p", "par", "par2", "pax", "pbi", "pcv", "pea", "pet",
            "pf", "pim", "pit", "piz", "pkg", "psz", "pup", "pup", "puz", "pwa", "qda", "r0", "r00", "r01",
            "r02", "r03", "r1", "r2", "r21", "r30", "rar", "rev", "rk", "rnc", "rp9", "rpm", "rte", "rz",
            "s00", "s01", "s02", "s7z", "sar", "sbx", "sdc", "sdn", "sea", "sen", "sfg", "sfs", "sfx", "sh",
            "shar", "shk", "shr", "sifz", "sit", "sitx", "smpf", "snappy", "snb", "spt", "sqx", "srep",
            "stproj", "sy_", "tar.bz2", "tar.gz", "tar.gz2", "tar.lz", "tar.lzma", "tar.xz", "tar.z",
            "taz", "tbz", "tbz2", "tg", "tgz", "tlz", "tlzma", "trs", "tx_", "txz", "tz", "uc2",
            "ufs.uzip", "uha", "uzip", "vem", "voca", "vsi", "wa", "waff", "war", "wlb", "wot", "xar",
            "xef", "xez", "xmcdz", "xx", "xz", "xzm", "y", "yz", "yz1", "z", "z01", "z02", "z03", "z04",
            "zap", "zfsendtotarget", "zi", "zip", "zipx", "zix", "zl", "zoo", "zpi", "zsplit", "zw", "zz"}),
    PDF(7, "file-pdf", new String[]{"pdf"}),
    WORD(8, "file-word", new String[]{"doc", "dot", "wbk", "docx", "docm", "dotx", "dotm", "docb"}),
    EXCEL(9, "file-excel", new String[]{"xls", "xlt", "xlm", "xlsx", "xlsm", "xltx", "xltm", "xlsb", "xla",
            "xlam", "xll", "xlw"}),
    POWERPOINT(10, "file-powerpoint", new String[]{"ppt", "pot", "pps", "pptx", "pptm", "potx", "potm",
            "ppam", "ppsx", "ppsm", "sldx", "sldm"}),
    CODE(11, "file-code", new String[]{"java"});

    private final int id;
    private final String icon;
    private final List<String> extentions;

    /**
     * Constructor.
     *
     * @param id   file type id
     * @param icon file type icon class
     */
    FileType(int id, String icon, String[] extentions) {
        this.id = id;
        this.icon = icon;
        if (extentions != null && extentions.length > 0) {
            this.extentions = Arrays.asList(extentions);
        } else {
            this.extentions = null;
        }
    }

    public int getId() {
        return id;
    }

    public String getIcon() {
        return icon;
    }

    public List<String> getExtentions() {
        return extentions;
    }
}
