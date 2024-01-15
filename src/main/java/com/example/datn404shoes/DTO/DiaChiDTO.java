package com.example.datn404shoes.DTO;

import com.example.datn404shoes.entity.ThongTinNguoiDung;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;


@Data
@Builder
public class DiaChiDTO {

    private String ten;

    private String sdt;

    private String diaChiCuThe;

    private String tinhThanhPho;

    private String quanHuyen;

    private String xaPhuongThiTran;

    private Long thongTinNguoiDungId;



}
