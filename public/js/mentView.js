const replyData = JSON.parse(localStorage.getItem("replyData")) || [];
const request = new URLSearchParams(location.search);
const index = request.get("index");
const reply = replyData[index];

const commentUpdate = document.querySelector(".comment-update");
const comment = document.querySelector("#comment");
const inputId = comment.querySelector("input[name='mentUserId']");
const inputComment = comment.querySelector("input[name='mentContent']");


inputId.value = reply.mentUserId;
inputId.setAttribute("disabled", "");
inputComment.value = reply.mentContent;


const updateBtn = (e) => {
    e.preventDefault();

    if(inputComment.value.length <= 0) {
        alert("댓글 내용을 입력하시길 바랍니다.")
        return;
    }
    
    const cheakConfirm = confirm(`댓글을 수정 하시겠습니까?`)
    if(!cheakConfirm) {return};

    replyData[index].mentContent = inputComment.value;
    localStorage.setItem("replyData", JSON.stringify(replyData));
    alert("수정이 완료 되었습니다.")
    window.history.back();
}

commentUpdate.addEventListener("submit", updateBtn);

const backBtn = () => {
    const cheakConfirm = confirm(`이전 페이지로 가실 경우 작성하신 정보는 사라집니다.\n뒤로 가시겠습니까?`)
    if(!cheakConfirm) {return};
    window.history.back();
}


