package com.example.datn404shoes.repository;

import com.example.datn404shoes.entity.HoaDon;
//import com.poly.duanbangiay.entity.HoaDon;
import com.example.datn404shoes.entity.HoaDonChiTiet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.data.repository.query.Param;



import java.util.List;

public interface HoaDonRepository extends JpaRepository<HoaDon, Long> {

    @Query("SELECT hd.id, MAX(hd.maHoaDon) AS maHoaDon " +
            "FROM HoaDon hd " +
            "INNER JOIN HoaDonChiTiet hdct ON hd.id = hdct.hd.id " +
            "WHERE hd.taiKhoanKhachHang.id = :taiKhoanId " +
            "GROUP BY hd.id")
    List<Object[]> findAllByTaiKhoanGroupByHoaDonChiTiet(@Param("taiKhoanId") Long id);

    @Query(value = "SELECT\n" +
            "    hd.ma_hoa_don AS MaHoaDon,\n" +
            "    hd.trang_thai AS TrangThai,\n" +
            "    hd.ngay_tao AS NgayMua,\n" +
            "    hd.tong_tien_sau_giam AS TongTien,\n" +
            "    hd.id AS TongTien\n" +
            "FROM\n" +
            "    hoa_don hd\n" +
            "WHERE\n" +
            "    hd.tai_khoan_khach_hang_id = :id\n" +
            "ORDER BY\n" +
            "hd.ngay_tao DESC;", nativeQuery = true)
    List<Object[]> all(@Param("id") Long id);

    @Query(value = "SELECT\n" +
            "    hd.ma_hoa_don AS MaHoaDon,\n" +
            "    hd.trang_thai AS TrangThai,\n" +
            "    hd.ngay_tao AS NgayMua,\n" +
            "    hd.tong_tien_sau_giam AS TongTien,\n" +
            "    hd.id AS TongTien\n" +
            "FROM\n" +
            "    hoa_don hd\n" +
            "WHERE\n" +
            "    hd.tai_khoan_khach_hang_id = :id\n" +
            "    AND hd.trang_thai = 0\n" +
            "ORDER BY\n" +
            "hd.ngay_tao DESC;", nativeQuery = true)
    List<Object[]> hoaDonChuaXacNhan(@Param("id") Long id);

    @Query(value = "SELECT\n" +
            "    hd.ma_hoa_don AS MaHoaDon,\n" +
            "    hd.trang_thai AS TrangThai,\n" +
            "    hd.ngay_tao AS NgayMua,\n" +
            "    hd.tong_tien_sau_giam AS TongTien,\n" +
            "    hd.id AS TongTien\n" +
            "FROM\n" +
            "    hoa_don hd\n" +
            "WHERE\n" +
            "    hd.tai_khoan_khach_hang_id = :id\n" +
            "    AND hd.trang_thai = 1\n" +
            "ORDER BY\n" +
            "hd.ngay_tao DESC;", nativeQuery = true)
    List<Object[]> xacNhan(@Param("id") Long id);

    @Query(value = "SELECT\n" +
            "    hd.ma_hoa_don AS MaHoaDon,\n" +
            "    hd.trang_thai AS TrangThai,\n" +
            "    hd.ngay_tao AS NgayMua,\n" +
            "    hd.tong_tien_sau_giam AS TongTien,\n" +
            "    hd.id AS TongTien\n" +
            "FROM\n" +
            "    hoa_don hd\n" +
            "WHERE\n" +
            "    hd.tai_khoan_khach_hang_id = :id\n" +
            "    AND hd.trang_thai = 2\n" +
            "ORDER BY\n" +
            "hd.ngay_tao DESC;", nativeQuery = true)
    List<Object[]> dongGoi(@Param("id") Long id);

    @Query(value = "SELECT\n" +
            "    hd.ma_hoa_don AS MaHoaDon,\n" +
            "    hd.trang_thai AS TrangThai,\n" +
            "    hd.ngay_tao AS NgayMua,\n" +
            "    hd.tong_tien_sau_giam AS TongTien,\n" +
            "    hd.id AS TongTien\n" +
            "FROM\n" +
            "    hoa_don hd\n" +
            "WHERE\n" +
            "    hd.tai_khoan_khach_hang_id = :id\n" +
            "    AND hd.trang_thai = 3\n" +
            "ORDER BY\n" +
            "hd.ngay_tao DESC;", nativeQuery = true)
    List<Object[]> dangGiao(@Param("id") Long id);

    @Query(value = "SELECT\n" +
            "    hd.ma_hoa_don AS MaHoaDon,\n" +
            "    hd.trang_thai AS TrangThai,\n" +
            "    hd.ngay_tao AS NgayMua,\n" +
            "    hd.tong_tien_sau_giam AS TongTien,\n" +
            "    hd.id AS TongTien\n" +
            "FROM\n" +
            "    hoa_don hd\n" +
            "WHERE\n" +
            "    hd.tai_khoan_khach_hang_id = :id\n" +
            "    AND hd.trang_thai = 4\n" +
            "ORDER BY\n" +
            "hd.ngay_tao DESC;", nativeQuery = true)
    List<Object[]> hoanThanh(@Param("id") Long id);

    @Query(value = "SELECT\n" +
            "    hd.ma_hoa_don AS MaHoaDon,\n" +
            "    hd.trang_thai AS TrangThai,\n" +
            "    hd.ngay_tao AS NgayMua,\n" +
            "    hd.tong_tien_sau_giam AS TongTien,\n" +
            "    hd.id AS TongTien\n" +
            "FROM\n" +
            "    hoa_don hd\n" +
            "WHERE\n" +
            "    hd.tai_khoan_khach_hang_id = :id\n" +
            "    AND hd.trang_thai = 5\n" +
            "ORDER BY\n" +
            "hd.ngay_tao DESC;", nativeQuery = true)
    List<Object[]> huy(@Param("id") Long id);

    @Query(value = "SELECT\n" +
            "    hd.ma_hoa_don AS MaHoaDon,\n" +
            "    hd.trang_thai AS TrangThai,\n" +
            "    hd.ngay_tao AS NgayMua,\n" +
            "    hd.tong_tien_sau_giam AS TongTien,\n" +
            "    hd.id AS TongTien\n" +
            "FROM\n" +
            "    hoa_don hd\n" +
            "WHERE\n" +
            "    hd.tai_khoan_khach_hang_id = :id\n" +
            "    AND hd.trang_thai = 6\n" +
            "ORDER BY\n" +
            "hd.ngay_tao DESC;", nativeQuery = true)
    List<Object[]> muaTaiQuay(@Param("id") Long id);
    

    @Query("SELECT hd FROM HoaDon hd order by hd.ngayTao desc")
    List<HoaDon> findAllByDescByNgayTao();


    @Query(value = "SELECT TOP 1 hd.ma_hoa_don AS MaHoaDon FROM hoa_don hd ORDER BY hd.id DESC", nativeQuery = true)
    Object[] thanhToanThanhCong();
}
