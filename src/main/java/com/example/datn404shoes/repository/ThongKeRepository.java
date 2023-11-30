package com.example.datn404shoes.repository;

import com.example.datn404shoes.custom.ThongKeCustom;
import com.example.datn404shoes.entity.HoaDon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ThongKeRepository extends JpaRepository<HoaDon, Long> {

    @Query("SELECT NEW com.example.datn404shoes.custom.ThongKeCustom(CAST(h.ngayTao AS DATE), SUM(h.tongTienSauGiam)) " +
            "FROM HoaDon h " +
            "WHERE h.ngayTao BETWEEN :startDate AND :endDate " +
            "GROUP BY CAST(h.ngayTao AS DATE)")
    List<ThongKeCustom> thongKeDoanhThuTheoNgay(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

//    @Query("SELECT NEW com.example.datn404shoes.custom.ThongKeCustom(FUNCTION('YEAR', h.ngayTao), FUNCTION('MONTH', h.ngayTao), SUM(h.tongTienSauGiam)) " +
//            "FROM HoaDon h " +
//            "WHERE h.ngayTao BETWEEN :startDate AND :endDate " +
//            "GROUP BY FUNCTION('YEAR', h.ngayTao), FUNCTION('MONTH', h.ngayTao)")
//    List<Object[]> thongKeDoanhThuTheoThang(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT NEW com.example.datn404shoes.custom.ThongKeCustom(FUNCTION('YEAR', h.ngayTao), SUM(h.tongTienSauGiam)) " +
            "FROM HoaDon h " +
            "WHERE h.ngayTao BETWEEN :startDate AND :endDate " +
            "GROUP BY FUNCTION('YEAR', h.ngayTao)")
    List<ThongKeCustom> thongKeDoanhThuTheoNam(@Param("startDate") Date startDate, @Param("endDate") Date endDate);


    @Query("SELECT SUM(hd.tongTien) FROM HoaDon hd WHERE CAST(hd.ngayTao AS date) = CURRENT_DATE")
    Float findDoanhThuNgay();

    @Query("SELECT SUM(hd.tongTien) FROM HoaDon hd WHERE CAST(hd.ngayTao AS date) >= :startOfWeek AND CAST(hd.ngayTao AS date) < :endOfWeek")
    Float findDoanhThuTuan(@Param("startOfWeek") LocalDate startOfWeek, @Param("endOfWeek") LocalDate endOfWeek);

    @Query("SELECT SUM(hd.tongTien) FROM HoaDon hd WHERE MONTH(hd.ngayTao) = MONTH(CURRENT_DATE) AND YEAR(hd.ngayTao) = YEAR(CURRENT_DATE)")
    Float findDoanhThuThang();

    @Query("SELECT SUM(hd.tongTien) FROM HoaDon hd WHERE QUARTER(hd.ngayTao) = QUARTER(CURRENT_DATE) AND YEAR(hd.ngayTao) = YEAR(CURRENT_DATE)")
    Float findDoanhThuQuy();

    @Query("SELECT SUM(hd.tongTien) FROM HoaDon hd WHERE YEAR(hd.ngayTao) = YEAR(CURRENT_DATE)")
    Float findDoanhThuNam();

    @Query("SELECT COUNT(hd) FROM HoaDon hd WHERE CAST(hd.ngayTao AS DATE) = CURRENT_DATE")
    Long countHoaDonNgay();

    @Query("SELECT COUNT(hd) FROM HoaDon hd WHERE hd.ngayTao >= :startOfWeek AND hd.ngayTao < :endOfWeek")
    Long countHoaDonTuan(@Param("startOfWeek") Date startOfWeek, @Param("endOfWeek") Date endOfWeek);

    @Query("SELECT COUNT(hd) FROM HoaDon hd WHERE MONTH(hd.ngayTao) = MONTH(CURRENT_DATE) AND YEAR(hd.ngayTao) = YEAR(CURRENT_DATE)")
    Long countHoaDonThang();

    @Query("SELECT COUNT(hd) FROM HoaDon hd WHERE QUARTER(hd.ngayTao) = QUARTER(CURRENT_DATE) AND YEAR(hd.ngayTao) = YEAR(CURRENT_DATE)")
    Long countHoaDonQuy();

    @Query("SELECT COUNT(hd) FROM HoaDon hd WHERE YEAR(hd.ngayTao) = YEAR(CURRENT_DATE)")
    Long countHoaDonNam();




    @Query("SELECT COUNT(hd) FROM HoaDon hd WHERE CAST(hd.ngayTao AS DATE) = CURRENT_DATE AND hd.trangThai=6")
    Long countHoaDonHuyNgay();

    @Query("SELECT COUNT(hd) FROM HoaDon hd WHERE hd.ngayTao >= :startOfWeek AND hd.ngayTao < :endOfWeek AND hd.trangThai=6")
    Long countHoaDonHuyTuan(@Param("startOfWeek") Date startOfWeek, @Param("endOfWeek") Date endOfWeek);

    @Query("SELECT COUNT(hd) FROM HoaDon hd WHERE MONTH(hd.ngayTao) = MONTH(CURRENT_DATE) AND YEAR(hd.ngayTao) = YEAR(CURRENT_DATE) AND hd.trangThai=6")
    Long countHoaDonHuyThang();

    @Query("SELECT COUNT(hd) FROM HoaDon hd WHERE QUARTER(hd.ngayTao) = QUARTER(CURRENT_DATE) AND YEAR(hd.ngayTao) = YEAR(CURRENT_DATE) AND hd.trangThai=6")
    Long countHoaDonHuyQuy();

    @Query("SELECT COUNT(hd) FROM HoaDon hd WHERE YEAR(hd.ngayTao) = YEAR(CURRENT_DATE) AND hd.trangThai=6")
    Long countHoaDonHuyNam();


    @Query("SELECT COUNT(spct) FROM SanPhamChiTiet spct")
    Long countSanPhamChiTietTQ();

    @Query("SELECT COUNT(hoaDon) FROM HoaDon hoaDon")
    Long countHoaDonTQ();

    @Query("SELECT COUNT(DISTINCT tk.id) FROM TaiKhoan tk WHERE EXISTS (SELECT 1 FROM PhanQuyen pq WHERE pq.taiKhoan = tk AND pq.quyen.id = 3)")
    Long countDistinctTaiKhoanIdTQ();


    @Query("SELECT COUNT(tk) FROM HoaDon tk WHERE tk.trangThai <> 4")
    Long countHoaDonChuaHoanThanhTQ();


    @Query("SELECT spct.id AS san_pham_chi_tiet_id, " +
            "SUM(hdct.soLuong) AS so_luong_da_ban, " +
            "CONCAT(sp.ten, ' - ', ms.ten) AS ten_san_pham, " +
            "spct.donGia, " +
            "spct.anh " +
            "FROM HoaDonChiTiet hdct " +
            "JOIN SanPhamChiTiet spct ON hdct.sanPhamChiTiet.id = spct.id " +
            "JOIN SanPham sp ON spct.sanPham.id = sp.id " +
            "JOIN MauSac ms ON spct.mauSac.id = ms.id " +
            "GROUP BY spct.id, sp.ten, ms.ten, spct.donGia, spct.anh " +
            "ORDER BY so_luong_da_ban DESC " +
            "LIMIT 10")
    List<Object[]> findTop10SanPhamBanChay();


    @Query("SELECT hd.id, hd.maHoaDon , tk.thongTinNguoiDung.ten , hd.ngayTao " +
            "FROM HoaDon hd " +
            "JOIN TaiKhoan tk ON hd.taiKhoan.id = tk.id " +
            "WHERE hd.trangThai = 0")
    List<Object[]> hoaDonChuaXuLyhe();



}
