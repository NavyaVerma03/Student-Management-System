package com.studentmanagement.student_management_backend.repository;

import com.studentmanagement.student_management_backend.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Integer> {
}
