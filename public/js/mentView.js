const replyData = JSON.parse(localStorage.getItem("replyData")) || [];
const request = new URLSearchParams(location.search);
const index = request.get("index");
const reply = replyData[index];

const commentBtn = document.querySelector(".comment-btn");
const comment = document.querySelector("#comment");
const inputId = comment.querySelector("input[name='mentUserId']");
const inputComment = comment.querySelector("textarea[name='mentContent']");


inputId.value = reply.mentUserId;
inputId.setAttribute("disabled", "");
inputComment.value = reply.mentContent;


const updateBtn = (e) => {
    e.preventDefault();
    const cheakConfirm = confirm(`댓글을 수정 하시겠습니까?`)
    if(!cheakConfirm) {return};

    replyData[index].mentContent = inputComment.value;
    localStorage.setItem("replyData", JSON.stringify(replyData));
    window.history.back();
}

commentBtn.addEventListener("submit", updateBtn);

const backBtn = () => {
    const cheakConfirm = confirm(`이전 페이지로 가실 경우 작성하신 정보는 사라집니다. 뒤로 가시겠습니까?`)
    if(!cheakConfirm) {return};
    window.history.back();
}


