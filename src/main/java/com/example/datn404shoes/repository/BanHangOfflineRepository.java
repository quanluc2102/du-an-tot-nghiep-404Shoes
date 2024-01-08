package com.example.datn404shoes.repository;

import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.datn404shoes.entity.HoaDon;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.example.datn404shoes.entity.SanPhamChiTiet;
import com.example.datn404shoes.entity.HoaDonChiTiet;
import java.util.List;

@Repository
@Transactional
public interface BanHangOfflineRepository extends JpaRepository<HoaDon, Long> {

    @Query(value = "select hd from HoaDon hd where hd.kieuHoaDon = 2 and hd.trangThai = 0")
    List<HoaDon> layDanhSachHoaDonCho();

    @Query(value = "select  hdct from HoaDonChiTiet hdct join HoaDon hd on hdct.hd.id = hd.id where hd.id =:id and hd.kieuHoaDon = 2 and hd.trangThai = 0")
    List<HoaDonChiTiet> layDanhSachHDCTTrongHD(@Param("id") Long id);

    @Query(value = "select spct from SanPhamChiTiet spct join HoaDonChiTiet hdct on spct.id = hdct.sanPhamChiTiet.id join HoaDon hd on hdct.hd.id = hd.id where hd.trangThai = 0 and hd.kieuHoaDon = 2 and hd.id =:id")
    List<SanPhamChiTiet> layDanhSachSPCT(@Param("id") Long id);

    @Modifying
    @Query(value = "delete from HoaDon hd where hd.id =:id and hd.kieuHoaDon = 2 and hd.trangThai = 0")
    Boolean deleteHoaDonCho(@Param("id") Long id);

    @Modifying
    @Query(value = "delete from HoaDonChiTiet hdct where hdct.id = :id")
    void deleteHoaDonChiTiet(@Param("id") Long id);

}
