package com.example.datn404shoes.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "kich_thuoc")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class KichThuoc {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private long id;

    @Column(name = "gia_tri")
    private int giaTri;

    @Column(name = "trang_thai")
    private Boolean trangThai;


}
