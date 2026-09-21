package com.studentmanagement.student_management_backend.repository;

import com.studentmanagement.student_management_backend.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendanceRepository extends JpaRepository<Attendance, Integer> {
}

