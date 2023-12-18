// Hàm để Tạo bảng để lưu trữ câu hỏi và render câu hỏi và câu trả lời xuống bảng
var takelocol = localStorage.getItem('Câu hỏi');
takelocol = takelocol ? JSON.parse(takelocol) : [];

var dsQues = document.querySelector("#show-kq tbody");
function renderQues(){
    dsQues.innerHTML="";

    if(takelocol.length === 0){
        dsQues.innerHTML = "<tr><td colspan='9' style='text-align:center'>Không có dữ liệu câu hỏi từ người gửi</td></tr>";
    
    }else{
        takelocol.forEach((key, i) => {
            const row = document.createElement("tr");
            row.innerHTML =`
            <td>${i+1}</td>
            <td>${key.Nguoigui}</td>
            <td>${key.Question}</td>
            <td>${key.AnswerCollect.join(' <br> ')}</td>
            <td id="duyet">${key.Trangthai}</td>
            <td>
                <button type="button" id="delete" onclick="xoa(${i})">Xóa</button>
                <button type="button" id="duyet" onclick="duyet(${i})">Duyệt</button>
                <button type="button" id="khongduyet" onclick="khongduyet(${i})">Không duyệt</button>
                <button type="button" id="xem_chi_tiet_${i}" onclick=xem_chi_tiet(${i})>Xem chi tiết</button>
            </td> `;

            dsQues.appendChild(row);
        })
    }
}

// hàm xóa câu hỏi
function xoa(i){
    if(confirm("Bạn muốn xóa câu hỏi này ư? ")){
        takelocol.splice(i,1);
        localStorage.setItem('Câu hỏi', JSON.stringify(takelocol));
        renderQues();
    }
}

renderQues();

//hàm duyệt và không được duyệt câu hỏi
function duyet(index){
    if(takelocol[index].Trangthai="Chờ duyệt"){
        takelocol[index].Trangthai = "Đã duyệt";
        localStorage.setItem('Câu hỏi', JSON.stringify(takelocol));
        renderQues();
    }
}
function khongduyet(index){
    if(takelocol[index].Trangthai="Chờ duyệt"){
        takelocol[index].Trangthai = "Không được duyệt";
        localStorage.setItem('Câu hỏi', JSON.stringify(takelocol));
        renderQues();
    }
}


