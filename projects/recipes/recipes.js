let apiKey="fa1ebdacc29e46c4a18d7709823da1db";
let foodTypeFromInput=document.getElementById("foodInput");
let searchButton=document.getElementById("searchFood");
let recipeTitle=document.getElementById("recipeTitle");
let recipeName;
let ingredientsList = document.getElementById("ingredientsList");
let foodImage=document.getElementById("food-image");
let foodLink=document.getElementById("food-link");
searchButton.addEventListener("click",()=>{
    getRecipes(foodTypeFromInput);
}); 



      function getRecipes(foodType) {
        fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${foodType.value}`)
          .then(response => response.json())
          .then(data => {
            recipeTitle.textContent = data.results[0].title;
            let uniqueID = data.results[0].id;
            recipeInformations(uniqueID);
          })
          .catch(error => console.log(error));
      }

      
      function recipeInformations(uniqueID) {
        fetch(`https://api.spoonacular.com/recipes/${uniqueID}/information?apiKey=${apiKey}`)
          .then(response => response.json())
          .then(data => {
            
              const ingredients = data.extendedIngredients;
              let ingredientsId = ingredients.map(ingredient => ingredient.id);
              let ingredientsNames = ingredients.map(ingredient => ingredient.name);
              let uniqueIngredients = new Set(ingredientsNames);
              ingredientsList.innerHTML = '';
              
              uniqueIngredients.forEach(ingredientName => {
                let ingredientElement = document.createElement("li");
                ingredientElement.textContent = ingredientName;
                ingredientsList.appendChild(ingredientElement);
              });
              
            
         getIngredientInformation(ingredientsId);

         
            
            let recipeImage = document.createElement("img");
            recipeImage.src = data.image;
            recipeImage.alt = data.title;
            foodImage.innerHTML = '';
            foodImage.appendChild(recipeImage);
          
            let sourceLink = document.createElement("a");
            sourceLink.href = data.sourceUrl;
            sourceLink.textContent = "View Full Recipe";
            foodLink.innerHTML = '';
           foodLink.appendChild(sourceLink);
    })

         
    
          .catch(error => console.log(error));
      }
          


      function getIngredientInformation(ingredientIds) { 
       ingredientIds.forEach(ingredientId=>{ fetch(`https://api.spoonacular.com/food/ingredients/${ingredientId}/information?apiKey=${apiKey}`)
          .then(response => response.json())
          .then(data => console.log(data))
          
          .catch(error => console.log(error));
     })
       
  
      } 