package com.example.datn404shoes.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiaChiRespuest {
    private long thongTinNguoiDung;
    private String diaChiCuThe;
    private String tinhThanhPho;
    private String quanHuyen;
    private String xaPhuongThiTran;
    private String sdt;
    private String ten;

    private Integer trangThai;
}
