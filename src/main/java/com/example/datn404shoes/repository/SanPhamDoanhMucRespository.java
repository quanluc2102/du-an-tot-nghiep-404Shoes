package com.example.datn404shoes.repository;

//import com.poly.duanbangiay.entity.SanPhamDanhMuc;
import com.example.datn404shoes.entity.SanPhamDanhMuc;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SanPhamDoanhMucRespository extends JpaRepository<SanPhamDanhMuc,Long> {
}
