package com.example.datn404shoes.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "quyen", schema = "dbo", catalog = "ShopShoe")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Quyen {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "id", nullable = false)
    private long id;
    @Column(name = "ten")
    private String ten;
    @Column(name = "trang_thai")
    private Boolean trangThai;
    //
}