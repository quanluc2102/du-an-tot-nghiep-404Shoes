package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.*;


@Entity
@Table(name = "san_pham_khuyen_mai")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SanPhamKhuyenMai {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.EAGER) // 1 san pham co nhieu loai khuyen mai
    @JoinColumn(name = "san_pham_id", referencedColumnName = "id")
    private SanPham sanPhamId;

    @ManyToOne(fetch = FetchType.EAGER) // 1 khuyen mai co nhieu san pham
    @JoinColumn(name = "khuyen_mai_id", referencedColumnName = "id")
    private KhuyenMai khuyenMaiId;

}
