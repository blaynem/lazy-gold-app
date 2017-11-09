This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Lazy Gold Maker Web App
Collaboration with the Lazy Gold Maker to create his wonderful spreadsheet into a web application.

For now, I will adding in the new recipes just about one page a day. It's going to be quite the journey...

## TODO
- Will need to complete, the recipes list in recipes.js.
- How to calculate blood of sargeras (Primal Sargerite as well).
  - Where should it be stored: Inside items reducer? (most likely)
  - Where to calculate at? (inside the reducer itself? eh. Maybe chain it to the FETCH_ITEM_DATA action in promise?)
  - Created Mock data for it for now.
- Check on Potion of Prolonged Power and how it's obliterum is calculated as its "yield" is 10, and obliterumYield may need to take that into consideration.
  - Does it really only average 10.4...?
  - May need to do a calculation on crafted `yield` x `obliterumYield`
- Hook up the API (it's not being used now in order to save bandwith / cost of calls from AWS while in development.)
- ~Will need to refactor the Rank Selector widget from the static 1-3 rankings and replace them with a dynamic one that will update, well, dynamically, depending on how many ranks there are.. That sounds redundant.~

## Interested in helping out?
Shoot me an email at blayne.marjama@gmail.com. Give me a brief overview of who you are, what you'd like to help with, and why. I'll get back to you asap! Below are a few things I know I could use some help on at the moment.

### Things that I could use help with
- Inputting all of these recipes.
- Double checking the recipes are correct.
- Testing to make sure all of the calculations are correct.
- Cutting edge design and feel for the application.
- Database help.

#### Recipes help.
If you'd like to help out in settings up the recipes correctly, please read below.
*Please please please, pay attention to the casing.*
View the [Recipe Format JSON](src/recipeFormatExample.json) file in order to better understand the format. (If you have suggestions on improving the formatting, feel free to shoot me a message.)
1. The `Key Name`, a `string` of the object can be found in the namesInObj.js file located [here](src/constants/namesInObj.js), along with the ItemId as it's pair.
2. `ItemId` a `num` found in the same file as objects `Key Name`, will be it's pair. Or can be googled.
3. `ObliterumYield` is a `num`, equal to the amount of obliterum that will be received from obliterating a single item.
4. `Name` a `string`, can take the Objects `Key Name` and simply add spaces where they should be.
5. `RecipeRank` an `array` of `objects` ranks in order. (rank 1 first, rank 2 second, etc). If the Object only has one Recipe rank, please keep it the same way.
    1. `Rank` a `num`, number of rank.
    2. `Yield` a `num`, number of items that will be created when crafting with this `Rank`.
    3. `Reagents` an `array` of item `objects`. Try to keep the order similar to other recipes, but nothing too strict.
        1. `Id` a `num` the Id of the reagent needed for the specific rank. Can be found in the namesInObj file, or through google.
        2. `Name` a `string` the name of reagent needed for the specific rank.
        3. `Amount` a `num` the amount of the reagent needed for the specific rank.
