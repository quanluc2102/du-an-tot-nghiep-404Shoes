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
            "WHERE h.ngayTao BETWEEN :startDate AND :endDate AND  h.trangThai IN (4, 6)" +
            "GROUP BY CAST(h.ngayTao AS DATE)")
    List<ThongKeCustom> thongKeDoanhThuTheoNgay(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

//    @Query("SELECT NEW com.example.datn404shoes.custom.ThongKeCustom(FUNCTION('YEAR', h.ngayTao), FUNCTION('MONTH', h.ngayTao), SUM(h.tongTienSauGiam)) " +
//            "FROM HoaDon h " +
//            "WHERE h.ngayTao BETWEEN :startDate AND :endDate " +
//            "GROUP BY FUNCTION('YEAR', h.ngayTao), FUNCTION('MONTH', h.ngayTao)")
//    List<Object[]> thongKeDoanhThuTheoThang(@Param("startDate") Date startDate, @Param("endDate") Date endDate);

    @Query("SELECT NEW com.example.datn404shoes.custom.ThongKeCustom(FUNCTION('YEAR', h.ngayTao), SUM(h.tongTienSauGiam)) " +
            "FROM HoaDon h " +
            "WHERE h.ngayTao BETWEEN :startDate AND :endDate and h.trangThai =4 or h.trangThai = 6" +
            "GROUP BY FUNCTION('YEAR', h.ngayTao)")
    List<ThongKeCustom> thongKeDoanhThuTheoNam(@Param("startDate") Date startDate, @Param("endDate") Date endDate);


    @Query("SELECT SUM(hd.tongTien) FROM HoaDon hd WHERE CAST(hd.ngayTao AS date)  = CURRENT_DATE and hd.trangThai IN (4, 6)")
    Float findDoanhThuNgay();

    @Query("SELECT SUM(hd.tongTien) FROM HoaDon hd WHERE CAST(hd.ngayTao AS date) >= :startOfWeek AND CAST(hd.ngayTao AS date) < :endOfWeek and hd.trangThai IN (4, 6)")
    Float findDoanhThuTuan(@Param("startOfWeek") LocalDate startOfWeek, @Param("endOfWeek") LocalDate endOfWeek);

    @Query("SELECT SUM(hd.tongTien) FROM HoaDon hd WHERE MONTH(hd.ngayTao) = MONTH(CURRENT_DATE) AND YEAR(hd.ngayTao) = YEAR(CURRENT_DATE) and hd.trangThai IN (4, 6)")
    Float findDoanhThuThang();

    @Query("SELECT SUM(hd.tongTien) FROM HoaDon hd WHERE QUARTER(hd.ngayTao) = QUARTER(CURRENT_DATE) AND YEAR(hd.ngayTao) = YEAR(CURRENT_DATE) and hd.trangThai IN (4, 6)")
    Float findDoanhThuQuy();

    @Query("SELECT SUM(hd.tongTien) FROM HoaDon hd WHERE YEAR(hd.ngayTao) = YEAR(CURRENT_DATE) and hd.trangThai IN (4, 6)")
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


    @Query("SELECT COUNT(hd) FROM HoaDon hd WHERE CAST(hd.ngayTao AS DATE) = CURRENT_DATE AND hd.trangThai=5")
    Long countHoaDonHuyNgay();

    @Query("SELECT COUNT(hd) FROM HoaDon hd WHERE hd.ngayTao >= :startOfWeek AND hd.ngayTao < :endOfWeek AND hd.trangThai=5")
    Long countHoaDonHuyTuan(@Param("startOfWeek") Date startOfWeek, @Param("endOfWeek") Date endOfWeek);

    @Query("SELECT COUNT(hd) FROM HoaDon hd WHERE MONTH(hd.ngayTao) = MONTH(CURRENT_DATE) AND YEAR(hd.ngayTao) = YEAR(CURRENT_DATE) AND hd.trangThai=5")
    Long countHoaDonHuyThang();

    @Query("SELECT COUNT(hd) FROM HoaDon hd WHERE QUARTER(hd.ngayTao) = QUARTER(CURRENT_DATE) AND YEAR(hd.ngayTao) = YEAR(CURRENT_DATE) AND hd.trangThai=5")
    Long countHoaDonHuyQuy();

    @Query("SELECT COUNT(hd) FROM HoaDon hd WHERE YEAR(hd.ngayTao) = YEAR(CURRENT_DATE) AND hd.trangThai=5")
    Long countHoaDonHuyNam();


    @Query("SELECT COUNT(spct) FROM SanPhamChiTiet spct")
    Long countSanPhamChiTietTQ();

    @Query("SELECT COUNT(hoaDon) FROM HoaDon hoaDon")
    Long countHoaDonTQ();

    @Query("SELECT COUNT(DISTINCT tk.id) FROM TaiKhoan tk WHERE EXISTS (SELECT 1 FROM PhanQuyen pq WHERE pq.taiKhoan = tk AND pq.quyen.id = 3)")
    Long countDistinctTaiKhoanIdTQ();


    @Query("SELECT COUNT(tk) FROM HoaDon tk WHERE tk.trangThai <> 4 AND tk.trangThai <> 5 AND tk.trangThai <> 6 ")
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


    @Query("SELECT hd.id, hd.maHoaDon, tk.thongTinNguoiDung.ten, hd.ngayTao, hd.trangThai " +
            "FROM HoaDon hd " +
            "JOIN TaiKhoan tk ON hd.taiKhoan.id = tk.id " +
            "WHERE hd.trangThai NOT IN (4, 5, 6) " +
            "ORDER BY hd.ngayTao ASC")
    List<Object[]> hoaDonChuaXuLyhe();



    @Query(value = "\n" +
            "\n" +
            "WITH TongDoanhThu AS (\n" +
            "    SELECT\n" +
            "        YEAR(hd.ngay_tao) AS nam,\n" +
            "        SUM(hdct.so_luong * spct.don_gia) AS doanh_thu\n" +
            "    FROM hoa_don hd\n" +
            "    JOIN hoa_don_chi_tiet hdct ON hd.id = hdct.hoa_don_id\n" +
            "    JOIN san_pham_chi_tiet spct ON hdct.san_pham_chi_tiet_id = spct.id\n" +
            "    GROUP BY YEAR(hd.ngay_tao)\n" +
            ")\n" +
            "SELECT\n" +
            "    nam,\n" +
            "    doanh_thu,\n" +
            "    doanh_thu_nam_truoc,\n" +
            "    trang_thai_tang_truong,\n" +
            "    phan_tram_tang_truong\n" +
            "FROM (\n" +
            "    SELECT\n" +
            "        nam,\n" +
            "        doanh_thu,\n" +
            "        LAG(doanh_thu) OVER (ORDER BY nam) AS doanh_thu_nam_truoc,\n" +
            "        CASE\n" +
            "            WHEN LAG(doanh_thu) OVER (ORDER BY nam) IS NULL THEN 'N/A'\n" +
            "            WHEN doanh_thu > LAG(doanh_thu) OVER (ORDER BY nam) THEN 'Tăng'\n" +
            "            ELSE 'Giảm'\n" +
            "        END AS trang_thai_tang_truong,\n" +
            "        CASE\n" +
            "            WHEN LAG(doanh_thu) OVER (ORDER BY nam) IS NULL THEN 'N/A'\n" +
            "            ELSE CONCAT(\n" +
            "                ROUND(((doanh_thu - LAG(doanh_thu) OVER (ORDER BY nam)) / LAG(doanh_thu) OVER (ORDER BY nam)) * 100, 2),\n" +
            "                '%'\n" +
            "            )\n" +
            "        END AS phan_tram_tang_truong\n" +
            "    FROM TongDoanhThu\n" +
            "    WHERE nam IN (YEAR(GETDATE()), YEAR(GETDATE()) - 1)\n" +
            ") AS Subquery\n" +
            "WHERE doanh_thu > doanh_thu_nam_truoc\n" +
            "ORDER BY nam;\n", nativeQuery = true)
    List<Object[]> tocDoTangTruongNam();


    @Query(value = "WITH TongDoanhThu AS (\n" +
            "    SELECT\n" +
            "        Month(hd.ngay_tao) AS nam,\n" +
            "        SUM(hdct.so_luong * spct.don_gia) AS doanh_thu\n" +
            "    FROM hoa_don hd\n" +
            "    JOIN hoa_don_chi_tiet hdct ON hd.id = hdct.hoa_don_id\n" +
            "    JOIN san_pham_chi_tiet spct ON hdct.san_pham_chi_tiet_id = spct.id\n" +
            "    GROUP BY Month(hd.ngay_tao)\n" +
            ")\n" +
            "SELECT\n" +
            "    nam,\n" +
            "    doanh_thu,\n" +
            "    doanh_thu_nam_truoc,\n" +
            "    trang_thai_tang_truong,\n" +
            "    phan_tram_tang_truong\n" +
            "FROM (\n" +
            "    SELECT\n" +
            "        nam,\n" +
            "        doanh_thu,\n" +
            "        LAG(doanh_thu) OVER (ORDER BY nam) AS doanh_thu_nam_truoc,\n" +
            "        CASE\n" +
            "            WHEN LAG(doanh_thu) OVER (ORDER BY nam) IS NULL THEN 'N/A'\n" +
            "            WHEN doanh_thu > LAG(doanh_thu) OVER (ORDER BY nam) THEN 'Tăng'\n" +
            "            ELSE 'Giảm'\n" +
            "        END AS trang_thai_tang_truong,\n" +
            "        CASE\n" +
            "            WHEN LAG(doanh_thu) OVER (ORDER BY nam) IS NULL THEN 'N/A'\n" +
            "            ELSE CONCAT(\n" +
            "                ROUND(((doanh_thu - LAG(doanh_thu) OVER (ORDER BY nam)) / LAG(doanh_thu) OVER (ORDER BY nam)) * 100, 2),\n" +
            "                '%'\n" +
            "            )\n" +
            "        END AS phan_tram_tang_truong\n" +
            "    FROM TongDoanhThu\n" +
            "    WHERE nam IN (Month(GETDATE()), Month(GETDATE()) - 1)\n" +
            ") AS Subquery\n" +
            "WHERE doanh_thu > doanh_thu_nam_truoc\n" +
            "ORDER BY nam;\n", nativeQuery = true)
    List<Object[]> tocDoTangTruongThang();



    @Query(value = "\n" +
            "WITH TongDoanhThu AS (\n" +
            "    SELECT\n" +
            "        CONVERT(DATE, hd.ngay_tao) AS ngay,\n" +
            "        SUM(hdct.so_luong * spct.don_gia) AS doanh_thu\n" +
            "    FROM hoa_don hd\n" +
            "    JOIN hoa_don_chi_tiet hdct ON hd.id = hdct.hoa_don_id\n" +
            "    JOIN san_pham_chi_tiet spct ON hdct.san_pham_chi_tiet_id = spct.id\n" +
            "    WHERE CONVERT(DATE, hd.ngay_tao) IN (CONVERT(DATE, GETDATE()), DATEADD(DAY, -1, CONVERT(DATE, GETDATE())))\n" +
            "    GROUP BY CONVERT(DATE, hd.ngay_tao)\n" +
            ")\n" +
            "SELECT\n" +
            "    ngay,\n" +
            "    SUM(doanh_thu) AS doanh_thu,\n" +
            "    LAG(SUM(doanh_thu)) OVER (ORDER BY ngay) AS doanh_thu_ngay_truoc,\n" +
            "    CASE\n" +
            "        WHEN LAG(SUM(doanh_thu)) OVER (ORDER BY ngay) IS NULL THEN 'N/A'\n" +
            "        WHEN SUM(doanh_thu) > LAG(SUM(doanh_thu)) OVER (ORDER BY ngay) THEN 'Tang'\n" +
            "        WHEN SUM(doanh_thu) < LAG(SUM(doanh_thu)) OVER (ORDER BY ngay) THEN 'Giam'\n" +
            "        ELSE 'Không đổi'\n" +
            "    END AS trang_thai_tang_truong,\n" +
            "    CASE\n" +
            "        WHEN LAG(SUM(doanh_thu)) OVER (ORDER BY ngay) IS NULL THEN 'N/A'\n" +
            "        ELSE CONCAT(\n" +
            "            ROUND(((SUM(doanh_thu) - LAG(SUM(doanh_thu)) OVER (ORDER BY ngay)) / ABS(LAG(SUM(doanh_thu)) OVER (ORDER BY ngay))) * 100, 2),\n" +
            "            '%'\n" +
            "        )\n" +
            "    END AS phan_tram_tang_truong\n" +
            "FROM TongDoanhThu\n" +
            "WHERE ngay IN (CONVERT(DATE, GETDATE()), DATEADD(DAY, -1, CONVERT(DATE, GETDATE())))\n" +
            "GROUP BY ngay\n" +
            "ORDER BY ngay;\n", nativeQuery = true)
    List<Object[]> tocDoTangTruongNgay();





    @Query(value = "\n" +
            "WITH TongSoLuongDaBan AS (\n" +
            "    SELECT\n" +
            "        YEAR(hd.ngay_tao) AS nam,\n" +
            "        SUM(hdct.so_luong) AS so_luong_da_ban\n" +
            "    FROM hoa_don hd\n" +
            "    JOIN hoa_don_chi_tiet hdct ON hd.id = hdct.hoa_don_id\n" +
            "    JOIN san_pham_chi_tiet spct ON hdct.san_pham_chi_tiet_id = spct.id\n" +
            "    GROUP BY YEAR(hd.ngay_tao)\n" +
            ")\n" +
            "SELECT\n" +
            "    nam,\n" +
            "    SUM(so_luong_da_ban) AS tong_so_luong_da_ban,\n" +
            "    COALESCE(LAG(SUM(so_luong_da_ban)) OVER (ORDER BY nam), 0) AS tong_so_luong_da_ban_nam_truoc,\n" +
            "    CASE\n" +
            "        WHEN LAG(SUM(so_luong_da_ban)) OVER (ORDER BY nam) IS NULL THEN 'N/A'\n" +
            "        WHEN SUM(so_luong_da_ban) > LAG(SUM(so_luong_da_ban)) OVER (ORDER BY nam) THEN 'Tăng'\n" +
            "        ELSE 'Giảm'\n" +
            "    END AS trang_thai_tang_truong,\n" +
            "    CASE\n" +
            "        WHEN LAG(SUM(so_luong_da_ban)) OVER (ORDER BY nam) IS NULL THEN 'N/A'\n" +
            "        ELSE CONCAT(\n" +
            "            ROUND(((SUM(so_luong_da_ban) - LAG(SUM(so_luong_da_ban)) OVER (ORDER BY nam)) / COALESCE(LAG(SUM(so_luong_da_ban)) OVER (ORDER BY nam), 1)) * 100, 2),\n" +
            "            '%'\n" +
            "        )\n" +
            "    END AS phan_tram_tang_truong\n" +
            "FROM TongSoLuongDaBan\n" +
            "WHERE nam IN (YEAR(GETDATE()), YEAR(GETDATE()) - 1)\n" +
            "GROUP BY nam\n" +
            "ORDER BY nam;\n", nativeQuery = true)
    List<Object[]> tocDoTangTruongSanPhamTheoNam();

    @Query(value = "\n" +
            "\n" +
            "WITH TongSoLuongDaBan AS (\n" +
            "    SELECT\n" +
            "        YEAR(hd.ngay_tao) AS nam,\n" +
            "        MONTH(hd.ngay_tao) AS thang,\n" +
            "        SUM(hdct.so_luong) AS so_luong_da_ban\n" +
            "    FROM hoa_don hd\n" +
            "    JOIN hoa_don_chi_tiet hdct ON hd.id = hdct.hoa_don_id\n" +
            "    JOIN san_pham_chi_tiet spct ON hdct.san_pham_chi_tiet_id = spct.id\n" +
            "    WHERE YEAR(hd.ngay_tao) = YEAR(GETDATE()) AND MONTH(hd.ngay_tao) IN (MONTH(GETDATE()), MONTH(GETDATE()) - 1)\n" +
            "    GROUP BY YEAR(hd.ngay_tao), MONTH(hd.ngay_tao)\n" +
            ")\n" +
            "SELECT\n" +
            "    thang,\n" +
            "    SUM(so_luong_da_ban) AS tong_so_luong_da_ban,\n" +
            "    LAG(SUM(so_luong_da_ban)) OVER (ORDER BY thang) AS tong_so_luong_da_ban_thang_truoc,\n" +
            "    CASE\n" +
            "        WHEN LAG(SUM(so_luong_da_ban)) OVER (ORDER BY thang) IS NULL THEN 'N/A'\n" +
            "        WHEN SUM(so_luong_da_ban) > LAG(SUM(so_luong_da_ban)) OVER (ORDER BY thang) THEN 'Tăng'\n" +
            "        ELSE 'Giảm'\n" +
            "    END AS trang_thai_tang_truong,\n" +
            "    CASE\n" +
            "        WHEN LAG(SUM(so_luong_da_ban)) OVER (ORDER BY  thang) IS NULL THEN 'N/A'\n" +
            "        ELSE CONCAT(\n" +
            "            ROUND(((SUM(so_luong_da_ban) - LAG(SUM(so_luong_da_ban)) OVER (ORDER BY thang)) / COALESCE(LAG(SUM(so_luong_da_ban)) OVER (ORDER BY thang), 1)) * 100, 2),\n" +
            "            '%'\n" +
            "        )\n" +
            "    END AS phan_tram_tang_truong\n" +
            "FROM TongSoLuongDaBan\n" +
            "WHERE thang IN (MONTH(GETDATE()), MONTH(GETDATE()) - 1)\n" +
            "GROUP BY  thang\n" +
            "ORDER BY  thang;\n", nativeQuery = true)
    List<Object[]> tocDoTangTruongSanPhamTheoThang();

    @Query(value = "\n" +
            "WITH TongSoLuongDaBan AS (\n" +
            "    SELECT\n" +
            "        CONVERT(DATE, hd.ngay_tao) AS ngay,\n" +
            "        SUM(hdct.so_luong) AS so_luong_da_ban\n" +
            "    FROM hoa_don hd\n" +
            "    JOIN hoa_don_chi_tiet hdct ON hd.id = hdct.hoa_don_id\n" +
            "    JOIN san_pham_chi_tiet spct ON hdct.san_pham_chi_tiet_id = spct.id\n" +
            "    WHERE CONVERT(DATE, hd.ngay_tao) IN (CONVERT(DATE, GETDATE()), DATEADD(DAY, -1, CONVERT(DATE, GETDATE())))\n" +
            "    GROUP BY CONVERT(DATE, hd.ngay_tao)\n" +
            ")\n" +
            "SELECT\n" +
            "    ngay,\n" +
            "    SUM(so_luong_da_ban) AS tong_so_luong_da_ban,\n" +
            "    LAG(SUM(so_luong_da_ban)) OVER (ORDER BY ngay) AS tong_so_luong_da_ban_ngay_truoc,\n" +
            "    CASE\n" +
            "        WHEN LAG(SUM(so_luong_da_ban)) OVER (ORDER BY ngay) IS NULL THEN 'N/A'\n" +
            "        WHEN SUM(so_luong_da_ban) > LAG(SUM(so_luong_da_ban)) OVER (ORDER BY ngay) THEN 'Tang'\n" +
            "        WHEN SUM(so_luong_da_ban) < LAG(SUM(so_luong_da_ban)) OVER (ORDER BY ngay) THEN 'Giam'\n" +
            "        ELSE 'Không đổi'\n" +
            "    END AS trang_thai_tang_truong,\n" +
            "    CASE\n" +
            "        WHEN LAG(SUM(so_luong_da_ban)) OVER (ORDER BY ngay) IS NULL THEN 'N/A'\n" +
            "        ELSE CONCAT(\n" +
            "            ROUND(((LAG(SUM(so_luong_da_ban)) OVER (ORDER BY ngay) - SUM(so_luong_da_ban)) / LAG(SUM(so_luong_da_ban)) OVER (ORDER BY ngay)) * 100, 2),\n" +
            "            '%'\n" +
            "        )\n" +
            "    END AS phan_tram_tang_truong\n" +
            "FROM TongSoLuongDaBan\n" +
            "WHERE ngay IN (CONVERT(DATE, GETDATE()), DATEADD(DAY, -1, CONVERT(DATE, GETDATE())))\n" +
            "GROUP BY ngay\n" +
            "ORDER BY ngay;\n", nativeQuery = true)
    List<Object[]> tocDoTangTruongSanPhamTheoNgay();

}
