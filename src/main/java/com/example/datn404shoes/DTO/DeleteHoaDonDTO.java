package com.example.datn404shoes.DTO;
import com.example.datn404shoes.entity.HoaDonChiTiet;
import lombok.*;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class DeleteHoaDonDTO {

    private List<HoaDonChiTiet> listHoaDonChiTiet;
}
