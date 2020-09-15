const onUserCreateHandler = () => {
  const userName = prompt("추가하고 싶은 이름을 입력해주세요.");
}

const userCreateButton = document.querySelector('.user-create-button')
userCreateButton.addEventListener('click', onUserCreateHandler)

fetch('https://js-todo-list-9ca3a.df.r.appspot.com/api/users/')
  .then(response => response.json())
  .then(json => userLoad(json));

function userLoad(users){
  const userList = document.querySelector("#user-list");
  const template = users.map(user => userTemplate(user.name));
  userList.innerHTML = "\n"+template.join("\n")+"\n";
}
function userTemplate(name){
  return `<button class="ripple">${name}</button>`
}
