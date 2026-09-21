package com.studentmanagement.student_management_backend.controller;

import com.studentmanagement.student_management_backend.Attendance;
import com.studentmanagement.student_management_backend.Notification;
import com.studentmanagement.student_management_backend.repository.AttendanceRepository;
import com.studentmanagement.student_management_backend.repository.NotificationRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "*")
public class AttendanceController {

    private final AttendanceRepository attendanceRepository;
    private final NotificationRepository notificationRepository;

    public AttendanceController(
            AttendanceRepository attendanceRepository,
            NotificationRepository notificationRepository) {

        this.attendanceRepository = attendanceRepository;
        this.notificationRepository = notificationRepository;
    }

    // Get all attendance records
    @GetMapping
    public List<Attendance> getAllAttendance() {
        return attendanceRepository.findAll();
    }

    // Add attendance
    @PostMapping
    public Attendance addAttendance(@RequestBody Attendance attendance) {

        Attendance savedAttendance =
                attendanceRepository.save(attendance);

        Notification notification = new Notification();

        notification.setTitle("Attendance Added");
        notification.setMessage(
                "Attendance marked for "
                        + savedAttendance.getStudentName()
                        + "."
        );
        notification.setType("attendance");
        notification.setDate(
                LocalDate.now().toString()
        );
        notification.setRead(false);

        notificationRepository.save(notification);

        return savedAttendance;
    }

    // Get attendance by ID
    @GetMapping("/{id}")
    public Attendance getAttendanceById(@PathVariable int id) {
        return attendanceRepository.findById(id).orElse(null);
    }

    // Update attendance
    @PutMapping("/{id}")
    public Attendance updateAttendance(
            @PathVariable int id,
            @RequestBody Attendance attendance) {

        Attendance existingAttendance =
                attendanceRepository.findById(id).orElse(null);

        if (existingAttendance == null) {
            return null;
        }

        existingAttendance.setStudentId(
                attendance.getStudentId()
        );

        existingAttendance.setStudentName(
                attendance.getStudentName()
        );

        existingAttendance.setDate(
                attendance.getDate()
        );

        existingAttendance.setStatus(
                attendance.getStatus()
        );

        return attendanceRepository.save(existingAttendance);
    }

    // Delete attendance
    @DeleteMapping("/{id}")
    public void deleteAttendance(@PathVariable int id) {
        attendanceRepository.deleteById(id);
    }
}
