package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.SanPhamDanhMuc;
import com.example.datn404shoes.service.serviceimpl.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("san_pham_danh_muc")
public class SanPhamDanhMucController {
    @Autowired
    SanPhamDanhMucServiceimpl sanPhamDanhMucServiceimpl;
    @Autowired
    SanPhamServiceimpl sanPhamServiceimpl;
    @Autowired
    DanhMucServiceimpl danhMucServiceimpl;

    @GetMapping("index")
    public String index(Model model){
        model.addAttribute("listSPDM",sanPhamDanhMucServiceimpl.getAll());
        model.addAttribute("SanPhamDanhMuc",new SanPhamDanhMuc());
        model.addAttribute("listSP",sanPhamServiceimpl.getAll());
        model.addAttribute("listDM",danhMucServiceimpl.getAll());
        model.addAttribute("view", "/san_pham_danh_muc/index.jsp");
        return "admin/index";
    }

    @GetMapping("create")
    public String create(Model model){
        model.addAttribute("SanPhamDanhMuc",new SanPhamDanhMuc());
        model.addAttribute("listSP",sanPhamServiceimpl.getAll());
        model.addAttribute("listDM",danhMucServiceimpl.getAll());
        model.addAttribute("view", "/san_pham_danh_muc/addNew.jsp");
        return "admin/index";
    }

    @GetMapping("create_multi")
    public String createMulti(Model model){
        model.addAttribute("SanPhamDanhMuc",new SanPhamDanhMuc());
        model.addAttribute("listSP",sanPhamServiceimpl.getAll());
        model.addAttribute("listDM",danhMucServiceimpl.getAll());
        model.addAttribute("view", "/san_pham_danh_muc/addMulti.jsp");
        return "admin/index";
    }

    @PostMapping("add")
    public String add(Model model,
                      @ModelAttribute("SanPhamDanhMuc") SanPhamDanhMuc sanPhamDanhMuc){
        sanPhamDanhMucServiceimpl.add(sanPhamDanhMuc);
        return "redirect:/san_pham_danh_muc/index";
    }

    @PostMapping("add_multi")
    public String addMulti(Model model,
                      @ModelAttribute("SanPhamDanhMuc") SanPhamDanhMuc sanPhamDanhMuc,
                           @RequestParam("sanPham") String sanPham){
        String[] sp = sanPham.split(",");
        for(String a:sp){
            SanPhamDanhMuc b = new SanPhamDanhMuc();
            b.setSanPham(sanPhamServiceimpl.getOne(Long.valueOf(a)));
            b.setDanhMuc(sanPhamDanhMuc.getDanhMuc());
            sanPhamDanhMucServiceimpl.add(b);
        }
        return "redirect:/san_pham_danh_muc/index";
    }

    @GetMapping("delete")
    public String delete(Model model,
                         @RequestParam("id") Long id){
        sanPhamDanhMucServiceimpl.delete(id);
        return "redirect:/san_pham_danh_muc/index";
    }

    @GetMapping("detail")
    public String detail(Model model,
                         @RequestParam("id") Long id){
        model.addAttribute("listSP",sanPhamServiceimpl.getAll());
        model.addAttribute("listDM",danhMucServiceimpl.getAll());
        model.addAttribute("SanPhamDanhMuc",sanPhamDanhMucServiceimpl.getOne(id));
        model.addAttribute("spdm",sanPhamDanhMucServiceimpl.getOne(id));
        System.out.println(sanPhamDanhMucServiceimpl.getOne(id).getSanPham().getTen());
        model.addAttribute("listSPDM",sanPhamDanhMucServiceimpl.getAll());
        model.addAttribute("view", "/san_pham_danh_muc/index.jsp");
        return "admin/index";
    }

    @PostMapping("update/{id}")
    public String update(Model model,
                         @PathVariable("id") Long id,
                         @ModelAttribute("SanPhamDanhMuc") SanPhamDanhMuc sanPhamDanhMuc){
        sanPhamDanhMucServiceimpl.detail(id,sanPhamDanhMuc);
        return "redirect:/san_pham_danh_muc/index";
    }
}
