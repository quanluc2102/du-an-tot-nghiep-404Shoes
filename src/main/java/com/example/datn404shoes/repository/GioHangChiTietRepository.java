package com.example.datn404shoes.repository;

import com.example.datn404shoes.entity.GioHangChiTiet;
import com.example.datn404shoes.entity.SanPham;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface GioHangChiTietRepository extends JpaRepository<GioHangChiTiet,Long> {

    @Query(value = "SELECT sp FROM SanPham sp INNER JOIN GioHangChiTiet ghct WHERE ghct.id =:id")
            public List<SanPham> getSanPham(@Param("id") Long id);

    @Query("SELECT ghct FROM GioHangChiTiet ghct " +
            "JOIN GioHang gh ON ghct.gioHangId.id = gh.id " +
            "JOIN SanPhamChiTiet spct ON ghct.sanPhamChiTietId.id = spct.id " +
            "WHERE gh.taiKhoan.id = ?1")
    ArrayList<GioHangChiTiet> findAllByTaiKhoanKhachHang(Long idKhachHang);



    @Modifying
    @Query(value = "DELETE FROM GioHangChiTiet ghct WHERE ghct.id =:id ")
    public int deleteByIdGhct(Long id);

    @Modifying
    @Query(value = "UPDATE GioHangChiTiet  ghct SET ghct.soLuong =:soLuong WHERE ghct.id =:idGHCT AND ghct.sanPhamChiTietId.id =:idSPCT")
    public int updateSoLuongGHCT(int soLuong, Long idGHCT, Long idSPCT);

}
