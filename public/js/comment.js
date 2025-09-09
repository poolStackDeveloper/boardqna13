const mentAreaForm = document.querySelector(".mentArea-form");

const mentsCreate = (e) => {
    e.preventDefault();
    const {mentTitle, mentUserId, mentContent} = e.target;

    const commemt = {
        mentTitle: mentTitle.value,
        mentUserId: mentUserId.value,
        mentContent: mentContent.value
    }

    const replyData = JSON.parse(localStorage.getItem("replyData")) || [];
    replyData.push(commemt);
    
    localStorage.setItem("replyData", JSON.stringify(replyData));
}

mentAreaForm.addEventListener("submit",mentsCreate);