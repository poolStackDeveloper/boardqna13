// [DB table(dbTableBoard) - board - column]
// 1. userId  
// 2. title   
// 3. content 
// 4. regiDate

//화면 초기설정
function initLayout(){
    const request = new URLSearchParams(location.search)
    const appKind = request.get("appKind");
    if (appKind != "new") return;
    
    const title = document.querySelector("h1");
    title.innerHTML = "Q & A - 신규등록"; //왜 innerTEXT는 안되지?

    //수정버튼 숨김처리
    const btnUpdate = document.querySelector("button[value='update']");
    // btnUpdate.style.visibility = 'hidden';
    btnUpdate.style.display = 'none';
    const btnUpdateMode = document.querySelector("button[value='updateMode']");
    btnUpdateMode.style.display = 'none';
    const btnDelete = document.querySelector("button[value='del']");
    btnDelete.style.display = 'none';
}

//오늘날짜를 return 하는 함수
function getToday(){
    const today = new Date(); //toISOString 을 사용하여 짧게 구현하는 방법도 있지만 UTC기준으로 변환되어서 오차발생 
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
    const day = String(today.getDate()).padStart(2, '0');       // padStart는 오라클의 LPAD함수와 같음
    return `${year}-${month}-${day}`;
}

//DB저장
function saveBoard(e){
    e.preventDefault();
    if(e.submitter.value != "save") return;
    // alert("저장ㄱㄱ");
    
    const {userId, title, content, regiDate} = e.target; //구조분해 할당
    // alert(`${userId.value} ${title.value} ${content.value}` );
    
    //Validation
    if(userId.value.length < 3){
        alert("아이디는 3자 이상 입력하세요");
        return;
    }
    if(title.value.length < 10){
        alert("제목은 10자 이상 입력하세요");
        return;
    }
    if(content.value.length < 10){
        alert("내용은 10자 이상 입력하세요");
        return;
    }
    
    const createRowData = {
        userId      : userId.value,
        title       : title.value,
        content     : content.value,
        regiDate    : getToday()
    }
    
    //Transaction : localStorage를 가져와서 createRowData를 push하고 JSON으로 다시 밀어넣는다.
    try {
        const dbTableBoard = JSON.parse(localStorage.getItem("dbTableBoard")) || []; //로컬스토리지의 dbTableBoard 가져오는데 없으면 빈배열
        dbTableBoard.push(createRowData);   //insert into dbTableBoard values
        localStorage.setItem("dbTableBoard",JSON.stringify(dbTableBoard));
        alert("저장되었습니다.");
        location.href = "./list.html";
    } catch (error) {
        console.error("로컬스토리지 저장 중 오류가 발생했습니다:", error);
        alert("데이터 저장에 실패했습니다. 관리자에게 문의하십시오.");
    }
}
formCreate.addEventListener("submit",saveBoard); //저장버튼 콜백함수

initLayout(); //화면처리




