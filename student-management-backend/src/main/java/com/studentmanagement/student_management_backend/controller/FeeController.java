package com.studentmanagement.student_management_backend.controller;

import com.studentmanagement.student_management_backend.Fee;
import com.studentmanagement.student_management_backend.Notification;
import com.studentmanagement.student_management_backend.repository.FeeRepository;
import com.studentmanagement.student_management_backend.repository.NotificationRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/fees")
@CrossOrigin(origins = "*")
public class FeeController {

    private final FeeRepository feeRepository;
    private final NotificationRepository notificationRepository;

    public FeeController(
            FeeRepository feeRepository,
            NotificationRepository notificationRepository) {

        this.feeRepository = feeRepository;
        this.notificationRepository = notificationRepository;
    }


    // =========================
    // GET ALL FEES
    // =========================

    @GetMapping
    public List<Fee> getAllFees() {

        return feeRepository.findAll();

    }


    // =========================
    // ADD FEE
    // =========================

    @PostMapping
    public Fee addFee(@RequestBody Fee fee) {

        Fee savedFee = feeRepository.save(fee);

        Notification notification = new Notification();

        notification.setTitle("New Fee Payment");
        notification.setMessage(
                "Fee payment added for "
                        + savedFee.getStudentName()
                        + "."
        );
        notification.setType("fee");
        notification.setDate(
                LocalDate.now().toString()
        );
        notification.setRead(false);

        notificationRepository.save(notification);

        return savedFee;

    }


    // =========================
    // GET FEE BY ID
    // =========================

    @GetMapping("/{id}")
    public Fee getFeeById(@PathVariable int id) {

        return feeRepository
                .findById(id)
                .orElse(null);

    }


    // =========================
    // UPDATE FEE
    // =========================

    @PutMapping("/{id}")
    public Fee updateFee(
            @PathVariable int id,
            @RequestBody Fee fee) {

        Fee existingFee =
                feeRepository
                        .findById(id)
                        .orElse(null);

        if (existingFee == null) {

            return null;

        }

        existingFee.setStudentId(
                fee.getStudentId()
        );

        existingFee.setStudentName(
                fee.getStudentName()
        );

        existingFee.setTotalFee(
                fee.getTotalFee()
        );

        existingFee.setPaidAmount(
                fee.getPaidAmount()
        );

        existingFee.setPendingAmount(
                fee.getPendingAmount()
        );

        existingFee.setPaymentDate(
                fee.getPaymentDate()
        );

        existingFee.setPaymentStatus(
                fee.getPaymentStatus()
        );

        return feeRepository.save(
                existingFee
        );

    }


    // =========================
    // DELETE FEE
    // =========================

    @DeleteMapping("/{id}")
    public void deleteFee(
            @PathVariable int id) {

        feeRepository.deleteById(id);

    }

}