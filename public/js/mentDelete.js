const deletebutton = document.querySelector(".delete-btn");

const deleteBtn = (e) => {
    if(e.target.className !== "delete-btn") return;
    
    const dbTableBoards = JSON.parse(localStorage.getItem("dbTableBoard")) || [];
    const request = new URLSearchParams(location.search);
    const index = request.get("index");

    const replyData = JSON.parse(localStorage.getItem("replyData")) || [];
    const replyId = Number(e.target.parentNode.dataset.key);
    const replyIndex = Number(e.target.parentNode.dataset.index);

    const cheakConfirm = confirm(`댓글을 삭제 하시겠습니까?`)
    if(!cheakConfirm) {return};
    
    for(let i = 0; i < replyData.length; i++) {
       if(replyData[i].replyId === replyId) {
            replyData.splice(replyIndex, 1);
            break;
       }

    }

    localStorage.setItem("replyData", JSON.stringify(replyData));
    window.location.href = `./view.html?appKind=detail&userId=${dbTableBoards[index].userId}&index=${index}&uniquekey=${dbTableBoards[index].parentId}`
}

mentAreaList.addEventListener("click", deleteBtn)