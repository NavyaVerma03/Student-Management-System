package com.studentmanagement.student_management_backend.controller;

import com.studentmanagement.student_management_backend.AdminSettings;
import com.studentmanagement.student_management_backend.Notification;
import com.studentmanagement.student_management_backend.repository.AdminSettingsRepository;
import com.studentmanagement.student_management_backend.repository.NotificationRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/settings")
@CrossOrigin(origins = "*")
public class AdminSettingsController {

    private final AdminSettingsRepository adminSettingsRepository;
    private final NotificationRepository notificationRepository;

    public AdminSettingsController(
            AdminSettingsRepository adminSettingsRepository,
            NotificationRepository notificationRepository) {

        this.adminSettingsRepository = adminSettingsRepository;
        this.notificationRepository = notificationRepository;
    }

    @GetMapping
    public List<AdminSettings> getAllSettings() {
        return adminSettingsRepository.findAll();
    }

    @GetMapping("/{id}")
    public AdminSettings getSettingsById(@PathVariable int id) {
        return adminSettingsRepository.findById(id).orElse(null);
    }

    @PostMapping
    public AdminSettings addSettings(@RequestBody AdminSettings settings) {

        AdminSettings savedSettings =
                adminSettingsRepository.save(settings);

        Notification notification = new Notification();

        notification.setTitle("Settings Added");
        notification.setMessage(
                "System settings were added successfully."
        );
        notification.setType("settings");
        notification.setDate(
                LocalDate.now().toString()
        );
        notification.setRead(false);

        notificationRepository.save(notification);

        return savedSettings;
    }

    @PutMapping("/{id}")
    public AdminSettings updateSettings(
            @PathVariable int id,
            @RequestBody AdminSettings settings) {

        AdminSettings existingSettings =
                adminSettingsRepository.findById(id).orElse(null);

        if (existingSettings == null) {
            return null;
        }

        existingSettings.setAdminName(
                settings.getAdminName()
        );

        existingSettings.setAdminEmail(
                settings.getAdminEmail()
        );

        existingSettings.setAdminPhone(
                settings.getAdminPhone()
        );

        existingSettings.setSystemName(
                settings.getSystemName()
        );

        existingSettings.setEmailNotifications(
                settings.isEmailNotifications()
        );

        existingSettings.setAutoSave(
                settings.isAutoSave()
        );

        AdminSettings savedSettings =
                adminSettingsRepository.save(existingSettings);

        Notification notification = new Notification();

        notification.setTitle("Settings Updated");
        notification.setMessage(
                "System settings were updated successfully."
        );
        notification.setType("settings");
        notification.setDate(
                LocalDate.now().toString()
        );
        notification.setRead(false);

        notificationRepository.save(notification);

        return savedSettings;
    }

    @DeleteMapping("/{id}")
    public void deleteSettings(@PathVariable int id) {
        adminSettingsRepository.deleteById(id);
    }
}
