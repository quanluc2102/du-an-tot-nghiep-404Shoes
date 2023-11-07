package com.example.datn404shoes.helper;

import com.example.datn404shoes.service.KhuyenMaiTaskService;
import com.example.datn404shoes.service.serviceimpl.KhuyenMaiServiceImpl;
import com.example.datn404shoes.service.serviceimpl.KhuyenMaiTaskServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class ScheduledKhuyenMaiTask {

    private static final Logger logger = LoggerFactory.getLogger(ScheduledKhuyenMaiTask.class);


    @Autowired
    KhuyenMaiTaskServiceImpl khuyenMaiTaskService;

    @Scheduled(cron = "* * * * * *") // Chạy mỗi giây
    public void updatePromotionStatus() {
        // Gọi service để kiểm tra và cập nhật trạng thái chương trình khuyến mãi
        logger.info("Cron job is running at: " + LocalDateTime.now());
        khuyenMaiTaskService.updatePromotionStatus();
    }
}
