package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.ThuongHieu;
import com.example.datn404shoes.service.serviceimpl.ThuongHieuServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("thuong_hieu")
public class ThuongHIeuController {
    @Autowired
    ThuongHieuServiceimpl serviceimpl;
    @GetMapping("index")
    public String index(Model model){
        model.addAttribute("listTH",serviceimpl.getAll());
        model.addAttribute("ThuongHieu",new ThuongHieu());
        model.addAttribute("view", "/thuong_hieu/index.jsp");
        return "admin/index";
    }
    @PostMapping("add")
    public String add(Model model,
                      @RequestParam("ten") String ten,
                      @RequestParam("trangThai") Boolean trangThai){
        ThuongHieu thuongHieu = new ThuongHieu(ten,trangThai);
        serviceimpl.add(thuongHieu);
        return "redirect:/thuong_hieu/index";
    }
    @GetMapping("delete")
    public String delete(Model model,
                         @RequestParam("id")Long id){
        serviceimpl.delete(id);
        return "redirect:/thuong_hieu/index";
    }
    @GetMapping("detail")
    public String detail(Model model,
                         @RequestParam("id")Long id){
        model.addAttribute("listTH",serviceimpl.getAll());
        model.addAttribute("th",serviceimpl.getOne(id));
        model.addAttribute("ThuongHieu",serviceimpl.getOne(id));
        model.addAttribute("view", "/thuong_hieu/index.jsp");
        return "admin/index";
    }
    @PostMapping("update/{id}")
    public String update(Model model,
                         @PathVariable("id")Long id,
                         @ModelAttribute("ThuongHieu") ThuongHieu thuongHieu){
        serviceimpl.update(id,thuongHieu);
        return "redirect:/thuong_hieu/index";
    }
}
