package com.studentmanagement.student_management_backend.controller;

import com.studentmanagement.student_management_backend.Course;
import com.studentmanagement.student_management_backend.Notification;
import com.studentmanagement.student_management_backend.repository.CourseRepository;
import com.studentmanagement.student_management_backend.repository.NotificationRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    private final CourseRepository courseRepository;
    private final NotificationRepository notificationRepository;

    public CourseController(
            CourseRepository courseRepository,
            NotificationRepository notificationRepository) {

        this.courseRepository = courseRepository;
        this.notificationRepository = notificationRepository;
    }

    @GetMapping
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @PostMapping
    public Course addCourse(@RequestBody Course course) {

        Course savedCourse = courseRepository.save(course);

        Notification notification = new Notification();

        notification.setTitle("New Course Added");
        notification.setMessage(
                savedCourse.getCourseName() + " was added successfully."
        );
        notification.setType("course");
        notification.setDate(
                LocalDate.now().toString()
        );
        notification.setRead(false);

        notificationRepository.save(notification);

        return savedCourse;
    }

    @GetMapping("/{id}")
    public Course getCourseById(@PathVariable int id) {
        return courseRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Course updateCourse(
            @PathVariable int id,
            @RequestBody Course course) {

        Course existingCourse =
                courseRepository.findById(id).orElse(null);

        if (existingCourse == null) {
            return null;
        }

        existingCourse.setCourseName(course.getCourseName());
        existingCourse.setCourseCode(course.getCourseCode());
        existingCourse.setDuration(course.getDuration());
        existingCourse.setDescription(course.getDescription());

        return courseRepository.save(existingCourse);
    }

    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable int id) {
        courseRepository.deleteById(id);
    }
}