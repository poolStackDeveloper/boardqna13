// loginModule.js
const USER_DATA_KEY = 'userData';
const LOGIN_DATA_KEY = 'loginUserData';

const form = document.getElementById('auth-form');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const toggleBtn = document.getElementById('toggle-btn');
const userIdInput = document.getElementById('userId');
const passwordInput = document.getElementById('password');

let isLoginMode = true; // true = 로그인, false = 회원가입

// localStorage에서 사용자 데이터 확인 후 리디렉션
function checkUserAndRedirect() {
    const userData = localStorage.getItem(USER_DATA_KEY);
    if (userData) {
        // 데이터가 존재하면 list.html로 이동
        // window.location.href = 'list.html';
    }
}

// 로그인 or 회원가입 Submit 처리함수
function handleFormSubmit(event) {
    event.preventDefault();
    
    const userId = userIdInput.value;
    const password = passwordInput.value;

    if (isLoginMode) {
        handleLogin(userId, password);
    } else {
        handleRegister(userId, password);
    }
}

// 로그인 처리 함수
function handleLogin(userId, password) {
    const users = JSON.parse(localStorage.getItem(USER_DATA_KEY) || '[]');
    const isValidUser = users.find(user => user.userId === userId && user.password === password);

    if (isValidUser) {
        // 로그인 성공 시 로컬 스토리지에 로그인 정보 저장
        const loginData = {
            userId: isValidUser.userId,
            loggedInAt: new Date().toISOString()
        };
        localStorage.setItem(LOGIN_DATA_KEY, JSON.stringify(loginData)); //현재 로그인 한 유저

        alert('로그인 성공!');
        window.location.href = './list.html';
    } else {
        alert('아이디 또는 비밀번호가 올바르지 않습니다.');
    }
}

// 회원가입 처리 함수
function handleRegister(userId, password) {
    const users = JSON.parse(localStorage.getItem(USER_DATA_KEY) || '[]');

    //중복체크
    const isUserIdExist = users.some(user => user.userId === userId);
    if (isUserIdExist) {
        alert('이미 사용 중인 아이디입니다. 다른 아이디를 사용해주세요.');
        return; 
    }

    // 신규 사용자 데이터 추가
    const newUser = { userId, password };
    users.push(newUser);

    // 로컬 스토리지에 반영
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(users));

    alert('회원가입이 완료되었습니다! 로그인해주세요.');
    toggleAuthMode();
}

// 모드 전환 함수 (로그인 ↔ 회원가입)
function toggleAuthMode() {
    isLoginMode = !isLoginMode;
    if (isLoginMode) {
        formTitle.textContent = '로그인';
        submitBtn.textContent = '로그인';
        toggleBtn.textContent = '회원가입';
    } else {
        formTitle.textContent = '회원가입';
        submitBtn.textContent = '등록';
        toggleBtn.textContent = '뒤로가기';
    }
}

// 이벤트 리스너 등록
document.addEventListener('DOMContentLoaded', checkUserAndRedirect); //페이지 접속 시
form.addEventListener('submit', handleFormSubmit);
toggleBtn.addEventListener('click', toggleAuthMode);