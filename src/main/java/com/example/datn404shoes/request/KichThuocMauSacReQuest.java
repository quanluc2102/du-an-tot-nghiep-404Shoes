package com.example.datn404shoes.request;

import com.example.datn404shoes.entity.KichThuoc;
import com.example.datn404shoes.entity.MauSac;
import com.example.datn404shoes.entity.SanPham;
import lombok.Data;
import org.springframework.web.bind.annotation.RequestParam;

@Data
public class KichThuocMauSacReQuest {

    private Long mauSacId;

    private Long kichThuocId;

    private int trangThai;

}
