const mentAreaList = document.querySelector(".mentArea-List");

const mentRead = () => {
    const replyDate = JSON.parse(localStorage.getItem("replyData")) || [];
    const request = new URLSearchParams(location.search);
    const key = Number(request.get("uniquekey"));
    
    for (let i = 0; i < replyDate.length; i++) {
        if (key === replyDate[i].parentId) {
            const commentLi = document.createElement("li");
            commentLi.setAttribute("class", "commentlist")
            commentLi.setAttribute("data-key", replyDate[i].parentId);

            const commentId = document.createElement("p");
            commentId.textContent = `${replyDate[i].mentUserId}`

            const commentCt = document.createElement("p");
            commentCt.textContent = `${replyDate[i].mentContent}`;

            const commentDB = document.createElement("button");
            commentDB.setAttribute("class", "delete-btn");
            commentDB.setAttribute("onclick" , "deleteBtn()");
            commentDB.textContent = `삭제`;

            const commentUP = document.createElement("button");
            commentUP.setAttribute("class", "update-btn");
            commentUP.setAttribute("onclick", "updateBtn()");
            commentUP.textContent = `수정`;

            mentAreaList.appendChild(commentLi);
            commentLi.append(commentId,commentCt,commentDB,commentUP);
            }
    }
}

mentRead();