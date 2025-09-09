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
            commentCt.textContent = `${replyDate[i].mentContent}`

            mentAreaList.appendChild(commentLi);
            commentLi.append(commentId,commentCt);
            }
    }
}

mentRead();