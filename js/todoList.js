import TodoState from "./TodoState.js"
import { fetcher } from "./fetcher.js";
import fetchParams from "./fetchParams.js";
export default new class TodoList{
    constructor(){
        this.$todoList = document.querySelector(".todo-list");
        this.eventController(this.$todoList);
        this.makeList.bind(this);
        this.refreshList.bind(this);
    }

    makeList = (items) => {
        TodoState.user.todoList = items;
        if(!items) return this.$todoList.innerHTML = '';
        const template = items.map((item) => this.todoTemplate({...item}));
        this.$todoList.innerHTML = template.join("");

        console.log(
            "%c"+TodoState.user.name+
            "[%c"+TodoState.user._id+
            "%c]",
            "font-weight:bold;","color:red;","color:black;",
            "loaded!");
    }

    toggle(target){
        const $li = getLi(target);
        const index = getIndex($li);
        const item_id = TodoState.user.todoList[index]._id;
        fetcher(fetchParams.toggleCompleted(TodoState.user._id,item_id),this.refreshList);
    }

    delete(target){
        if(confirm("정말로 삭제하시겠습니까?")){
            const $li = getLi(target)
            const index = getIndex($li);
            const item_id = TodoState.user.todoList[index]._id;
            fetcher(fetchParams.deleteItem(TodoState.user._id,item_id),this.refreshList);
        }
    }

    deleteAll(){
        if(confirm("주의! 정말로 전체 삭제하시겠습니까!?")){
            fetcher(fetchParams.deleteAllItem(TodoState.user._id),this.refreshList)
        }
    }
 
    refreshList = () => {
        fetcher(fetchParams.userItem(TodoState.user._id),this.makeList)
    }

    todoTemplate({contents,isCompleted,priority}){
        const span = priority == "NONE" ? 
        `<select class="chip select">
            <option value="0" selected>순위</option>
            <option value="1">1순위</option>
            <option value="2">2순위</option>
        </select>` 
        : priority == "FIRST" ? 
          `<span class="chip primary">1순위</span>`
        : `<span class="chip secondary">2순위</span>`;
        
        return `
        <li ${isCompleted ? 'class="completed"':""}>
            <div class="view">
                <input class="toggle" type="checkbox" ${isCompleted && "checked"}/>
                <label class="label">
                ${span}
                ${contents}
                </label>
                <button class="destroy"></button>
                </div>
            <input class="edit" value="${contents}" />
        </li>
        `
    }

    eventController(todoList){
        todoList.addEventListener("change", ({target}) => this.toggle(target))
        todoList.addEventListener("click", ({target})=>{
            if(target.classList.contains("destroy")) this.delete(target)
        })
    }
}
