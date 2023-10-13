package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "san_pham_thuong_hieu")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SanPhamThuongHieu {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "san_pham_id", referencedColumnName = "id")
    private SanPham sanPham;

    @ManyToOne(fetch = FetchType.EAGER) // chua ro lam
    @JoinColumn(name = "thuong_hieu_id", referencedColumnName = "id")
    private ThuongHieu thuongHieu;


}
