package com.bloodmanagementsystem.Config;

import java.io.File;
import java.io.IOException;
import java.util.logging.*;

public class Log {
    private static Logger errorLogger = Logger.getLogger("ErrorLogger");
    private static Logger apiRequestLogger = Logger.getLogger("ApiRequestLogger");
    private static FileHandler errorFileHandler;
    private static FileHandler apiRequestFileHandler;

    static {
        try {
            String directoryPath = "logs"; 
            File directory = new File(directoryPath);
            if (!directory.exists() && directory.mkdirs()) {
                System.out.println("Log directories created successfully.");
            }

            // Configure Error Logger
            errorFileHandler = new FileHandler("logs/exceptions.log", true);
            errorFileHandler.setFormatter(new SimpleFormatter());
            errorLogger.addHandler(errorFileHandler);
            errorLogger.setLevel(Level.ALL);
            errorLogger.setUseParentHandlers(false);

            // Configure API Request Logger
            apiRequestFileHandler = new FileHandler("logs/api_requests.log", true);
            apiRequestFileHandler.setFormatter(new SimpleFormatter());
            apiRequestLogger.addHandler(apiRequestFileHandler);
            apiRequestLogger.setLevel(Level.ALL);
            apiRequestLogger.setUseParentHandlers(false);

            System.out.println("Loggers initialized successfully.");
        } catch (IOException e) {
            e.printStackTrace();
            System.err.println("Failed to initialize log files: " + e.getMessage());
        }
    }

    // Log Error
    public static void logError(String message, Throwable exception) {
        errorLogger.log(Level.SEVERE, message, exception);
        errorFileHandler.flush(); // Ensure logs are written
    }

    // Log API Request
    public static void logApiRequest(String method, String endpoint) {
        String logMessage = method + " - " + endpoint + " - " + java.time.LocalDateTime.now();
        apiRequestLogger.info(logMessage);
        apiRequestFileHandler.flush(); // Ensure logs are written
    }
}
