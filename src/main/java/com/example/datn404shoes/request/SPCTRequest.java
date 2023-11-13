package com.example.datn404shoes.request;

import com.example.datn404shoes.entity.KichThuocValue;
import com.example.datn404shoes.entity.MauSacValue;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SPCTRequest {
    private String anh;
    private KichThuocValue kichThuoc;
    private MauSacValue mauSac;
    private Integer soLuong;
    private double gia;
}
