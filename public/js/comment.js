const mentAreaForm = document.querySelector(".mentArea-form");

const mentsCreate = (e) => {
    e.preventDefault();
    //댓글 내용이 비어있을 경우 입력을 막는 창
    const inputCt = mentAreaForm.querySelector("input[name='mentContent']");
    if (inputCt.value.length <= 0) {
        alert("댓글 내용을 입력하시길 바랍니다.")
        return;
    }
    const {mentUserId, mentContent} = e.target;

    const dbTableBoards = JSON.parse(localStorage.getItem("dbTableBoard")) || [];
    const request = new URLSearchParams(location.search);
    const index = request.get("index");
    const dbTableKey = dbTableBoards[index].parentId;
    
    //댓글의 유니크키 선언
    const commentkey =  Date.now();
    const commemt = {
        mentUserId: mentUserId.value,
        mentContent: mentContent.value,
        parentId: dbTableKey,
        replyId: commentkey
    }

    const replyData = JSON.parse(localStorage.getItem("replyData")) || [];
    replyData.push(commemt);
    
    localStorage.setItem("replyData", JSON.stringify(replyData));

    window.location.href = `./view.html?appKind=detail&userId=${dbTableBoards[index].userId}&index=${index}&uniquekey=${dbTableBoards[index].parentId}`
}

mentAreaForm.addEventListener("submit",mentsCreate);