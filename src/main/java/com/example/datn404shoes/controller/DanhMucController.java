package com.example.datn404shoes.controller;

import com.example.datn404shoes.entity.DanhMuc;
import com.example.datn404shoes.service.serviceimpl.DanhMucServiceimpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("danh_muc")
public class DanhMucController {
    @Autowired
    DanhMucServiceimpl serviceimpl;
    @GetMapping("index")
    public String index(Model model){
        model.addAttribute("listDM",serviceimpl.getAll());
        model.addAttribute("DanhMuc",new DanhMuc());
        model.addAttribute("view", "/danh_muc/index.jsp");
        return "admin/index";
    }
    @PostMapping("add")
    public String add(Model model,
                      @RequestParam("ten") String ten,
                      @RequestParam("trangThai") Integer trangThai){
        DanhMuc danhMuc = new DanhMuc(ten,trangThai);
        serviceimpl.add(danhMuc);
        return "redirect:/danh_muc/index";
    }
    @GetMapping("delete")
    public String delete(Model model,
                         @RequestParam("id")Long id){
        serviceimpl.delete(id);
        return "redirect:/danh_muc/index";
    }
    @GetMapping("detail")
    public String detail(Model model,
                         @RequestParam("id")Long id){
        model.addAttribute("listDM",serviceimpl.getAll());
        model.addAttribute("dm",serviceimpl.getOne(id));
        model.addAttribute("DanhMuc",serviceimpl.getOne(id));
        model.addAttribute("view", "/danh_muc/index.jsp");
        return "admin/index";
    }
    @PostMapping("update/{id}")
    public String update(Model model,
                         @PathVariable("id")Long id,
                         @ModelAttribute("DanhMuc") DanhMuc danhMuc){
        serviceimpl.update(id,danhMuc);
        return "redirect:/danh_muc/index";
    }
//    <div class="tab-content pt-2" id="myTabContent">
//                            <div class="tab-pane fade show active" id="home" role="tabpanel"
//                                 aria-labelledby="home-tab">
//                                <form:form method="post" action="update/${dm.id}" modelAttribute="DanhMuc">
//                                    <div>
//                                        <label>Tên</label>
//                                        <form:input path="ten" cssClass="form-control"></form:input>
//                                    </div>
//                                    <div>
//                                        <label>Giá nhập</label>
//                                        <form:radiobutton path="trangThai" value="1" label="Active"></form:radiobutton>
//                                        <form:radiobutton path="trangThai" value="0" label="Inactive"></form:radiobutton>
//                                    </div>
//                                    <div>
//                                        <form:button>UPdate</form:button>
//                                    </div>
//                                </form:form>
//                            </div>
//
//
//                            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
//                                <form method="post" action="add">
//                                    <div>
//                                        <label>Tên</label>
//                                        <input name="ten" class="form-control" type="text"></input>
//                                    </div>
//                                    <div>
//                                        <label>Giá nhập</label>
//                                        <input type="radio" name="trangThai" value="1" >Active
//                                        <input type="radio" name="trangThai" value="0" >Inactive
//                                    </div>
//                                    <div>
//                                        <form:button>Thêm</form:button>
//                                    </div>
//                                </form>
//                            </div>
//
//                            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
//                                <form class="row g-3" action="update/${dm.id}" method="post">
//                                    <div class="form-group">
//                                        Tên danh mục : ${dm.ten}
//                                    </div>
//                                    <div class="form-group">
//                                        Trạng thái : ${dm.layTrangThai()}
//                                    </div>
//                                </form><!-- End Multi Columns Form -->
//                            </div>
//                        </div>
}
