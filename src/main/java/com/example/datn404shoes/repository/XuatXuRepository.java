package com.example.datn404shoes.repository;

import com.example.datn404shoes.entity.TichDiem;
import com.example.datn404shoes.entity.XuatXu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface XuatXuRepository extends JpaRepository<XuatXu,Long> {
}
