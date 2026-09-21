package com.studentmanagement.student_management_backend.controller;

import com.studentmanagement.student_management_backend.Notification;
import com.studentmanagement.student_management_backend.repository.NotificationRepository;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    private final NotificationRepository notificationRepository;

    public NotificationController(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @GetMapping
    public List<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }

    @PostMapping
    public Notification addNotification(@RequestBody Notification notification) {
        return notificationRepository.save(notification);
    }

    @PutMapping("/{id}/read")
    public Notification markAsRead(@PathVariable int id) {

        Notification notification =
                notificationRepository.findById(id).orElse(null);

        if (notification == null) {
            return null;
        }

        notification.setRead(true);

        return notificationRepository.save(notification);
    }

    @DeleteMapping("/{id}")
    public void deleteNotification(@PathVariable int id) {
        notificationRepository.deleteById(id);
    }
}
