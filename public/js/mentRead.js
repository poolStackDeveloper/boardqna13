const mentAreaList = document.querySelector(".mentArea-List");

const mentRead = () => {
    const replyDate = JSON.parse(localStorage.getItem("replyData")) || [];
    const dbTableBoard = JSON.parse(localStorage.getItem("dbTableBoard")) || [];

    replyDate.forEach ((comment, i) => {
        const commentLi = document.createElement("li");
        commentLi.setAttribute = (`data-userId`, comment.userId);
        console.log(commentLi);
        
    })
}