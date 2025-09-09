const mentAreaList = document.querySelector(".mentArea-List");

const mentRead = () => {
    const replyDate = JSON.parse(localStorage.getItem("replyData")) || [];
    const request = new URLSearchParams(location.search);
    const key = Number(request.get("uniquekey"));
    
    //유저의 로그인 정보를 가져오게끔 처리
    const loginData = JSON.parse(localStorage.getItem('loginUserData'));
    const loginUserId = loginData.userId;
    
    //댓글 입력시에 자동으로 로그인된 유저아이디로만 작성할 수 있도록 disabled처리
    const mentAreaForm = document.querySelector(".mentArea-form");
    const inputId = mentAreaForm.querySelector("input[name='mentUserId']");
    inputId.value = loginUserId;
    inputId.setAttribute("disabled", "");

    for (let i = 0; i < replyDate.length; i++) {
        if (key === replyDate[i].parentId) {
            const commentLi = document.createElement("li");
            commentLi.setAttribute("class", "commentlist");
            commentLi.setAttribute("data-index", i);
            commentLi.setAttribute("data-key", replyDate[i].replyId);

            const commentId = document.createElement("p");
            commentId.textContent = `${replyDate[i].mentUserId}`

            const commentCt = document.createElement("p");
            commentCt.textContent = `${replyDate[i].mentContent}`;
            
            //만약 로그인된 유저 정보와 동일한 아이디가 아니라면 삭제와 수정버튼은 생성되지 않게 처리
            if (loginUserId === replyDate[i].mentUserId) {

                const commentDB = document.createElement("button");
                commentDB.setAttribute("class", "delete-btn");
                commentDB.textContent = `삭제`;

                const commentUP = document.createElement("button");
                commentUP.setAttribute("class", "update-btn");
                commentUP.textContent = `수정`;

                mentAreaList.appendChild(commentLi);
                commentLi.append(commentId,commentCt,commentDB,commentUP);
            } else {
                mentAreaList.appendChild(commentLi);
                commentLi.append(commentId,commentCt);
                }

        }
    }
}

mentRead();