const mentAreaForm = document.querySelector(".mentArea-form");

const mentsCreate = (e) => {
    e.preventDefault();
    const {mentTitle, mentUserId, mentContent} = e.target;

    const commemt = {
        mentTitle: mentTitle.value,
        mentUserId: mentUserId.value,
        mentContent: mentContent.value
    }

    const comments = JSON.parse(localStorage.getItem("replyData")) || [];
    comments.push(commemt);
    
    localStorage.setItem("replyData", JSON.stringify(comments));
}

mentAreaForm.addEventListener("submit",mentsCreate);