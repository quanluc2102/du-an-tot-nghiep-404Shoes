package com.example.datn404shoes.repository;

import com.example.datn404shoes.entity.SanPhamXuatXu;
import com.example.datn404shoes.entity.XuatXu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SanPhamXuatXuRepository extends JpaRepository<SanPhamXuatXu,Long> {
}
