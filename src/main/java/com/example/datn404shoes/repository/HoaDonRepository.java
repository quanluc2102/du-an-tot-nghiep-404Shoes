package com.example.datn404shoes.repository;

import com.example.datn404shoes.entity.HoaDon;
//import com.poly.duanbangiay.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface HoaDonRepository extends JpaRepository<HoaDon,Long> {

    @Query("SELECT hd FROM HoaDon hd order by hd.ngayTao desc")
    List<HoaDon> findAllByDescByNgayTao();
}
