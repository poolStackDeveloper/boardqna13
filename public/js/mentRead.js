const mentAreaList = document.querySelector(".mentArea-List");

const mentRead = () => {
    const replyDate = JSON.parse(localStorage.getItem("replyData")) || [];
    const request = new URLSearchParams(location.search);
    const key = Number(request.get("uniquekey"));
    const loginData = JSON.parse(localStorage.getItem('loginUserData'));
    const loginUserId = loginData.userId;
    
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