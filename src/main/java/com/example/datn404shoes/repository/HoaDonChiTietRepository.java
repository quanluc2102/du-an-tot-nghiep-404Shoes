package com.example.datn404shoes.repository;

import com.example.datn404shoes.entity.HoaDonChiTiet;
//import com.poly.duanbangiay.entity.HoaDonChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public interface HoaDonChiTietRepository extends JpaRepository<HoaDonChiTiet, Long> {
    List<HoaDonChiTiet> findAllByHd_Id(Long id);

    @Query("SELECT sp.ten AS ten_san_pham, " +
            "SUM(hdct.soLuong) AS so_luong_ban, " +
            "SUM(spct.donGia * hdct.soLuong) AS doanh_thu " +
            "FROM HoaDonChiTiet hdct " +
            "JOIN SanPhamChiTiet spct ON hdct.sanPhamChiTiet.id = spct.id " +
            "JOIN SanPham sp ON spct.sanPham.id = sp.id " +
            "JOIN HoaDon hd ON hdct.hd.id = hd.id " +
            "WHERE hd.ngayTao BETWEEN :startDate AND :endDate " +
            "GROUP BY spct.sanPham.id, sp.ten " +
            "ORDER BY so_luong_ban DESC")
    List<Object[]> thongKeDoanhThu(@Param("startDate") Date startDate, @Param("endDate") Date endDate);


}
