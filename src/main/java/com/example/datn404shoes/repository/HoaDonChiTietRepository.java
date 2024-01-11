package com.example.datn404shoes.repository;

import com.example.datn404shoes.DTO.HoaDonChiTietDto;
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


    @Query("SELECT hdct.hd.id " +
            "FROM HoaDonChiTiet hdct " +
            "JOIN HoaDon hd ON hdct.hd.id = hd.id " +
            "WHERE hd.maHoaDon = :maHoaDon AND hd.sdt = :sdt ")
    String findAllByHd_MaHoaDonandEmail(@Param("maHoaDon") String maHoaDon, @Param("sdt") String sdt);

    @Query("SELECT sp.ten AS ten_san_pham, " +
            "SUM(hdct.soLuong) AS so_luong_ban, " +
            "SUM(spct.donGia * hdct.soLuong) AS doanh_thu " +
            "FROM HoaDonChiTiet hdct " +
            "JOIN SanPhamChiTiet spct ON hdct.sanPhamChiTiet.id = spct.id " +
            "JOIN SanPham sp ON spct.sanPham.id = sp.id " +
            "JOIN HoaDon hd ON hdct.hd.id = hd.id " +
            "WHERE hd.ngayTao BETWEEN :startDate AND :endDate AND  hd.trangThai IN (4, 6) " +
            "GROUP BY spct.sanPham.id, sp.ten " +
            "ORDER BY so_luong_ban DESC")
    List<Object[]> thongKeDoanhThuSanPham(@Param("startDate") Date startDate, @Param("endDate") Date endDate);


    @Query("SELECT sp.ten AS ten_san_pham, SUM(hdct.soLuong) AS so_luong_ban, SUM(spct.donGia * hdct.soLuong) AS doanh_thu " +
            "FROM HoaDonChiTiet hdct " +
            "JOIN SanPhamChiTiet spct ON hdct.sanPhamChiTiet.id = spct.id " +
            "JOIN SanPham sp ON spct.sanPham.id = sp.id " +
            "JOIN HoaDon hd ON hdct.hd.id = hd.id " +
            "WHERE FUNCTION('MONTH', hd.ngayTao) = FUNCTION('MONTH', :startDate) " +
            "AND FUNCTION('YEAR', hd.ngayTao) = FUNCTION('YEAR', :startDate)  AND  hd.trangThai IN (4, 6)" +
            "GROUP BY spct.sanPham.id, sp.ten " +
            "ORDER BY so_luong_ban DESC")
    List<Object[]> thongKeDoanhThuTheoThang(@Param("startDate") Date startDate);

    @Query("SELECT sp.ten AS ten_san_pham, SUM(hdct.soLuong) AS so_luong_ban, SUM(spct.donGia * hdct.soLuong) AS doanh_thu " +
            "FROM HoaDonChiTiet hdct " +
            "JOIN SanPhamChiTiet spct ON hdct.sanPhamChiTiet.id = spct.id " +
            "JOIN SanPham sp ON spct.sanPham.id = sp.id " +
            "JOIN HoaDon hd ON hdct.hd.id = hd.id " +
            "WHERE FUNCTION('YEAR', hd.ngayTao) = FUNCTION('YEAR', :startDate) AND  hd.trangThai IN (4, 6)" +
            "GROUP BY spct.sanPham.id, sp.ten " +
            "ORDER BY so_luong_ban DESC")
    List<Object[]> thongKeDoanhThuTheoNam(@Param("startDate") Date startDate);

    @Query("SELECT " +
            "FUNCTION('MONTH', hd.ngayTao) AS thang, " +
            "SUM(hdct.soLuong) AS tong_so_san_pham, " +
            "SUM(spct.donGia * hdct.soLuong) AS tong_tien, " +
            "MIN(spct.donGia) AS gia_mua_nho_nhat, " +
            "MAX(spct.donGia) AS gia_mua_lon_nhat, " +
            "AVG(spct.donGia) AS gia_mua_trung_binh " +
            "FROM HoaDonChiTiet hdct " +
            "JOIN SanPhamChiTiet spct ON hdct.sanPhamChiTiet.id = spct.id " +
            "JOIN HoaDon hd ON hdct.hd.id = hd.id " +
            "WHERE FUNCTION('YEAR', hd.ngayTao) = FUNCTION('YEAR', :startDate) AND  hd.trangThai IN (4, 6)" +
            "GROUP BY FUNCTION('MONTH', hd.ngayTao)")
    List<Object[]> thongKeDoanhThuTheoThangNew(@Param("startDate") Date startDate);

    @Query(value = """
                    select new com.example.datn404shoes.DTO.HoaDonChiTietDto(od.soLuong, p.ten,pd.donGia)  
                    from HoaDonChiTiet od 
                    inner join HoaDon o on o.id = od.hd.id
                    inner join SanPhamChiTiet pd on od.sanPhamChiTiet.id = pd.id 
                    inner join SanPham p on p.id = pd.sanPham.id 
                    where o.id = :id
                    """)
    List<HoaDonChiTietDto> getListOrderPdf(Long id);

}
