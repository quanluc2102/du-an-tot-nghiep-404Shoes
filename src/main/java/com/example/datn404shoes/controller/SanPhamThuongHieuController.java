package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.SanPhamThuongHieu;
import com.example.datn404shoes.service.serviceimpl.SanPhamServiceimpl;
import com.example.datn404shoes.service.serviceimpl.SanPhamThuongHieuServiceimpl;
import com.example.datn404shoes.service.serviceimpl.ThuongHieuServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("san_pham_thuong_hieu")
public class SanPhamThuongHieuController {
    @Autowired
    SanPhamThuongHieuServiceimpl sanPhamThuongHieuServiceimpl;
    @Autowired
    SanPhamServiceimpl sanPhamServiceimpl;
    @Autowired
    ThuongHieuServiceimpl thuongHieuServiceimpl;

    @GetMapping("index")
    public String index(Model model){
        model.addAttribute("SanPhamThuongHieu",new SanPhamThuongHieu());
        model.addAttribute("listSPTH",sanPhamThuongHieuServiceimpl.getAll());
        model.addAttribute("listTH",thuongHieuServiceimpl.getAll());
        model.addAttribute("listSP",sanPhamServiceimpl.getAll());

        model.addAttribute("view", "/san_pham_thuong_hieu/index.jsp");
        return "admin/index";
    }

    @GetMapping("create")
    public String create(Model model){
        model.addAttribute("SanPhamThuongHieu",new SanPhamThuongHieu());
        model.addAttribute("listSP",sanPhamServiceimpl.getAll());
        model.addAttribute("listTH",thuongHieuServiceimpl.getAll());
        model.addAttribute("view", "/san_pham_thuong_hieu/addNew.jsp");
        return "admin/index";
    }

    @PostMapping("add")
    public String add(Model model,
                      @ModelAttribute("SanPhamThuongHieu") SanPhamThuongHieu sanPhamThuongHieu){
        sanPhamThuongHieuServiceimpl.add(sanPhamThuongHieu);
        return "redirect:/san_pham_thuong_hieu/index";
    }

    @GetMapping("delete")
    public String delete(Model model,
                         @RequestParam("id") Long id){
        sanPhamThuongHieuServiceimpl.delete(id);
        return "redirect:/san_pham_thuong_hieu/index";
    }

    @GetMapping("detail")
    public String detail(Model model,
                         @RequestParam("id") Long id){
        model.addAttribute("listSP",sanPhamServiceimpl.getAll());
        model.addAttribute("listTH",thuongHieuServiceimpl.getAll());
        model.addAttribute("SanPhamThuongHieu",sanPhamThuongHieuServiceimpl.getOne(id));
        model.addAttribute("spth",sanPhamThuongHieuServiceimpl.getOne(id));
        model.addAttribute("listSPTH",sanPhamThuongHieuServiceimpl.getAll());
        model.addAttribute("view", "/san_pham_thuong_hieu/index.jsp");
        return "admin/index";
    }

    @PostMapping("update/{id}")
    public String update(Model model,
                         @PathVariable("id") Long id,
                         @ModelAttribute("SanPhamThuongHieu") SanPhamThuongHieu sanPhamThuongHieu){
        sanPhamThuongHieuServiceimpl.detail(id,sanPhamThuongHieu);
        return "redirect:/san_pham_thuong_hieu/index";
    }
}
