package group.java.backend.utils;

import java.util.UUID;

public class ObjectUtils {

	public static String getUUId() {
		UUID uuid = UUID.randomUUID();
		String randomUUIDString = uuid.toString();
		String randomUUID = randomUUIDString.replace("-", "");

		return randomUUID;
	}
}
