package com.example.datn404shoes.repository;

import com.example.datn404shoes.entity.PhanQuyen;
//import com.poly.duanbangiay.entity.PhanQuyen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhanQuyenRepository extends JpaRepository<PhanQuyen,Long> {
}
