This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Lazy Gold Maker Web App
Collaboration with the Lazy Gold Maker to create his wonderful spreadsheet into a web application.

For now, I will adding in the new recipes just about one page a day. It's going to be quite the journey...

## TODO
- Will need to complete, the recipes list in recipes.js.
- How to calculate blood of sargeras.
  - Where should it be stored: Inside items reducer? (most likely)
  - Where to calculate at? (inside the reducer itself? eh. Maybe chain it to the FETCH_ITEM_DATA action in promise?)
  - Created Mock data for it for now.
- Check on Potion of Prolonged Power and how it's obliterum is calculated as its "yield" is 10, and obliterumYield may need to take that into consideration.
  - Does it really only average 10.4...?
  - May need to do a calculation on crafted `yield` x `obliterumYield`
- Will need to refactor the Rank Selector widget from the static 1-3 rankings and replace them with a dynamic one that will update, well, dynamically, depending on how many ranks there are.. That sounds redundant.
- Hook up the API (it's not being used now in order to save bandwith / cost of calls from AWS while in development.)

## Interested in helping out?
Shoot me an email at blayne.marjama@gmail.com. Give me a brief overview of who you are, what you'd like to help with, and why. I'll get back to you asap! Below are a few things I know I could use some help on at the moment.

### Things that I could use help with
- Inputting all of these recipes.
- Double checking the recipes are correct.
- Testing to make sure all of the calculations are correct.
- Cutting edge design and feel for the application.
- Database help.