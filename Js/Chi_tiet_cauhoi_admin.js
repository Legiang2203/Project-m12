function xem_chi_tiet(i){
    var Account = JSON.parse(localStorage.getItem("Câu hỏi"));
    document.querySelector(".showCH").style.display = "block";
    document.getElementById("xem_chi_tiet_loai_cau_hoi").innerHTML = Account[i].LoaiCauhoi;
    document.getElementById("xem_chi_tiet_time").innerHTML = Account[i].Time;
    document.getElementById("xem_chi_tiet_cau_hoi").innerHTML = Account[i].Question;
    document.getElementById("xem_chi_tiet_dap_an").innerHTML = Account[i].Answer.join(" - ");
    document.getElementById("xem_chi_tiet_dap_an_dung").innerHTML = Account[i].AnswerCollect;
    document.getElementById("xem_chi_tiet_trang_thai").innerHTML = Account[i].Trangthai;
    document.getElementById("xem_chi_tiet_nguoi_gui").innerHTML = Account[i].Nguoigui;
}

function thoat(){
    document.querySelector(".showCH").style.display = "none";
}
