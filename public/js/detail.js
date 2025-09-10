function initLayout(){
    const request = new URLSearchParams(location.search);
    const appKind = request.get("appKind");
    if (appKind != "detail") return;

    // document.querySelector('.btnUpdateMode').addEventListener('click', goModify);
    // goModify : 수정모드 -> update.js
    document.querySelector('button[name="updateMode"]').addEventListener('click', goModify);
    document.querySelector('button[name="delete"]').addEventListener('click', del);
    const userId = request.get("userId");
    const index = request.get("index");
    const title = document.querySelector("h1");

    title.innerHTML = "Q & A - 상세조회";

    //상세조회 화면이므로 수정불가
    inputUserId.readOnly = true;
    inputTitle.readOnly = true;
    inputContent.readOnly = true;

    //로그인 정보가 다를 경우
    const loginData = JSON.parse(localStorage.getItem('loginUserData'));
    const loginUserId = loginData.userId;

    if (loginUserId !== dbTableBoard[index].userId) {
        const btnDelete = document.querySelector(".btnDelete");
        const btnUpdate = document.querySelector(".btnUpdate");
        btnDelete.style.display = `none`;
        btnUpdate.style.display = `none`;

        }

    //상세조회 화면 : 등록버튼, 저장(수정)버튼,  숨김처리
    const btnSave = document.querySelector("button[value='save']");
    btnSave.style.display = 'none';
    const btnUpdate = document.querySelector("button[value='update']");
    btnUpdate.style.display = 'none';

    getDetail(userId, index);
}

// initLayout 함수에서 getDetail을 호출하므로 코드 순서상 위로 올리는게 맞지만 
// 평가 단계에서 미리 정의되므로 화면 코드가독성을 위해 초기설정 함수를 최상단에 위치시킴
function getDetail(userId, index){
    
    if(dbTableBoard.length === 0) {
        alert("조회 중 오류가 발생하였습니다.");
        location.href = "./list.html";
        return; //여기까진 오지 않겠지..
    }
    
    for (let i = 0; i < dbTableBoard.length; i++) {
        // alert(dbTableBoard[i].userId);
        if (i == index && dbTableBoard[i].userId === userId ){
            inputUserId.value = dbTableBoard[i].userId;
            inputTitle.value = dbTableBoard[i].title;
            inputContent.value = dbTableBoard[i].content;
            break;
        }
    }

}

initLayout();