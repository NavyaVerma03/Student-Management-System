package com.studentmanagement.student_management_backend.controller;

import com.studentmanagement.student_management_backend.Message;
import com.studentmanagement.student_management_backend.Notification;
import com.studentmanagement.student_management_backend.repository.MessageRepository;
import com.studentmanagement.student_management_backend.repository.NotificationRepository;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/messages")
@CrossOrigin(origins = "*")
public class MessageController {

    private final MessageRepository messageRepository;
    private final NotificationRepository notificationRepository;

    public MessageController(
            MessageRepository messageRepository,
            NotificationRepository notificationRepository) {

        this.messageRepository = messageRepository;
        this.notificationRepository = notificationRepository;
    }

    @GetMapping
    public List<Message> getAllMessages() {
        return messageRepository.findAll();
    }

    @PostMapping
    public Message addMessage(@RequestBody Message message) {

        Message savedMessage =
                messageRepository.save(message);

        Notification notification = new Notification();

        notification.setTitle("New Message Received");
        notification.setMessage(
                "New message from "
                        + savedMessage.getStudentName()
                        + "."
        );
        notification.setType("message");
        notification.setDate(
                LocalDate.now().toString()
        );
        notification.setRead(false);

        notificationRepository.save(notification);

        return savedMessage;
    }

    @GetMapping("/{id}")
    public Message getMessageById(@PathVariable int id) {
        return messageRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Message updateMessage(
            @PathVariable int id,
            @RequestBody Message message) {

        Message existingMessage =
                messageRepository.findById(id).orElse(null);

        if (existingMessage == null) {
            return null;
        }

        existingMessage.setStudentId(
                message.getStudentId()
        );

        existingMessage.setStudentName(
                message.getStudentName()
        );

        existingMessage.setSubject(
                message.getSubject()
        );

        existingMessage.setMessage(
                message.getMessage()
        );

        existingMessage.setDate(
                message.getDate()
        );

        return messageRepository.save(existingMessage);
    }

    @DeleteMapping("/{id}")
    public void deleteMessage(@PathVariable int id) {
        messageRepository.deleteById(id);
    }
}