let data = {
    test1: { username: "test1", password: "test1", accno: 1001, balance: 5000, history: [] },
    test2: { username: "test2", password: "test2", accno: 1002, balance: 8000, history: [] },
    test3: { username: "test3", password: "test3", accno: 1003, balance: 7000, history: [] },
    test4: { username: "test4", password: "test4", accno: 1004, balance: 4000, history: [] }

}
let currentUser;
function getUsers() {
    return data;
}
function addUser(username,password,accno){
    data[username]={username,password,accno,history:[],balance:0};
    
 }
 function setcurrentUser(username){
     currentUser=username;
 }
 function getCurrentUser(){
     return currentUser;
 }
   module.exports = {
       addUser :addUser,
       getUsers: getUsers,
      // setcurrentUser:setcurrentUser,
      // getCurrentUser:getCurrentUser,
}

