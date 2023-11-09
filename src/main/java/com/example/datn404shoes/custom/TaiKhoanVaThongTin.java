package com.example.datn404shoes.custom;

import com.example.datn404shoes.entity.DiaChi;
import com.example.datn404shoes.entity.TaiKhoan;
import com.example.datn404shoes.entity.ThongTinNguoiDung;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
public class TaiKhoanVaThongTin {
    private ThongTinNguoiDung thongTinNguoiDung;
    private TaiKhoan taiKhoan;
    private List<String> files;
    private String diaChiCuThe;
    private String tinhThanhPho;
    private String quanHuyen;
    private String xaPhuongThiTran;
//    private DiaChi diaChi;
    public TaiKhoanVaThongTin() {
        // Hãy tạo các constructor và getter, setter nếu cần thiết
    }

    public ThongTinNguoiDung getThongTinNguoiDung() {
        return thongTinNguoiDung;
    }

    public void setThongTinNguoiDung(ThongTinNguoiDung thongTinNguoiDung) {
        this.thongTinNguoiDung = thongTinNguoiDung;
    }

    public List<String> getFiles() {
        return files;
    }

    public void setFiles(List<String> files) {
        this.files = files;
    }

//    public DiaChi getDiaChi() {
//        return diaChi;
//    }
//
//    public void setDiaChi(DiaChi diaChi) {
//        this.diaChi = diaChi;
//    }

    public TaiKhoan getTaiKhoan() {
        return taiKhoan;
    }

    public void setTaiKhoan(TaiKhoan taiKhoan) {
        this.taiKhoan = taiKhoan;
    }
}
