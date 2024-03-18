
import {useEffect, useState} from 'react';

function App() {
  const [recipeFormShown, showRecipeForm] = useState(false);

  let SubmitRecipe = (event) => {
    event.preventDefault();

    let newRecipeName = document.getElementById('newRecipeName').value;
    let newRecipeInstructions = document.getElementById('newRecipeInstructions').value;

    this.setState(
      {recipes: [
        {
          name: newRecipeName,
          instructions: newRecipeInstructions
        }
      ]
    })
  }
    return(
      <div className='App'>
        <h1 className='App-Header'>My Recipes</h1>
        <p>There are no recipes to list</p>
      {
        recipeFormShown ?
        <>
          <form id='recipe-form' name='recipe-form' onSubmit={SubmitRecipe}>
            <label htmlFor='newRecipeName'>Recipe name: </label>
            <input type='text' id='newRecipeName' />

            <label htmlFor='newRecipeInstructions'>Recipe Instructions: </label>
            <textarea id='newRecipeInstructions' placeholder='write recipe instructions here' />

            <input type='submit' />
          </form>
        </>
        :
          <button onClick={ () => showRecipeForm(!recipeFormShown) }>Add Recipe</button>
      }
      </div>
    )
  }

export default App;
