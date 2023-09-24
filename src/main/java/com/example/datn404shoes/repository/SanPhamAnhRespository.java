package com.example.datn404shoes.repository;

import com.example.datn404shoes.entity.SanPhamAnh;
//import com.poly.duanbangiay.entity.SanPhamAnh;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SanPhamAnhRespository extends JpaRepository<SanPhamAnh,Long> {
}
