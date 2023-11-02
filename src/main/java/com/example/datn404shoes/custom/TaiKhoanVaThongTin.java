package com.example.datn404shoes.custom;

import com.example.datn404shoes.entity.TaiKhoan;
import com.example.datn404shoes.entity.ThongTinNguoiDung;
import lombok.Builder;
import lombok.Data;

@Data
public class TaiKhoanVaThongTin {
    private ThongTinNguoiDung thongTinNguoiDung;
    private TaiKhoan taiKhoan;

    public TaiKhoanVaThongTin() {
        // Hãy tạo các constructor và getter, setter nếu cần thiết
    }

    public ThongTinNguoiDung getThongTinNguoiDung() {
        return thongTinNguoiDung;
    }

    public void setThongTinNguoiDung(ThongTinNguoiDung thongTinNguoiDung) {
        this.thongTinNguoiDung = thongTinNguoiDung;
    }

    public TaiKhoan getTaiKhoan() {
        return taiKhoan;
    }

    public void setTaiKhoan(TaiKhoan taiKhoan) {
        this.taiKhoan = taiKhoan;
    }
}
