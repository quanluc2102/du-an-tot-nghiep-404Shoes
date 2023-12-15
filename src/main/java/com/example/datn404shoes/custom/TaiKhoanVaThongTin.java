package com.example.datn404shoes.custom;

import com.example.datn404shoes.entity.DiaChi;
import com.example.datn404shoes.entity.TaiKhoan;
import com.example.datn404shoes.entity.ThongTinNguoiDung;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Data
@Setter
@Getter
public class TaiKhoanVaThongTin {
    private ThongTinNguoiDung thongTinNguoiDung;
    private TaiKhoan taiKhoan;
    private List<String> files;
    private List<DiaChi> diaChiList;
    private String diaChiCuThe;
    private String tinhThanhPho;
    private String quanHuyen;
    private String xaPhuongThiTran;
    private DiaChi diaChiMoi;
//    private DiaChi diaChi;
    public TaiKhoanVaThongTin() {
        // Hãy tạo các constructor và getter, setter nếu cần thiết
    }
    // Các phương thức khác
    public boolean hasDiaChiMoi() {
        return diaChiMoi != null;
    }
    public DiaChi getDiaChiMoi() {
        return diaChiMoi;
    }

    public void setDiaChiMoi(DiaChi diaChiMoi) {
        this.diaChiMoi = diaChiMoi;
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
