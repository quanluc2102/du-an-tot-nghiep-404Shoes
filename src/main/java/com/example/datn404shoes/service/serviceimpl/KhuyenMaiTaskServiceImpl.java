package com.example.datn404shoes.service.serviceimpl;

import com.example.datn404shoes.entity.KhuyenMai;
import com.example.datn404shoes.service.KhuyenMaiTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class KhuyenMaiTaskServiceImpl implements KhuyenMaiTaskService {

    @Autowired
    KhuyenMaiServiceImpl khuyenMaiService;

    @Override
    public void updatePromotionStatus() {
        List<KhuyenMai> khuyenMaiList = khuyenMaiService.getAllNoPage();
        Timestamp currentTime = new Timestamp(System.currentTimeMillis());
//        System.out.println("hehe:" + currentTime);
        for (KhuyenMai khuyenMai : khuyenMaiList) {
//            System.out.println(khuyenMai.getId());
//            System.out.println(khuyenMai.getTen());

            if (khuyenMai.getTrangThai() == 0 && khuyenMai.getBatDau().before(currentTime)) {
                khuyenMai.setTrangThai(1);
                khuyenMaiService.update(khuyenMai.getId(), khuyenMai);
            } else if (khuyenMai.getTrangThai() == 1 && khuyenMai.getKetThuc().before(currentTime)) {
                khuyenMai.setTrangThai(2);
                khuyenMaiService.update(khuyenMai.getId(), khuyenMai);
            }

        }
    }

}
