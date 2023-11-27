package com.example.datn404shoes.repository;

//import com.poly.duanbangiay.entity.TaiKhoan;
import com.example.datn404shoes.entity.TaiKhoan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TaiKhoanRepository extends JpaRepository<TaiKhoan, Long> {
    TaiKhoan findByThongTinNguoiDung_Sdt(String sdt);

    @Query(value = "select tk from TaiKhoan tk where tk.trangThai = true")
    List<TaiKhoan> getAllTaiKhoan();
}
