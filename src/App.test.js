import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import userEvent from '@testing-library/user-event';

test('Chef should be able to view and store recipes', () => {
  render(<App />);

  // Heading reads "My Recipes"
  let recipeHeader = screen.getByText('My Recipes');
  expect(recipeHeader).toBeInTheDocument();

  // Text beneath should read "There are no recipes to list"
  let recipeList = screen.getByText('There are no recipes to list');
  expect(recipeList).toBeInTheDocument();

  // Recipe list is below Recipe header
  expect(recipeHeader.compareDocumentPosition(recipeList)).toBe(4);
});

test('Chef should be able to add recipes to their collection', () => {
  render(<App />)

  // Button that says "Add Recipe" below "My Recipes"
  let recipeHeader = screen.getByText('My Recipes');
  let recipeButton = screen.getByRole('button', {name: 'Add Recipe'});
  expect(recipeButton).toBeInTheDocument();
  expect(recipeHeader.compareDocumentPosition(recipeButton)).toBe(4);
})

test('When "Add Recipe" button is clicked, should show form with "Recipe Name" and "Recipe Instructions"', async () => {
  render(<App />)

  // Click Add Recipe Button
  let recipeButton = screen.getByRole('button', {name: 'Add Recipe'});

  act(() => {
    userEvent.click(recipeButton);
  })


  // Wait for form to appear on screen
  let form = await screen.findByRole('form', undefined, {timeout: 3000})

  // Verify the form appears
  expect(form).toBeInTheDocument();

  // Form should have fields "Recipe Name" and "Recipe Instructions"
  expect(screen.getByRole('textbox', {name: /Recipe name/i})).toBeInTheDocument();
  expect(screen.getByRole('textbox', {name: /Recipe instructions/i})).toBeInTheDocument();

  // "Add Recipe" button should not be on the screen once the form opens
  recipeButton = screen.queryByRole('button', {name: 'Add Recipe'})
  expect(recipeButton).toBeNull()
})

test('Chef should be able to see a recipe that has been added under "My Recipes"', async () => {
  render(<App />)

  // Click on "Add Recipe" button
  let recipeButton = await screen.getByRole('button', {name: /Add Recipe/i});
  userEvent.click(recipeButton)

  // Wait for the form/textbox to appear
  let recipeNameBox = await screen.findByRole('textbox', {name: /Recipe name/i});
  let recipeInstructionBox =  await screen.findByRole('textbox', {name: /Recipe instructions/i});

  // Add the recipe and instructions
  const recipeName = 'Tofu Scramble Tacos';
  const recipeInstructions = "1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas";
  userEvent.type(recipeNameBox, recipeName);
  userEvent.type(recipeInstructionBox, recipeInstructions);

  // Click on the submit button
  let submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  // Wait for text to appear
  let recipe = screen.findByText(/Name:.*Tofu Scramble Tacos/i);

})



