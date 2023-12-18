function luu_mat_khau(){
    var mat_khau_hien_tai = document.getElementById('password');
    var mat_khau_moi = document.getElementById('new_password');
    var nhap_lai_mat_khau = document.getElementById('nhap_lai_password');
    if( mat_khau_hien_tai.value === "" || mat_khau_moi.value === "" || nhap_lai_mat_khau.value === ""){
        alert("Hãy nhập đầy đủ thông tin");
    }else{
        var Account = JSON.parse(localStorage.getItem("Taikhoandangtruycap"));
        if(Account.Password === mat_khau_hien_tai.value){
            if(mat_khau_moi.value === nhap_lai_mat_khau.value){
                Account.Password = mat_khau_moi.value;
                const Account_new = {
                    Tendangnhap: Account.Tendangnhap,
                    Password: Account.Password
                }
                localStorage.setItem('Taikhoandangtruycap', JSON.stringify(Account_new));
                alert("Bạn đã đổi mật khẩu thành công");
                mat_khau_hien_tai.value = ""; 
                mat_khau_moi.value = "";
                nhap_lai_mat_khau.value = "";
            }else{
                alert("Nhập lại mật khẩu không trùng với mật khẩu mới");
            }
        }else{
            alert("Mật khẩu hiện tại không đúng");
        }
    }
}