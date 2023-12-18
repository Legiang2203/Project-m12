// Hàm để Tạo bảng để lưu trữ câu hỏi và render câu hỏi và câu trả lời xuống bảng
var dsQues = document.querySelector("#show-kq tbody");
var Account = JSON.parse(localStorage.getItem("Taikhoandangtruycap"));

var takelocol = JSON.parse(localStorage.getItem('Câu hỏi'));
takelocol = takelocol ? takelocol : [];

function renderQuestion(){
    dsQues.innerHTML="";

    if(takelocol.length === 0){
        dsQues.innerHTML = "<tr><td colspan='8' style='text-align:center'>Không có dữ liệu câu hỏi</td></tr>";
    }else{
        var hasUser = takelocol.find(key => key.Nguoigui === Account.Tendangnhap);
        if(hasUser){
            var duyecauhoi = 1;
            takelocol.forEach((key, i) => {
                if(key.Nguoigui === Account.Tendangnhap){
                    const row = document.createElement("tr");
                    row.innerHTML =`
                    <td>${duyecauhoi}</td>
                    <td>${key.Question}</td>
                    <td>${key.AnswerCollect.join(' - ')}</td>
                    <td id="duyet">${key.Trangthai}</td>
                    <td>
                        <button type="button" id="edit_${i}" onclick="sua(${i})">Sửa</button>
                        <button type="button" id="delete_${i}" onclick="xoa(${i})">Xóa</button>
                        <button type="button" id="xem_chi_tiet_${i}" onclick=xem_chi_tiet(${i})>Xem chi tiết</button>
                    </td> `;
        
                    dsQues.appendChild(row);
                    duyecauhoi++;
                }
            })
        }else{
            dsQues.innerHTML = "<tr><td colspan='8' style='text-align:center'>Không có dữ liệu câu hỏi</td></tr>";
        }
    }
}

// -------------------------------------------------------------------------------
//Lắng nghe sự kiện khi Load trang và khi chọn option phù hợp với câu trả lời
addEventListener('DOMContentLoaded', function(){
    hideALL();
    renderQuestion();
    disablebutton();
});

document.querySelector(".OptionQues > select").addEventListener('change', function(){
    clear();
    hideALL();
    
    var selectOption = document.querySelector(".OptionQues > select").value;
    if(selectOption === "Option_dienDA"){
        document.querySelector(".dienDA").style.display="block";
        document.getElementById('save').style.display="block";
    } else if(selectOption === "Option_motDA"){
        document.querySelector(".motDA").style.display="block";
        document.getElementById('save').style.display="block";
    } else if(selectOption === "Option_nDA"){
        document.querySelector(".nDA").style.display="block";
        document.getElementById('save').style.display="block";
    }
});   

// ----------------------------------------------------------------------------------
//Lắng nghe sự kiện với dạng chọn nhiều đáp án 
document.getElementById("Option_nDA").addEventListener('input', function(){
    var Option = parseInt(this.value);
    var phanDA = document.querySelector('.show_nDA');
    phanDA.innerHTML ='';
    
    for(var i = 0; i < Option; i++) {
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'nDA';
        input.id = 'nDA'+ i;
        input.className = "nDA";

        var textarea = document.createElement('textarea');
        textarea.placeholder = 'Đáp án số ' + (i + 1);
        textarea.id = "nDA_" + i;

        var div = document.createElement('div');
        div.appendChild(input);
        div.appendChild(textarea);

        phanDA.appendChild(div);
    }
});

//Lắng nghe sự kiện với dạng chọn một đáp án
document.getElementById("Option_motDA").addEventListener('input', function(){
    var Option = parseInt(this.value);
    var phanDA = document.querySelector('.show_motDA');
    phanDA.innerHTML ='';
    
    for(var i = 0; i < Option; i++) {
        var input = document.createElement('input');
        input.type = 'radio';
        input.name = 'mDA';
        input.id = 'motDA' + i;
        input.className = i;

        var textarea = document.createElement('textarea');
        textarea.placeholder = 'Đáp án số ' + (i + 1);
        textarea.id = "motDA_" + i;
        

        var div = document.createElement('div');    
        div.appendChild(input);
        div.appendChild(textarea);

        phanDA.appendChild(div);
    }
});

// --------------------------------------------------------------------------
//Hàm lấy những đáp án đúng
function collect() {

    var selectAnswer = [];

    if(document.getElementById('loaiDA').value === 'Option_dienDA'){
        var fill = document.getElementById('diendapan').value.trim();
        if(fill !== ""){
            selectAnswer.push(fill);
        }
    }else if(document.getElementById('loaiDA').value === 'Option_motDA') {
        var radiobuttons = document.querySelectorAll('.motDA input[type="radio"]');
        radiobuttons.forEach(function(radio, i){
            if (radio.checked) {
                var text = document.getElementById('motDA_' + i).value;
                selectAnswer.push(text);
            }
        })
    }else if(document.getElementById('loaiDA').value === 'Option_nDA'){
        var checkboxes = document.querySelectorAll('.nDA input[type="checkbox"]');
        checkboxes.forEach(function(checkbox, i){
            if (checkbox.checked) {
                var text = document.getElementById('nDA_' + i).value;
                selectAnswer.push(text);
            }
        })
    }
    return selectAnswer;
}

//hàm kiểm tra xem đã nhập đủ chưa
function Kiem_tra_ans() {
    if(document.getElementById('loaiDA').value === 'Option_dienDA'){
        return true;
    }else if(document.getElementById('loaiDA').value === 'Option_motDA') {
        var radiobuttons = document.querySelectorAll('.motDA input[type="radio"]');
        for( var i = 0; i < radiobuttons.length; i++){
            var text = document.getElementById('motDA_' + i).value.trim();
            if(text === ""){
                alert("Hãy nhập đủ câu trả lời");
                return false;
            }   
        }
        return true;
    }else if(document.getElementById('loaiDA').value === 'Option_nDA'){
        var checkboxes = document.querySelectorAll('.nDA input[type="checkbox"]');
        for( var i = 0; i < checkboxes.length; i++){
            var text = document.getElementById('nDA_' + i).value.trim();
            if(text === ""){
                alert("Hãy nhập đủ câu trả lời");
                return false;
            }   
        }
        return true;
    }
}

function Kiem_tra_checked() {
    if(document.getElementById('loaiDA').value === 'Option_dienDA'){
        const fill = document.getElementById('diendapan').value.trim();
        if(fill === ""){
            alert("Hãy nhập câu đủ trả lời");
            return false;
        }
        return true;
    }else if(document.getElementById('loaiDA').value === 'Option_motDA') {
        const radiobuttons = document.querySelectorAll('.motDA input[type="radio"]');
        if(radiobuttons.length === 0){
            alert("Hãy tạo ít nhất 2 đáp án");
            return false;
        }

        // if(!radiobuttons.find(radio => radio.checked)){
        //     alert("Hãy chọn một đáp án đúng");
        //     return false;
        // }

        return true;

    }else if(document.getElementById('loaiDA').value === 'Option_nDA'){
        const checkboxes = document.querySelectorAll('.nDA input[type="checkbox"]');
        if(checkboxes.length === 0){
            alert("Hãy tạo ít nhất 2 đáp án");
            return false;
        }

        // const check_box = checkboxes.find(radio => radio.checked);
        // if(!check_box){
        //     alert("Hãy chọn ít nhất một đáp án đúng ");
        //     return false;
        // }
        return true;
    }
}
// ------------------------------------------------------------------------------
//Hàm lưu kết quả vào localstoges và chuyển câu hỏi xuống bảng
document.getElementById('save').addEventListener('click', function() {
    if(document.getElementById("Cauhoi").value === ""){
        alert("Hãy nhập đầy đủ nội dung");
    }else{
        if(Kiem_tra_ans()&& Kiem_tra_checked()){
            if(confirm("Bạn chắc chắn thêm câu hỏi chứ? ")){
                var Account = JSON.parse(localStorage.getItem('Taikhoandangtruycap'));
                var questionObject = {
                    Question: document.getElementById('Cauhoi').value,
                    Time: new Date().toLocaleString(),
                    Trangthai: 'Chờ duyệt',
                    Nguoigui: Account.Tendangnhap
                }
                //luu toan bo cau trả lời
                if (document.getElementById('loaiDA').value === 'Option_dienDA') {
                    questionObject.LoaiCauhoi = "Điền đáp án";
                    questionObject.Answer = collect();
                    questionObject.AnswerCollect = collect();
                } else if (document.getElementById('loaiDA').value === 'Option_motDA') {
    
                    const numOpt = parseInt(document.getElementById('Option_motDA').value);
                    const optionAnswer = [];
                    for (var i = 0; i < numOpt; i++) {
                        optionAnswer.push(document.getElementById('motDA_' + i).value);
                    }
                    questionObject.Answer = optionAnswer;
                    questionObject.AnswerCollect = collect();
                    questionObject.LoaiCauhoi = "Một đáp án";
                    questionObject.SoluongDapAn = numOpt;
    
                } else if (document.getElementById('loaiDA').value === 'Option_nDA') {
    
                    const numOpt = parseInt(document.getElementById('Option_nDA').value);
                    const optionAnswer = [];
                    for (var i = 0; i < numOpt; i++) {
                        optionAnswer.push(document.getElementById('nDA_' + i).value);
                    }
                    questionObject.Answer = optionAnswer;
                    questionObject.AnswerCollect = collect();
                    questionObject.LoaiCauhoi = "Nhiều đáp án";
                    questionObject.SoluongDapAn = numOpt;
                }
    
                takelocol.push(questionObject);
                localStorage.setItem('Câu hỏi', JSON.stringify(takelocol));
                renderQuestion();
                clear();
                disablebutton();
            }
        }
    }
})

// -------------------------------------------------------------------------------
var editIndex = -1;
function sua(index){
    if(takelocol[index].Trangthai === "Đã duyệt" || takelocol[index].Trangthai === "Không được duyệt" ){
        alert("Câu hỏi đã được phản ánh, bạn không thể sửa câu hỏi");
    }else{
        if(confirm("Bạn muốn sửa câu hỏi ?")){
            editIndex = index;
        
            var question = takelocol[index];
    
            document.getElementById("Cauhoi").value = question.Question;
    
            hideALL();
            
            if(question.LoaiCauhoi =="Điền đáp án") {
                document.querySelector(".dienDA").style.display="block";
                document.getElementById('loaiDA').value = 'Option_dienDA';
                document.getElementById('diendapan').value = question.Answer;
    
            }else if(question.LoaiCauhoi === "Một đáp án") {
                document.querySelector(".motDA").style.display="block";
                document.getElementById('loaiDA').value = 'Option_motDA';
                document.getElementById('Option_motDA').value = question.SoluongDapAn;
                var Soluong = question.SoluongDapAn;
                var phanDA = document.querySelector('.show_motDA');
                phanDA.innerHTML = '';
    
                for(var i = 0; i < Soluong; i++) {
                    var input = document.createElement('input');
                    input.type = 'radio';
                    input.name = 'mDA';
                    input.id = 'motDA' + i;
            
                    var textarea = document.createElement('textarea');
                    textarea.placeholder = 'Đáp án số ' + (i + 1);
                    textarea.id = "motDA_" + i;
            
                    var div = document.createElement('div');
                    div.appendChild(input);
                    div.appendChild(textarea);
            
                    phanDA.appendChild(div);
                }
            }else if(question.LoaiCauhoi === "Nhiều đáp án"){
                document.querySelector(".nDA").style.display="block";
                document.getElementById('loaiDA').value = 'Option_nDA';
                document.getElementById('Option_nDA').value = question.SoluongDapAn;
                var Soluong = question.SoluongDapAn;
                var phanDA = document.querySelector('.show_nDA');
                phanDA.innerHTML = '';
    
                for(var i = 0; i < Soluong; i++) {
                    var input = document.createElement('input');
                    input.type = 'checkbox';
                    input.name = 'nDA';
                    input.id = 'nDA'+ i;
            
                    var textarea = document.createElement('textarea');
                    textarea.placeholder = 'Đáp án số ' + (i + 1);
                    textarea.id = "nDA_" + i;
            
                    var div = document.createElement('div');
                    div.appendChild(input);
                    div.appendChild(textarea);
            
                    phanDA.appendChild(div);
                }
            }
    
            // Ẩn nút "Lưu" và hiển thị nút "Cập nhật"
            document.getElementById("save").style.display = "none";
            document.getElementById("capnhat").style.display = "block";
        }
    }
};


//hàm khi bấm nút cập nhật
document.getElementById("capnhat").addEventListener('click', function(){
    if(Kiem_tra_ans()&& Kiem_tra_checked()){
        if(editIndex !== -1){
            var questionObject = {
                Question: document.getElementById('Cauhoi').value,
                Time:  new Date().toLocaleString(),
                Trangthai: 'Chờ duyệt',
                Nguoigui: Account.Tendangnhap
            }
    
        //luu toan bo cau trả lời
            if (document.getElementById('loaiDA').value === 'Option_dienDA') {
                questionObject.LoaiCauhoi = "Điền đáp án";
                questionObject.Answer = collect();
                questionObject.AnswerCollect = collect();
        
            } else if (document.getElementById('loaiDA').value === 'Option_motDA') {
        
                const numOpt = parseInt(document.getElementById('Option_motDA').value);
                const optionAnswer = [];
                for (var i = 0; i < numOpt; i++) {
                    optionAnswer.push(document.getElementById('motDA_' + i).value);
                }
                questionObject.Answer = optionAnswer;
                questionObject.AnswerCollect = collect();
                questionObject.LoaiCauhoi = "Một đáp án";
                questionObject.SoluongDapAn = numOpt;
        
            } else if (document.getElementById('loaiDA').value === 'Option_nDA') {
        
                const numOpt = parseInt(document.getElementById('Option_nDA').value);
                const optionAnswer = [];
                for (var i = 0; i < numOpt; i++) {
                    optionAnswer.push(document.getElementById('nDA_' + i).value);
                }
                questionObject.Answer = optionAnswer;
                questionObject.AnswerCollect = collect();
                questionObject.LoaiCauhoi = "Nhiều đáp án";
                questionObject.SoluongDapAn = numOpt;
            }
        
            takelocol[editIndex] = questionObject;
            localStorage.setItem('Câu hỏi',JSON.stringify(takelocol)) ;
            renderQuestion();
            clear();
            hideALL();
            disablebutton();
        
            editIndex= -1;
        }
    }
})


//Hàm ẩn các loại đáp án
function hideALL(){
    document.getElementById('capnhat').style.display="none";
    document.querySelectorAll(".dienDA, .motDA, .nDA").forEach(function(a){
        a.style.display = "none";
    });
}

//Hàm "reset lại phần thêm câu hỏi khi add Question"
function clear(){
    document.getElementById("Cauhoi").value="";
    document.getElementById("diendapan").value="";
    document.getElementById("Option_nDA").value= "";
    document.getElementById("Option_motDA").value= "";
}


// hàm xóa câu hỏi
function xoa(i){
    if(takelocol[i].Trangthai === "Đã duyệt" || takelocol[i].Trangthai === "Không được duyệt" ){
        alert("Câu hỏi đã được phản ánh, bạn không thể xóa câu hỏi");
    }else{
        if(confirm("Bạn muốn xóa câu hỏi này? ")){
            takelocol.splice(i,1);
            localStorage.setItem('Câu hỏi', JSON.stringify(takelocol));
            renderQuestion();
        }
    }
}

//hàm disable 2 nút sửa và xóa
function disablebutton(){
    for(var i = 0; i < takelocol.length; i++){
        if(takelocol[i].Trangthai == "Đã duyệt" || takelocol[i].Trangthai == "Không được duyệt"){
            var button_edit = document.getElementById(`edit_${i}`);
            button_edit.style.boxShadow = "none";
            button_edit.style.background ="lightgray";
            button_edit.style.color ="black";
            button_edit.style.border ="1px solid black";

            var button_delete = document.getElementById(`delete_${i}`);
            button_delete.style.boxShadow = "none";
            button_delete.style.background ="rgb(221 129 129)";
            button_delete.style.color ="black";
            button_delete.style.border ="1px solid black";
        }
    }
}



