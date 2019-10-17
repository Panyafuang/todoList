const itemForm = document.getElementById('itemForm');
const itemInput = document.getElementById('itemInput');
const feedBack = document.querySelector('.feedback');
const clear = document.getElementById('clear-list');
const itemList = document.querySelector('.item-list');

// let itemData = [];
let itemData = JSON.parse(localStorage.getItem('list')) || [];
// console.log(itemData);
    if(itemData.length > 0){
        itemData.forEach( itemLocal => {
            showItem(itemLocal);
            handleItem(itemLocal);
        })
    }



// check form empty //
itemForm.addEventListener('submit', function(e){
    e.preventDefault();

    let itemValue = itemInput.value;
    if(itemValue === ""){
        showFeedBack("Please Input Valid", 'alert-danger');
    }else{   
        // put itemData to array //
        itemData.push(itemValue);
        // show itemData //
        showItem(itemValue);
        // clear input //
        itemInput.value = "";
        // manage btn handler //
        handleItem(itemValue);
        // save to localStorage //
        localStorage.setItem('list', JSON.stringify(itemData));
    }
});


// function showFeedBack //
function showFeedBack(text, alert){
    feedBack.textContent = text;
    feedBack.classList.add('showItem', `${alert}`);

    // setTimeout //
    setTimeout( () => {
        feedBack.classList.remove('showItem');
    }, 3000);
}



// show items //
function showItem(itemValue){
    const div = document.createElement('div');
    div.classList.add('item', 'my-3');
    div.innerHTML = `
    <h5 class="item-name text-capitalize">${itemValue}</h5>
    <div class="item-icons">
    <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
    <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
    <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
    </div>`;

    itemList.appendChild(div);
}

// function handleItem //
function handleItem(itemValue){
    // item-list(parentNode) --> item(childNode) //
    // itemList(document).querySelectorAll //
    const items = itemList.querySelectorAll('.item');
    // items ได้ออกมาเป็น Nods มันไม่สามารถ addEventListner ได้เลขต้อง forEach
    items.forEach( item => {
        // resolve promblem ที่แสดงรายการแบบเดิมซ้ำ โดยมันจะเลือก item ที่ป้อมเข้ามาล่าสุดแทน
        if(item.querySelector('.item-name').textContent === itemValue){
            

// complete btn
            // เลือกปุ่ม complete ในแต่ละรายการ
            item.querySelector('.complete-item').addEventListener('click', function(){     
                // item-name --> throught line and opacity 0.5 //
                item.querySelector('.item-name').classList.toggle('completed');
                // completed btn --> opcity 0.5 //
                this.classList.toggle('visibility');
            }); // end of complete-item
        
        
// edit btn
            item.querySelector('.edit-item').addEventListener('click', function(){
                // put to show in input box
                itemInput.value = itemValue;
                // remove child from itemList
                itemList.removeChild(item);
                // remove from array(itemData) also แล้วเก็บลงตัวแปร array ใหม่
                itemData = itemData.filter( item => {
                    return item !== itemValue;
                    
                });
                // console.log(itemData);
            });


// delete btn
            item.querySelector('.delete-item').addEventListener('click', function(){
                // remove child from parent nod
                itemList.removeChild(item);
                // remove from array
                itemData = itemData.filter( item => item !== itemValue );
                // also remove from localStorage
                localStorage.setItem('list', JSON.stringify(itemData));

                // show feedback alert
                showFeedBack(`${itemValue} has been remove`, 'alert-warning');
            });





        }// end of textContent === itemValue  
    });// end of items.forEach
};





// clear btn //
clear.addEventListener('click', function(){
    // reset array
    itemData = [];
    localStorage.removeItem('list');
    // remove from parent
    let items = itemList.querySelectorAll('.item');
    if(items.length > 0){
        items.forEach( item => itemList.removeChild(item) );
    };
    console.log(`After clear: ${itemData}`);
    
});