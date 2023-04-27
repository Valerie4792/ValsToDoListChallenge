let btn = document.getElementById('btn');
let injectArea = document.getElementById('injectArea');
let textArea = document.getElementById('textArea');
let itemNumber = 1;
let createList = document.getElementById('createList');


const audio = new Audio("/Audio/typeSound.mp3");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    audio.play();
  });
});


createList.addEventListener('click', function(e){
    createLists()
})



function createElements(elementToCreate, style){
    let createdElement = document.createElement(elementToCreate);
    createdElement.classList = style;
    return createdElement;

}





function createLists(){

    itemNumber = 1;

    let rowListDiv= createElements('div', 'row justify-content-center')
  

    // the names in the quotes are the class names
    let colAutoDiv = createElements('div', 'col-auto');
    
    
    let inputGroupDiv = createElements('div', 'input-group mb-3');

    let inputArea = createElements('input', 'form-control');
    // inputArea.classList = 'form-control';
    inputArea.setAttribute('type', 'text');
    inputArea.setAttribute('placeholder', 'enter item here');
    inputArea.setAttribute('aria-label', 'Text input with dropdown button');

    let btn2 = createElements('button', 'btn-dark');
    // btn2.classList = 'btn btn-outline-success';
    btn2.setAttribute('type', 'button');
    btn2.innerText = 'Add Item';

    btn2.addEventListener('click', function(e){
        createItems(inputArea.value);
    })

    inputGroupDiv.appendChild(inputArea);
    inputGroupDiv.appendChild(btn2);
    colAutoDiv.appendChild(inputGroupDiv);
    rowListDiv.appendChild(colAutoDiv);

    injectArea.appendChild(rowListDiv);




}

function createItems(item){
    let row = createElements('div', 'row justify-content-center');
    // row.classList = 'row';
    let div1= createElements('div', 'col-1');
    // div1.classList = 'col-1';
   

    let div2 = createElements('div', 'form-check pt-2 mx-4')
    // div2.classList = 'form-check pt-2 mx-4';
    

    let checkbox = createElements('input', 'form-check-input')
    // checkbox.classList = 'form-check-input';

    checkbox.setAttribute('type', 'checkbox')

    checkbox.addEventListener('click', function(e){
        console.log(e);
        // if(e.target.checked){
        //     e.target.parentNode.parentNode.nextSibling.classList.add('strike');
        // }
        // else{
        //     e.target.parentNode.parentNode.nextSibling.classList.remove('strike');
        // }
        e.target.checked?e.target.parentNode.parentNode.nextSibling.classList.add('strike')
        :e.target.parentNode.parentNode.nextSibling.classList.remove('strike');
        
    })
    

   
// the append child will allow the different divs to be children of each other see beloew
    div2.appendChild(checkbox);
    div1.appendChild(div2);
    console.log(div1);




    let div3 = createElements('div', 'col-6');
    // div3.classList = 'col-10

    let olTag = createElements('ol', 'list-group');
    // olTag.classList = 'list-group';
    

    let liTag = createElements('li','list-group-item list-group-item-primary');
    // liTag.classList = 'list-group-item list-group-item-primary';
    liTag.innerText = itemNumber + ". " + item;
    liTag.contentEditable = true;
    // allows the content that is added to the list to be edited if mispelled

    
 

    olTag.appendChild(liTag);
    div3.appendChild(olTag);


    let div4 = createElements('div', 'col-1 pt-2');
    // div4.classList = 'col-1 pt-2';
    let iTag = createElements('i', 'fa-solid fa-trash-can');
    // iTag.classList = 'fa-solid fa-trash-can';
    iTag.setAttribute('style', 'color: #050505;')

    // add event listener to trashcan delete button;
    // iTag.addEventListener('click', function(e){
    //     // this. and e. are interchangable;
        
    //     iTag.addEventListener('click', function(e){
    //         // this. and e. are interchangable;

    //         this.parentNode.parentNode.remove();
    //      if(itemNumber!==itemNumber){
    //         itemNumber--;
    //         console.log(itemNumber);
    //      }
            

    //      })

  
    // });
///// CORRECTED TWO ITEMS BELOW //////

//event listener for trashcan icon (iTag)
    iTag.addEventListener('click', function(e){
        // this. and e. are interchangable;

        //declare variable Deleted Item Number
        //ParseInt is converting the inside elements from a string to an integer.
        //this.parentNode.parentNode, is allowing us to acces the ol and li tags within the parent nodes.
        //Query selector is grabbing the first instance of the li within ol,
        // innerText.split is splitting and returning an array, and grabbing the first index of the first li
        //removing two parent nodes that the li was in
        //query selector is targeting all li items and storing them into remainingItems varible

        let deletedItemNumber = parseInt(this.parentNode.parentNode.querySelector('ol li').innerText.split('.')[0]);
        this.parentNode.parentNode.remove();
        let remainingItems = document.querySelectorAll('.list-group-item');
        remainingItems.forEach(function(item){
        //foreach loop is iterating through all remaining items, and returning another array, and grabbing 
        //the index of the first item in the array, and turning it into an integer so we can compare
        //if currentNum is greater than deletedNum.
        //Overall this piece is what is allowing item numbers to go back in consecutive order every time an item is deleted

            let currentNumber = parseInt(item.innerText.split('.')[0]);
            if (currentNumber > deletedItemNumber) {
                
            // if true, will subtract  1 from currentNum and concatinate the substring created at the decimal point
                item.innerText = (currentNumber - 1) + item.innerText.substring(item.innerText.indexOf('.'));
            }
        });
        //Math.max is taking the larger of two numbers, and in this case it is 
        // making sure item Num is never less than 1. If it is greater than 1, then it decrements the number by 1
        //this is what is reseting the counter back to 1 each time a item is deleted.
        itemNumber = Math.max(itemNumber - 1, 1);
        
  
    })
   


    
    div4.appendChild(iTag);
    
    row.appendChild(div1)
    row.appendChild(div3)
    row.appendChild(div4)

    injectArea.appendChild(row);
    itemNumber++;
}


// btn.addEventListener('click', function(e){
    
    
    
// });



//Create an Element  - we need the Node(element to add to) first.
//Eample of append child and create Element
// let pTag = document.createElement('p');
// pTag.innerText = 'I have some text here';
// console.log(pTag);

// injectArea.appendChild(pTag);
// // 1. the area to add element
// // 2. Allows you to add a node to the item you are referencing
// // 3. Telling apppendChild what Node(element ) you are adding


// let h1Tag = document.createElement('h1');
// h1Tag.innerText = "I am an H1 tag";
// console.log(h1Tag)
// injectArea.appendChild(h1Tag);

// let trashcan = document.createElement('i');
// trashcan.classList = 'fa-regular fa-trash-can';
// //copied the classes from trashcan that are on html;
// trashcan.setAttribute('style', 'color: #dd2742;')
// injectArea.appendChild(trashcan);

