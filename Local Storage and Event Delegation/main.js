

// Event delegation is very powerful event handler which helps us not listen the change or single event but 
//to keep the same event which handled at the similar way, we instead of assigning a handler to each of the item, we put
// a single handler on their common ancestor (parent) in this case instead of handling it on a <li> tag which by 
//the code is going to be added everytime, we assign it to the <ul> tag which always exist wand stays as a parent

const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items=JSON.parse(localStorage.getItem('items')) || []; //Try to get everything from local storage on a page load-
                                                                // otherwise make empty array

function addItem(e) {
    e.preventDefault(); // To stop page from reloading, because by default the form tag is going to reload or send the data,
    // to external source, generally server side and prevent keeps it on a client side in this case
    
    const text = (this.querySelector('[name=item]')).value; //this keyword is a form tag in this case, value is the values of the items
    const item  = {
        text,
        done: false
    };
    items.push(item) // to put everything we inputted into the empty array;
    populateList(items, itemsList); // Everytime we add item it calls populateList function which is going to create- 
                                                                        //list of item (<li>) with a label inside of it;
//To store everything in localeStorage-
    localStorage.setItem('items', JSON.stringify(items)); // everything can be stored as a string only, otherwise browser will 
                                        //convert under the hood to the string using toString method, so to avoid this 
                                            //we have to convert our items going to the localStorage into JSON file.
            //When we go to our localStorage we can see that everything storaed as a big string;
                                            
                                            
    this.reset() //to reset all the input we have done
}

function populateList(plates = [], platesList) {
platesList.innerHTML = plates.map((plate, i)=>{       //we need to have it done difrectly ias a variable or into the html itself
                            // and map which is gooing to take an array or raw data and return an array of some other data
    return `
    <li>
        <input type ="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''}/> 
        <label for="item${i}">${plate.text}</label>
    </li>
    `; // iternarary operator in inout tag helps us to indicate if done is true then checked otherwise false;
}).join('');    //take that array created by map which returns an array and join it as a one big string for innerHTML
}

function toggleDone(e){
    if(!e.target.matches('input')) return; //skip this unless this is input.
    //matches is a new web api which returns true if element would be selected by the specified string;
//console.log(e.target); //target helps us to log the targetted click not the mouse click. i.e. if we click on <li> then 
    //shows the li, if in between  it show something else, if uncheck it show another. 
const el = e.target;
const index=el.dataset.index;
items[index].done = !items[index].done;
localStorage.setItem('items', JSON.stringify(items)); // to store that in localStorage and then
populateList(items, itemsList); // update the visibility part; it is made to actually store the value of "done" in a local storage
    //So here we are going to understand why we use i everywhere. i was used as data-index dataset and  in input
//and labels in order to easily access by the index certain element. by using the index number, we are going to-
//change the value of the done key in object. 
}

//toggleDone function check and triggers the event only if it is the thing we actually want with help
// of target and matches api






addItems.addEventListener('submit', addItem);
//So when the page loads after we created and stored everything as a big string (JSON.stringify()) we have to 
//Since there is no items here except our empty array we have to use JSON.parse to get everything fro localStorage (abovementioned);
itemsList.addEventListener('click', toggleDone);
populateList(items, itemsList); //It helps us after reloading the page keep everything persistant on the page. so the list is not going to update.
