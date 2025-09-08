// [DB table(dbTableBoard) - board - column]
// 1. userId  
// 2. title   
// 3. content 
// 4. regiDate

function createPagination() {
    const dbTableBoard = JSON.parse(localStorage.getItem("dbTableBoard")) || [];
    const totalPages = Math.ceil(dbTableBoard.length / 10);
    const pagingArea = document.querySelector('.paging');
    
    pagingArea.innerHTML = ''; //div 초기화

    // 페이지 번호 버튼 생성
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
		pageButton.className = 'page-btn';
        pageButton.style.width = '20px'; //그냥 두면 너무 작아서 크기 지정
        pageButton.onclick = () => {
            getList(i);
            console.log(`${i} 페이지로 이동합니다.`);
        };
        pagingArea.appendChild(pageButton);
    }
}

// 250831. 2중 반복문 -> 1번 사용으로 수정
function getList(numPage) {
    const dbTableBoard = JSON.parse(localStorage.getItem("dbTableBoard")) || [];
    const tbody = document.querySelector('tbody');

    // 화면 초기화
    tbody.innerHTML = '';

    // 페이징
    const itemsPerPage = 10;
    const startIndex = (numPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, dbTableBoard.length);

    //페이징 처리를 위해 for문으로 변경
    for (let i = startIndex; i < endIndex; i++) {
        const value = dbTableBoard[i];
        const tr = document.createElement("tr");

        // td-1 : index
        const tdIndex = document.createElement("td");
        tdIndex.innerText = i + 1; //화면 표시는 0이 아닌 1로 시작하도록 
        tr.appendChild(tdIndex);

        // td-2 : title (with href)
        const tdTitle = document.createElement("td");
        const aTag = document.createElement("a");
        aTag.innerText = value.title;
        aTag.setAttribute("href", `./view.html?appKind=detail&userId=${value.userId}&index=${i}`);
        tdTitle.appendChild(aTag);
        tr.appendChild(tdTitle);

        // td-3 : userId
        const tdUserId = document.createElement("td");
        tdUserId.innerText = value.userId;
        tr.appendChild(tdUserId);

        // td-4 : regiDate
        const tdRegiDate = document.createElement("td");
        tdRegiDate.innerText = value.regiDate;
        tr.appendChild(tdRegiDate);

        tbody.appendChild(tr);
    }
}

//List 화면에서 Create 화면으로 이동
function goCreate(){
    location.href="./view.html?appKind=new";
};

// 현재 로그인한 사용자 정보 표시
function displayLoggedInUser() {
    const loginData = JSON.parse(localStorage.getItem('loginUserData'));
    const userInfoDiv = document.querySelector('.user-info');

    if (loginData) {
        userInfoDiv.innerText = `Logged User: ${loginData.userId} / Logged In At: ${loginData.loggedInAt}`;
    } else {
        userInfoDiv.innerText = '로그인 정보가 없습니다.';
    }
}
displayLoggedInUser(); //현재 로그인한 사용자 정보 표시
createPagination() ; //페이징 
getList(1); //최초 접근 시 첫페이지 호출