package com.example.datn404shoes.repository;

//import com.poly.duanbangiay.entity.ThongTinNguoiDung;
import com.example.datn404shoes.entity.ThongTinNguoiDung;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ThongTinNguoiDungRespository extends JpaRepository<ThongTinNguoiDung,Long> {
}
