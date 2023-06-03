package group.java.backend.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DateUtils {

	public static final String DEFAULT_FORMAT = "yyyy-MM-dd";

	public static final String DEFAULT_FORMAT_FULL_TIME = "dd/MM/yyyy HH:mm:ss";

	public static final String DEFAULT_FORMAT_FULL_TIME_DB = "yyyy-MM-dd HH:mm:ss";

	public static final String DEFAULT_FORMAT_FULL_TIME_REPORT = "dd-MM-yyyy HH:mm:ss";

	public static final String DEFAULT_FORMAT_SORT_TIME_REPORT = "dd-MM-yyyy";

	public static final String FORMAT_DATE_HOUR_2_LINE = "dd/MM/yyyy'<br>'HH:mm'&#39;':ss'&#34;'";

	public static final String FORMAT_DATE_FULL = "'Ngày' dd 'tháng' MM 'năm' yyyy";

	public static String format(Date date, String pattern) {
		SimpleDateFormat formatter = new SimpleDateFormat(pattern);
		return formatter.format(date);
	}

	public static String format(Date date) {
		if (date == null) {
			return "";
		}
		return format(date, DEFAULT_FORMAT);
	}

	public static String formatDatabase(Date date) {
		if (date == null) {
			return "";
		}
		return format(date, DEFAULT_FORMAT_FULL_TIME_DB);
	}

	public static String formatDateTime(Date date) {
		return format(date, DEFAULT_FORMAT_FULL_TIME);
	}

	public static Date toDate(String strDate) {
		DateFormat df = new SimpleDateFormat(DEFAULT_FORMAT);
		Date date = new Date();
		try {
			date = df.parse(strDate);
		} catch (ParseException e) {
			return null;
		}

		return date;
	}

	public static Date moveToStartOfDay(Date date) {
		Calendar day = Calendar.getInstance();
		day.setTime(date);
		day.set(Calendar.HOUR_OF_DAY, 0);
		day.set(Calendar.MINUTE, 0);
		day.set(Calendar.SECOND, 0);
//		day.set(Calendar.MILLISECOND, 0);
		return day.getTime();
	}

	public static Date moveToDateOfDay(Date date , int house , int time) {
		Calendar day = Calendar.getInstance();
		day.setTime(date);
		day.set(Calendar.HOUR_OF_DAY, house);
		day.set(Calendar.MINUTE, time);
		day.set(Calendar.SECOND, 0);
//		day.set(Calendar.MILLISECOND, 0);
		return day.getTime();
	}

	public static Date moveToEndOfDay(Date date) {
		Calendar day = Calendar.getInstance();
		day.setTime(date);
		day.set(Calendar.HOUR_OF_DAY, 23);
		day.set(Calendar.MINUTE, 59);
		day.set(Calendar.SECOND, 59);
		day.set(Calendar.MILLISECOND, 0);
//		day.set(Calendar.MILLISECOND, 999);
		return day.getTime();
	}

}
