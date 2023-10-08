package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Date;

@Entity
@Table(name = "san_pham_chi_tiet")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class SanPhamChiTiet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "ngay_tao")
    private Date ngayTao;

    @Column(name = "ngay_cap_nhat")
    private Date ngayCapNhat;

    @Column(name = "trang_thai")
    private Integer trangThai;

    @Column(name = "so_luong")
    private Integer soLuong;

    @ManyToOne(fetch = FetchType.EAGER) // chua ro lam
    @JoinColumn(name = "kich_thuoc_mau_sac_id", referencedColumnName = "id")
    private KichThuocMauSac kichThuocMauSacId;

    @ManyToOne(fetch = FetchType.EAGER) // chua ro lam
    @JoinColumn(name = "san_pham_id", referencedColumnName = "id")
    private SanPham sanPhamId;

}
