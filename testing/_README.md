# What's This Dir?

These files are used in frontend tests. We're simulating frontend functionality in node, so we need to simulate browser interfaces. These files add those via `jsdom`, and they also make globally available functions from enzyme and chai, just to make our `index.spec.js` files neat.

This repo uses the convention that frontend tests are always carried out in `index.spec.js` file within a component or container dir.

For further details/explanation of this frontend-testing setup, see: (https://www.robinwieruch.de/react-testing-tutorial)[https://www.robinwieruch.de/react-testing-tutorial]
