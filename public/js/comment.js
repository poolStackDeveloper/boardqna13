const mentAreaForm = document.querySelector(".mentArea-form");

const getURL = new URLSearchParams(location.search);
const getIndex = getURL.get(`index`)
const comments = JSON.parse(localStorage.getItem("dbTableBoard")) || [];

const mentsCreate = (e) => {
    e.preventDefault();
    const {mentTitle, mentUserId, mentContent} = e.target;

    const newCommnet = {
        mentTitle: mentTitle.value,
        mentUserId: mentUserId.value,
        mentContent: mentContent.value
    }
    
    comments[getIndex].push(newCommnet);
    
    localStorage.setItem("dbTableBoard", JSON.stringify(comments));
}

mentAreaForm.addEventListener("submit",mentsCreate);