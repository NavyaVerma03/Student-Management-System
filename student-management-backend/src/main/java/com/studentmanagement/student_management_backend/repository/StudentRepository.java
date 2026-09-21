package com.studentmanagement.student_management_backend.repository;

import com.studentmanagement.student_management_backend.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Integer> {
}
