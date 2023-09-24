package com.example.datn404shoes.repository;

//import com.poly.duanbangiay.entity.SanPhamThuongHieu;
import com.example.datn404shoes.entity.SanPhamThuongHieu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SanPhamThuongHieuRepository extends JpaRepository<SanPhamThuongHieu, Long> {
}
