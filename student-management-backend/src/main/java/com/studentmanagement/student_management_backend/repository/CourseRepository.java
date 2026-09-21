package com.studentmanagement.student_management_backend.repository;

import com.studentmanagement.student_management_backend.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Integer> {
}
