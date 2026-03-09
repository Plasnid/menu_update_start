// You can get url_string from window.location.href if you want to work with
// the URL of the current page
let url = new URL(window.location.href); 
console.log(url);
//now that we have the url we find menuItem to figure out which food item to load
let menuItem = url.searchParams.get(/** what goes here? */);
// did you get the menu item variable from the url?  console log it to check.

//collect the body tag so we can build the form

function buildForm(foodData){
    //time to build out the form, lets reuse the same one as before!
    let formHolder = document.createElement("section");
    formHolder.innerHTML = `
    <h2>Edit the ${foodData.food_name}!</h2>
    <form action="#">
        <fieldset>
            <label for="foodName">Food Name</label>
            <input type="text" name="foodName" id="foodName">
        </fieldset>
        <fieldset>
            <label for="foodCalories">Food Calories</label>
            <input type="text" name="foodCalories" id="foodCalories">
        </fieldset>
        <fieldset>
            <label for="foodPrice">Food Price</label>
            <input type="text" name="foodPrice" id="foodPrice">
        </fieldset>
        <input type="submit" value="submit" id="food_submit">
    </form>`;
    pageBody.appendChild(formHolder);
    let nameField = /** use querySelector to grab the name field! */
    // now fill in the name field with the returned data from the server!
   
    //lets do the same thing for food price and food calories!
    
    //grab the submit button and call its variable foodSubmit
    
    //are you sure you grabbed it?  Console log to check

    //lets add a click event to the submit button
    /**What goes here? */.addEventListener(/** What goes here? */, (e)=>{
        //stop the default action of reload from happening
        
        //lets get the values in the foodName, foodCalories, and foodPrice
        let foodName = /**What goes here? */;
        let foodCalories = /**What goes here? */;
        let foodPrice = /**What goes here? */;

        //Are you sure you have the values?  Console log them in a template literal
        
        updateFood(foodData.food_id, foodName, foodCalories, foodPrice);
    });
}
//
async function getItem(item) {
    const url = "./get_food_api.php";
    let jsonData = JSON.stringify({food_id: item});
    console.log(jsonData);
    try {
        const response = await fetch(url,{
            method: "POST", //using the post method
            headers: {
                'Content-Type': 'application/json', // Inform the server the data is JSON
            },
            body: jsonData // Send the JSON string in the request body
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result[0]);
        buildForm(result[0]);
    } catch (error) {
        console.error(error.message);
    }
}
async function updateFood(foodId, foodName, foodCalories, foodPrice) {
    const url = "./update_food_api.php";
    console.log(`${foodId} ${foodName} ${foodCalories} ${foodPrice}`);
    let jsonData = JSON.stringify({food_id: foodId, food_name: foodName, food_calories: foodCalories, food_price: foodPrice});
    console.log(jsonData);
    try {
        const response = await fetch(url,{
            method: "POST", //using the post method
            headers: {
                'Content-Type': 'application/json', // Inform the server the data is JSON
            },
            body: jsonData // Send the JSON string in the request body
        });
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        window.location.href = "index.html";
    } catch (error) {
        console.error(error.message);
    }
}
//The before we call anything we query the server for the element with the item we are looking for. 
getItem(menuItem);