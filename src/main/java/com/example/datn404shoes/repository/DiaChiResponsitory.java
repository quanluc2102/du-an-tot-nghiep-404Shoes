package com.example.datn404shoes.repository;

import com.example.datn404shoes.entity.DiaChi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DiaChiResponsitory extends JpaRepository<DiaChi, UUID> {
    Optional<DiaChi> findById(long id);
    List<DiaChi> findDiaChiByThongTinNguoiDungId(long id);
}
