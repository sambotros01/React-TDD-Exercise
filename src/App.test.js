import { render, screen } from '@testing-library/react';
import App from './App';

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
