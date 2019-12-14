# ZSSN (Zombie Survival Social Network) - Frontend

This project is an implentation of the ZSSN (Zombie Survival Social Network)
challenge.

## Problem Description

The world as we know it has fallen into an apocalyptic scenario. A laboratory-made virus is transforming human beings and animals into zombies, hungry for fresh flesh.

You, as a zombie resistance member (and the last survivor who knows how to code), was designated to develop a system to share resources between non-infected humans.

## Requirements

You will develop a website that consumes a REST API which will store information about the survivors, as well as the resources they own.

In order to accomplish this, the system must fulfill the following use cases, sorted by importance to guarantee the survival of the group.

### Add survivors to the database:

A survivor must have a name, age, gender, last location (latitude, longitude) and inventory.

The survivor inventory can have: water, food, medication and ammunition.

The interface is expected to have a list of the possible itens to add to the inventory, as well as a map to assign the last location (initially with the current location of the survivor). An intuitive and pratical interface ensure the security of the members of your group.

### Update survivor location:

Survivors must have the ability to update their last location. When added to the database, a survivor will receive a unique identification from the system. Using that identification the survivors must be able to search for themselves and update the last location in a pratical way.

### Flag survivor as infected:

In a chaotic situation like that, it's inevitable that a survivor may get contaminated by the virus. When this happens, we need to flag the survivor as infected.

An infected survivor cannot trade with others, can't access/manipulate their inventory, nor be listed in the reports (infected people are kinda dead anyway, see the item on reports below).

**A survivor is marked as infected when at least three other survivors report their contamination.**

When a survivor is infected, their inventory items become inaccessible (they cannot trade with others).

For pratical purposes, it's expected to being possible to search for a survivor by name to flag that survivor as infected. Who's gonna remember the identification from the whole group with the life in risk?

### Survivors cannot Add/Remove items from inventory:

Their belongings must be declared when they are first registered in the system. After that they can only change their inventory by means of trading with other survivors.

The items allowed in the inventory are described above in the first feature.

### Trade items:

Survivors can trade items among themselves.

To do that, they must respect the price table below, where the value of an item is described in terms of points.

Both sides of the trade should offer the same amount of points. For example, 1 Water and 1 Medication (1 x 4 + 1 x 2) is worth 6 ammunition (6 x 1) or 2 Food items (2 x 3).

The trades themselves won't be stored by the API, but the items will be transferred from one survivor to the other.

| Item         | Points   |
| ------------ | -------- |
| 1 Water      | 4 points |
| 1 Food       | 3 points |
| 1 Medication | 2 points |
| 1 Ammunition | 1 point  |

### Reports

The interface will must show the following reports, served by the API:

Percentage of infected survivors.
Percentage of non-infected survivors.
Average amount of each kind of resource by survivor (e.g. 5 waters per survivor)
Points lost because of infected survivor.

---

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
