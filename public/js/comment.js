const mentAreaForm = document.querySelector(".mentArea-form");

const mentsCreate = (e) => {
    e.preventDefault();
    const {mentUserId, mentContent} = e.target;

    const commemt = {
        mentUserId: mentUserId.value,
        mentContent: mentContent.value
    }

    const replyData = JSON.parse(localStorage.getItem("replyData")) || [];
    replyData.push(commemt);
    
    localStorage.setItem("replyData", JSON.stringify(replyData));
}

mentAreaForm.addEventListener("submit",mentsCreate);