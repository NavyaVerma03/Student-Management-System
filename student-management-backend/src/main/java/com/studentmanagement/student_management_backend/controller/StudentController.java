package com.studentmanagement.student_management_backend.controller;

import com.studentmanagement.student_management_backend.Student;
import com.studentmanagement.student_management_backend.repository.StudentRepository;
import org.springframework.web.bind.annotation.*;
import com.studentmanagement.student_management_backend.repository.NotificationRepository;
import com.studentmanagement.student_management_backend.Notification;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "*")
public class StudentController {

    private final StudentRepository studentRepository;
    private final NotificationRepository notificationRepository;

    public StudentController(
            StudentRepository studentRepository,
            NotificationRepository notificationRepository) {

        this.studentRepository = studentRepository;
        this.notificationRepository = notificationRepository;
    }

    @GetMapping
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @PostMapping
    public Student addStudent(@RequestBody Student student) {

        Student savedStudent = studentRepository.save(student);

        Notification notification = new Notification();

        notification.setTitle("New Student Added");
        notification.setMessage(
                savedStudent.getName() + " was added successfully."
        );
        notification.setType("student");
        notification.setDate(
                java.time.LocalDate.now().toString()
        );
        notification.setRead(false);

        notificationRepository.save(notification);

        return savedStudent;
    }

    @GetMapping("/{id}")
    public Student getStudentById(@PathVariable int id) {
        return studentRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Student updateStudent(@PathVariable int id, @RequestBody Student student) {
        Student existingStudent = studentRepository.findById(id).orElse(null);

        if (existingStudent == null) {
            return null;
        }

        existingStudent.setName(student.getName());
        existingStudent.setEmail(student.getEmail());
        existingStudent.setPhone(student.getPhone());
        existingStudent.setCourse(student.getCourse());
        existingStudent.setSemester(student.getSemester());
        existingStudent.setGender(student.getGender());
        existingStudent.setAddress(student.getAddress());
        existingStudent.setStudentId(student.getStudentId());
        existingStudent.setDob(student.getDob());
        existingStudent.setAdmissionYear(student.getAdmissionYear());
        existingStudent.setAdmissionDate(student.getAdmissionDate());
        existingStudent.setStatus(student.getStatus());

        return studentRepository.save(existingStudent);
    }

    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable int id) {
        studentRepository.deleteById(id);
    }
}
