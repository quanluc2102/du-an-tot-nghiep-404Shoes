package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.KhuyenMai;
import com.example.datn404shoes.entity.SanPham;
import com.example.datn404shoes.entity.SanPhamKhuyenMai;
import com.example.datn404shoes.service.serviceimpl.KhuyenMaiServiceImpl;
import com.example.datn404shoes.service.serviceimpl.SanPhamKhuyenMaiServiceImpl;
import com.example.datn404shoes.service.serviceimpl.SanPhamServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping("/san_pham_khuyen_mai")
public class SanPhamKhuyenMaiController {
    @Autowired
    private SanPhamKhuyenMaiServiceImpl sanPhamKhuyenMaiServiceImpl;
    @Autowired
    SanPhamServiceimpl sanPhamServiceimpl;
    @Autowired
    KhuyenMaiServiceImpl khuyenMaiServiceimpl;
    @GetMapping("/index")
    public String hienThi(Model model){
        List<SanPhamKhuyenMai> list = sanPhamKhuyenMaiServiceImpl.getAll();
        List<SanPham>listSanPham = sanPhamServiceimpl.getAll();
        List<KhuyenMai>listKhuyenMai = khuyenMaiServiceimpl.getAll();
        model.addAttribute("listSPKM",list);
        model.addAttribute("listSP",listSanPham);
        model.addAttribute("listKM",listKhuyenMai);
        model.addAttribute("view", "/san_pham_khuyen_mai/index.jsp");
        return "admin/index";

    }
    @GetMapping("/create")
    public String create(Model model){
        List<SanPham>listSanPham = sanPhamServiceimpl.getAll();
        List<KhuyenMai>listKhuyenMai = khuyenMaiServiceimpl.getAll();
        model.addAttribute("listSP",listSanPham);
        model.addAttribute("listKM",listKhuyenMai);
        model.addAttribute("view", "/san_pham_khuyen_mai/add.jsp");
        return "admin/index";
    }
    @GetMapping("/xoa/{id}")
    public String xoa(Model model,
                      @PathVariable("id")Long id){
        sanPhamKhuyenMaiServiceImpl.delete(id);
        return "redirect:/san_pham_khuyen_mai/index";
    }
    @PostMapping("/add")
    public String add(Model model,
                      @RequestParam("sanPhamId")SanPham sanPhamId,
                      @RequestParam("khuyenMaiId")KhuyenMai khuyenMaiId){
    SanPhamKhuyenMai spkm = new SanPhamKhuyenMai();
    spkm.setSanPhamId(sanPhamId);
    spkm.setKhuyenMaiId(khuyenMaiId);
    sanPhamKhuyenMaiServiceImpl.add(spkm);
        return "redirect:/san_pham_khuyen_mai/index";

    }
    @GetMapping("/detail/{id}")
    public String detail(Model model,
                      @PathVariable("id")Long id){
        Optional<SanPhamKhuyenMai>spkm = sanPhamKhuyenMaiServiceImpl.detail(id);
        List<SanPhamKhuyenMai> list = sanPhamKhuyenMaiServiceImpl.getAll();
        List<SanPham>listSanPham = sanPhamServiceimpl.getAll();
        List<KhuyenMai>listKhuyenMai = khuyenMaiServiceimpl.getAll();
        model.addAttribute("listSPKM",list);
        model.addAttribute("listSP",listSanPham);
        model.addAttribute("listKM",listKhuyenMai);
        model.addAttribute("spkm",spkm.get());
        model.addAttribute("view","/san_pham_khuyen_mai/index.jsp");
        return "admin/index";

    }
    @PostMapping("/update/{id}")
    public String update(Model model,
                      @PathVariable("id")Long id,
                      @RequestParam("sanPhamId")SanPham sanPhamId,
                      @RequestParam("khuyenMaiId")KhuyenMai khuyenMaiId){
        SanPhamKhuyenMai spkm = new SanPhamKhuyenMai();
        spkm.setId(id);
        spkm.setSanPhamId(sanPhamId);
        spkm.setKhuyenMaiId(khuyenMaiId);
        sanPhamKhuyenMaiServiceImpl.add(spkm);
        return "redirect:/san_pham_khuyen_mai/index";

    }
}
