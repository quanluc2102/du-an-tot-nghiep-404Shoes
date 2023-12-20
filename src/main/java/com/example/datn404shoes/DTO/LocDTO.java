package com.example.datn404shoes.DTO;


import lombok.Data;

import java.util.List;
@Data
public class LocDTO {
    private List<Long> danhMuc;
    private List<Long> thuongHieu;
    private List<Long> xuatXu;
    private List<Long> kichThuoc;
    private List<Long> mauSac;

    public boolean isAnyFilterApplied() {
        // Thực hiện kiểm tra xem có bất kỳ bộ lọc nào được áp dụng không
        return danhMuc != null && !danhMuc.isEmpty() ||
                thuongHieu != null && !thuongHieu.isEmpty() ||
                xuatXu != null && !xuatXu.isEmpty() ||
                kichThuoc != null && !kichThuoc.isEmpty() ||
                mauSac != null && !mauSac.isEmpty();
    }
}
