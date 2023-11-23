package com.example.datn404shoes.service;

import com.example.datn404shoes.entity.GioHangChiTiet;
import com.example.datn404shoes.entity.PhanQuyen;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
//import com.poly.duanbangiay.entity.GioHangChiTiet;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Repository
public interface GioHangChiTietService{
    void add(GioHangChiTiet ghct);

    void delete(Long id);

    void update(GioHangChiTiet ghct);

    List<GioHangChiTiet> getAll();

    GioHangChiTiet getOne(Long id);

    ArrayList<GioHangChiTiet> getGioHangChiTietByKhachHang(Long idKhachHang);

}
