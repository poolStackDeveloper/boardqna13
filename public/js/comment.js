const mentAreaForm = document.querySelector(".mentArea-form");

const mentsCreate = (e) => {
    e.preventDefault();
    const {mentUserId, mentContent} = e.target;

    const dbTableBoards = JSON.parse(localStorage.getItem("dbTableBoard")) || [];
    const request = new URLSearchParams(location.search);
    const index = request.get("index");
    const dbTableKey = dbTableBoards[index].key;
    
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
}

mentAreaForm.addEventListener("submit",mentsCreate);