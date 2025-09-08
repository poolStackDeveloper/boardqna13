function del(){
    const request = new URLSearchParams(location.search);
    const userId = request.get("userId");
    const index = request.get("index");

    if(confirm("정말 삭제하시겠습니까?")){
        // alert("진짜 삭제했네!");
        try { 
            //Transaction - Update
            for (let i = 0; i < dbTableBoard.length; i++) {
                if (dbTableBoard[index].userId == userId && i == index){ //인덱스와 아이디가 일치하는 건에 대하여 작업
                    // alert("찾았다!");
                    dbTableBoard.splice(i,1);
                }
            }
            localStorage.setItem("dbTableBoard",JSON.stringify(dbTableBoard)); //update & commit!
            alert("삭제 되었습니다.");
            history.back();
        } catch (error) {
            alert("오류가 발생했습니다.");
            console.log(error);
        }
    }else{
        // alert("삭제 안하네");
    }
}