package com.studentmanagement.student_management_backend.repository;

import com.studentmanagement.student_management_backend.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoginRepository extends JpaRepository<Login, Integer> {

    Login findByUsername(String username);
}
