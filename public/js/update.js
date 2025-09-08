// [DB table(dbTableBoard) - board - column]
// 1. userId  
// 2. title   
// 3. content 
// 4. regiDate

//전역변수 선언 from(detail.js) : (순서상 먼저 거쳐오므로 = 리스트 -> 상세 -> 수정)
// const inputUserId = document.querySelector("input[name='userId']");
// const inputTitle = document.querySelector("input[name='title']");
// const inputContent = document.querySelector("textarea[name='content']");

function saveModify(){
    const request = new URLSearchParams(location.search);
    const userId = request.get("userId");
    const index = request.get("index");
    
    // alert(dbTableBoard[index]);
    console.log(dbTableBoard[index]);

    //Validation
    if(inputTitle.value.length < 10){
        alert("제목은 10자 이상 입력하세요");
        return;
    }
    if(inputContent.value.length < 10){
        alert("내용은 10자 이상 입력하세요");
        return;
    }

    //Transaction - Update
    try { 
        for (let i = 0; i < dbTableBoard.length; i++) {
            if (dbTableBoard[index].userId == userId && i == index){ //인덱스와 아이디가 일치하는 건에 대하여 작업
                dbTableBoard[index].title = inputTitle.value;
                dbTableBoard[index].content = inputContent.value;
            }
        }
        localStorage.setItem("dbTableBoard",JSON.stringify(dbTableBoard)); //update & commit!
        alert("수정 되었습니다.");
        location.reload();
        
    } catch (error) {
        alert("오류가 발생했습니다.");
        console.log(error);
    }
}

//called by detail.js
function goModify(){
    // alert("수정모드 진입!");
    const title = document.querySelector("h1");
    inputUserId.setAttribute('disabled', 'true');
    title.innerHTML = "Q & A - 게시글 수정";

    //상세조회 화면이므로 수정불가
    inputUserId.readOnly = true;
    inputTitle.readOnly = false;
    inputContent.readOnly = false;

    //'변경내용 저장' 버튼을 사용함
    const btnUpdate = document.querySelector("button[value='update']");
    btnUpdate.style.display = 'block'; //'변경내용 저장' 버튼 활성화

    //숨김처리 : '수정모드', '삭제' 버튼
    const btnUpdateMode = document.querySelector("button[value='updateMode']");
    btnUpdateMode.style.display = 'none';
    const btnDelete = document.querySelector("button[value='del']");
    btnDelete.style.display = 'none';
    // btnUpdateMode.style.visibility = 'hidden'; //'수정모드 진입' 버튼 숨김
    document.querySelector('button[value="update"]').addEventListener('click', saveModify);
    
}

function initLayout(){
    const request = new URLSearchParams(location.search);
    const appKind = request.get("appKind");
    if (appKind != "update") return;

    const userId = request.get("userId");
    const index = request.get("index");
    const title = document.querySelector("h1");
    
    title.innerHTML = "Q & A - 내용수정";
    //수정 화면이므로 수정가능 (아이디는 수정불가)
    inputUserId.readOnly = true;
    inputTitle.readOnly = false;
    inputContent.readOnly = false;
}

initLayout();