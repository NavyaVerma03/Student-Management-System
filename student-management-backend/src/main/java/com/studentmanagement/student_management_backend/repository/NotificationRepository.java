package com.studentmanagement.student_management_backend.repository;

import com.studentmanagement.student_management_backend.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {
}