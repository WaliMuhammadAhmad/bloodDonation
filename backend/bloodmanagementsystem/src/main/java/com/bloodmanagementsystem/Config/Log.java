package com.bloodmanagementsystem.Config;

import java.io.File;
import java.io.IOException;
import java.util.logging.*;

public class Log {
    private static Logger errorLogger = Logger.getLogger("ErrorLogger");
    private static Logger apiRequestLogger = Logger.getLogger("ApiRequestLogger");

    static {
        try {
        	 String directoryPath = "logs"; 

             File directory = new File(directoryPath);
             if (!directory.exists()) {
                 if (directory.mkdirs()) {
                     System.out.println("Directories created successfully.");
                 } else {
                     System.out.println("Failed to create the directories.");
                 }
             } else {
                 System.out.println("Directory already exists.");
             }
            // Configure Error Logger
            FileHandler errorFileHandler = new FileHandler("logs/exceptions.log", true);
            errorFileHandler.setFormatter(new SimpleFormatter());
            errorLogger.addHandler(errorFileHandler);
            errorLogger.setUseParentHandlers(false);

            // Configure API Request Logger
            FileHandler apiRequestFileHandler = new FileHandler("logs/api_requests.log", true);
            apiRequestFileHandler.setFormatter(new SimpleFormatter());
            apiRequestLogger.addHandler(apiRequestFileHandler);
            apiRequestLogger.setUseParentHandlers(false);

        } catch (IOException e) {
            Log.logError("An error occurred while processing the request.", e);
            System.err.println("Failed to initialize log files: " + e.getMessage());
        }
    }

    // Log Error
    public static void logError(String message, Throwable exception) {
    	
        errorLogger.log(Level.SEVERE, message, exception);
    }

    // Log API Request
    public static void logApiRequest(String method, String endpoint) {
        String logMessage = method + " - " + endpoint + " - " + java.time.LocalDateTime.now();
        apiRequestLogger.info(logMessage);
    }
}
