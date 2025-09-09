const mentMoveUpBtn = (e) => {
    if(e.target.className !== "update-btn") return;

    const replyDate = JSON.parse(localStorage.getItem("replyData")) || [];
    const replyId = Number(e.target.parentNode.dataset.key);
    const replyIndex = Number(e.target.parentNode.dataset.index);
    window.location.href = `./mentview.html?appKind=detail&userId=${replyDate[replyIndex].mentUserId}&index=${replyIndex}&uniquekey=${replyId}`
}

mentAreaList.addEventListener("click", mentMoveUpBtn);