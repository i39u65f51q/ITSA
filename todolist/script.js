const input = document.querySelector('input.input-text');
const form = document.querySelector('form.input-wrap');
const list = document.querySelector('ul.list'); 

function setLocalStorage(key, value){
    return localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key){
    return JSON.parse(localStorage.getItem(key));
}

function removeLocalStorage(key){
    return localStorage.removeItem(key);
}

const dataList = [];
function renderList(){
    list.innerHTML = '';
    dataList.forEach((data) => {
        const node = `
        <li class="item">
        <input type="checkbox" class="checkbox" ${data.checked ? 'checked' : ''}>
        <span class="test">${data.text}</span>
        <button class="delete">刪除</button>
        </li>
        `
        list.insertAdjacentHTML('beforeend', node);
    })
    
    document.querySelectorAll('.checkbox').forEach((box, index) => box.addEventListener('change' , () => {
        if(box.checked){    
            dataList[index].checked = true
        }else{
            dataList[index].checked = false
        }
        setLocalStorage('data', dataList);
    }) )

    document.querySelectorAll('.delete').forEach((deleteBtn, index) => {
        deleteBtn.addEventListener('click', () => {
            dataList.splice(index,1);
            setLocalStorage('data', dataList);
            renderList()
        })
    })

}


window.addEventListener('load',() => {
    list.innerHTML = '';
    dataList.push(...getLocalStorage('data'));
    renderList();
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(input.value.trim() === '')return;
    dataList.push({checked:false, text:input.value});
    input.value = ''
    setLocalStorage('data', dataList );
    renderList();
});





