package com.example.datn404shoes.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/images")
public class ImageController {
    private static final String IMAGE_UPLOAD_DIR = "uploads/";

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("File is empty.");
            }

            String fileName = file.getOriginalFilename();
            String imagePath = IMAGE_UPLOAD_DIR + fileName;

            // Lưu ảnh vào thư mục lưu trữ
            byte[] bytes = file.getBytes();
            Path path = Paths.get(imagePath);
            Files.write(path, bytes);
            System.out.println("được rùi");
            return ResponseEntity.ok("Image uploaded successfully!");
        } catch (IOException e) {
            System.out.println("không rùi");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to upload image.");

        }
    }
}
