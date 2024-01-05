package com.example.datn404shoes.repository;

//import com.poly.duanbangiay.entity.SanPham;

import com.example.datn404shoes.entity.SanPham;
import com.example.datn404shoes.request.SanPhamUserCustom;
import com.example.datn404shoes.request.SanPhamUserCustom1;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SanPhamRespository extends JpaRepository<SanPham, Long> {
    @Query(value = "select sp.id,sp.ma_san_pham AS maSanPham,sp.anh_bia AS anhBia,sp.danh_muc AS danhMuc,dm.ten AS tenDanhMuc,sp.mo_ta AS moTa,sp.ten,sp.thuong_hieu AS thuongHieu,th.ten AS tenThuongHieu,sp.xuat_xu AS xuatXU,xx.ten AS tenXuatXu,MIN(spct.don_gia) AS min ,MAX(spct.don_gia) AS max,COALESCE(SUM(hdct.so_luong), 0) AS soLuongDaBan from san_pham sp \n" +
            "LEFT join san_pham_chi_tiet spct on sp.id=spct.san_pham_id\n" +
            "LEFT join hoa_don_chi_tiet hdct on hdct.san_pham_chi_tiet_id=spct.id\n" +
            "LEFT join danh_muc dm on dm.id=sp.danh_muc\n" +
            "LEFT join xuat_xu xx on xx.id=sp.xuat_xu\n" +
            "LEFT join thuong_hieu th on th.id=sp.thuong_hieu\n" +
            "GROUP BY sp.id,sp.ma_san_pham,sp.anh_bia,sp.danh_muc,sp.mo_ta,sp.ten,sp.thuong_hieu,sp.trang_thai,sp.xuat_xu,dm.ten,xx.ten,th.ten\n" +
            "order by SUM(hdct.so_luong) desc", nativeQuery = true)
    Page<SanPhamUserCustom> findAllKhoangGia(Pageable pageable);

    @Query(value = "select sp.id,sp.ma_san_pham AS maSanPham,sp.anh_bia AS anhBia,sp.danh_muc AS danhMuc,dm.ten AS tenDanhMuc,sp.mo_ta AS moTa,sp.ten,sp.thuong_hieu AS thuongHieu,th.ten AS tenThuongHieu,sp.xuat_xu AS xuatXU,xx.ten AS tenXuatXu, SUM(spct.so_luong) AS soLuongCon,sp.trang_thai AS trangThai from san_pham sp \n" +
            "join san_pham_chi_tiet spct on sp.id=spct.san_pham_id\n" +
            "join danh_muc dm on dm.id=sp.danh_muc\n" +
            "join xuat_xu xx on xx.id=sp.xuat_xu\n" +
            "join thuong_hieu th on th.id=sp.thuong_hieu\n" +
            "GROUP BY sp.id,sp.ma_san_pham,sp.anh_bia,sp.danh_muc,sp.mo_ta,sp.ten,sp.thuong_hieu,sp.trang_thai,sp.xuat_xu,dm.ten,xx.ten,th.ten\n" +
            "order by sp.id desc", nativeQuery = true)
    List<SanPhamUserCustom1> findAllSoLuong();

    //    @Query(value = "SELECT spct.* FROM san_pham sp LEFT JOIN san_pham_chi_tiet spct ON sp.id = spct.san_pham_id " +
//            "LEFT JOIN hoa_don_chi_tiet hdct ON hdct.san_pham_chi_tiet_id = spct.id LEFT JOIN danh_muc dm " +
//            "ON dm.id = sp.danh_muc LEFT JOIN xuat_xu xx ON xx.id = sp.xuat_xu LEFT JOIN thuong_hieu th " +
//            "ON th.id = sp.thuong_hieu GROUP BY sp.id, sp.ma_san_pham, sp.anh_bia, sp.danh_muc, sp.mo_ta, " +
//            "sp.ten, sp.thuong_hieu, sp.trang_thai, sp.xuat_xu, dm.ten, xx.ten, th.ten ORDER BY " +
//            "SUM(hdct.so_luong) DESC", nativeQuery = true)
//    Page<SanPhamUserCustom> findAll1(Pageable pageable);
    @Query(value = "SELECT sp.id, sp.ma_san_pham AS maSanPham, sp.anh_bia AS anhBia, sp.danh_muc AS danhMuc, " +
            "dm.ten AS tenDanhMuc, sp.mo_ta AS moTa, sp.ten, sp.thuong_hieu AS thuongHieu, th.ten AS tenThuongHieu, " +
            "sp.xuat_xu AS xuatXU, xx.ten AS tenXuatXu, MIN(spct.don_gia) AS min, MAX(spct.don_gia) AS max, " +
            "COALESCE(SUM(hdct.so_luong), 0) AS soLuongDaBan " +
            "FROM san_pham sp " +
            "LEFT JOIN san_pham_chi_tiet spct ON sp.id = spct.san_pham_id " +
            "LEFT JOIN hoa_don_chi_tiet hdct ON hdct.san_pham_chi_tiet_id = spct.id " +
            "LEFT JOIN danh_muc dm ON dm.id = sp.danh_muc " +
            "LEFT JOIN xuat_xu xx ON xx.id = sp.xuat_xu " +
            "LEFT JOIN thuong_hieu th ON th.id = sp.thuong_hieu " +
            "WHERE " +
            "( sp.danh_muc IN :danhMucList or :danhMucList1 is null ) " +
            "and (:thuongHieuList1 is null or sp.thuong_hieu IN :thuongHieuList) " +
            "and (:xuatXuList1 is null or sp.xuat_xu IN :xuatXuList) " +
            "and (:kichThuocList1 is null or spct.kich_thuoc IN :kichThuocList) " +
            "and (:mauSacList1 is null or spct.mau_sac IN :mauSacList) " +
            "and (:giaMin is null or :giaMin <= spct.don_gia) " +
            "and (:giaMax is null or spct.don_gia <= :giaMax) " +
            "GROUP BY sp.id, sp.ma_san_pham, sp.anh_bia, sp.danh_muc, dm.ten, sp.mo_ta, sp.ten, sp.thuong_hieu, sp.xuat_xu, xx.ten, th.ten " +
            "ORDER BY soLuongDaBan DESC", nativeQuery = true)
    List<SanPhamUserCustom> findAllFilter(
            @Param("danhMucList") List<Long> danhMucList,
            @Param("danhMucList1") List<Long> danhMucList1,
            @Param("thuongHieuList") List<Long> thuongHieuList,
            @Param("thuongHieuList1") List<Long> thuongHieuList1,
            @Param("xuatXuList") List<Long> xuatXuList,
            @Param("xuatXuList1") List<Long> xuatXuList1,
            @Param("kichThuocList") List<Long> kichThuocList,
            @Param("kichThuocList1") List<Long> kichThuocList1,
            @Param("mauSacList") List<Long> mauSacList,
            @Param("mauSacList1") List<Long> mauSacList1,
            @Param("giaMin") Long giaMin,
            @Param("giaMax") Long giaMax
    );

    @Query(value = "DECLARE @TuKhoa NVARCHAR(255)\n" +
            "SET @TuKhoa = :searchSanPham\n" +
            "DECLARE @TuKhoaTable TABLE (\n" +
            "    TuKhoa NVARCHAR(255)\n" +
            ")\n" +
            "INSERT INTO @TuKhoaTable (TuKhoa)\n" +
            "SELECT value\n" +
            "FROM STRING_SPLIT(@TuKhoa, N' ')\n" +
            "SELECT sp.id, sp.ma_san_pham AS maSanPham, sp.anh_bia AS anhBia, sp.danh_muc AS danhMuc,\n" +
            "dm.ten AS tenDanhMuc, sp.mo_ta AS moTa, sp.ten, sp.thuong_hieu AS thuongHieu, th.ten AS tenThuongHieu,\n" +
            "sp.xuat_xu AS xuatXU, xx.ten AS tenXuatXu, MIN(spct.don_gia) AS min, MAX(spct.don_gia) AS max,\n" +
            "COALESCE(SUM(hdct.so_luong), 0) AS soLuongDaBan\n" +
            "FROM \n" +
            "    san_pham sp\n" +
            "JOIN \n" +
            "    thuong_hieu th ON sp.thuong_hieu = th.id\n" +
            "JOIN \n" +
            "    xuat_xu xx ON sp.xuat_xu = xx.id\n" +
            "JOIN \n" +
            "    danh_muc dm ON sp.danh_muc = dm.id\n" +
            "LEFT JOIN \n" +
            "    san_pham_chi_tiet spct ON sp.id = spct.san_pham_id\n" +
            "LEFT JOIN hoa_don_chi_tiet hdct ON hdct.san_pham_chi_tiet_id = spct.id\n" +
            "LEFT JOIN \n" +
            "    kich_thuoc ks ON spct.kich_thuoc = ks.id\n" +
            "LEFT JOIN \n" +
            "    mau_sac ms ON spct.mau_sac = ms.id\n" +
            "WHERE \n" +
            "    EXISTS (\n" +
            "        SELECT 1\n" +
            "        FROM @TuKhoaTable tk\n" +
            "        WHERE \n" +
            "            sp.ten LIKE '%' + tk.TuKhoa + '%'\n" +
            "            OR th.ten LIKE '%' + tk.TuKhoa + '%'\n" +
            "            OR xx.ten LIKE '%' + tk.TuKhoa + '%'\n" +
            "            OR dm.ten LIKE '%' + tk.TuKhoa + '%'\n" +
            "            OR ISNULL(ks.gia_tri, '') LIKE '%' + tk.TuKhoa + '%'\n" +
            "            OR ms.ten LIKE '%' + tk.TuKhoa + '%'\n" +
            "    )\n" +
            "GROUP BY sp.id, sp.ma_san_pham, sp.anh_bia, sp.danh_muc, dm.ten, sp.mo_ta, sp.ten, sp.thuong_hieu, sp.xuat_xu, xx.ten, th.ten \n" +
            "ORDER BY soLuongDaBan DESC", nativeQuery = true)
    List<SanPhamUserCustom> searchSanPham(@Param("searchSanPham") String searchSanPham);

    @Query(value = "select COALESCE(SUM(san_pham_chi_tiet.so_luong), 0) from san_pham join san_pham_chi_tiet on san_pham_chi_tiet.san_pham_id=san_pham.id where san_pham.id =:id",nativeQuery = true)
    Integer getSL(Long id);


}
