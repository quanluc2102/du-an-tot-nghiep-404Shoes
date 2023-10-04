package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "kich_thuoc_mau_sac")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class KichThuocMauSac {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id")
    private long id;
    @Column(name = "so_luong")
    private int soLuong;
    @Column(name = "trang_thai")
    private int trangThai;

    @ManyToOne()
    @JoinColumn(
            name = "mau_sac_id",
            referencedColumnName = "id",
            nullable = true
    )
    private MauSac mauSac;


    @ManyToOne()
    @JoinColumn(
            name = "san_pham_id",
            referencedColumnName = "id",
            nullable = true
    )
    private SanPham sanPham;


    @ManyToOne()
    @JoinColumn(
            name = "kich_thuoc_id",
            referencedColumnName = "id",
            nullable = true
    )
    private KichThuoc kichThuoc;

    public void setMauSacex(long numericCellValue) {
        mauSac.setId(numericCellValue);
    }


    public void setSanPhamex(long numericCellValue) {
        sanPham.setId(numericCellValue);

    }

    public void setKichThuocex(long numericCellValue) {
        kichThuoc.setId(numericCellValue);

    }


}