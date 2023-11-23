package com.example.datn404shoes.repository;

import com.example.datn404shoes.entity.GioHang;
import com.example.datn404shoes.entity.GioHangChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GioHangRepository extends JpaRepository<GioHang,Long> {

    @Query(value = "SELECT ghct FROM GioHang gh INNER JOIN  GioHangChiTiet ghct ON gh.id = ghct.gioHangId.id WHERE gh.id =:id")
    public List<GioHangChiTiet> getAllGioHangCTByTaiKhoanId(Long id);

}
