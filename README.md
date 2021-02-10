
<div style="background: #308b5a; padding: 10px; color: #fef72d">

# Test Project

<p>
Create a mini game where clicking the button generate several hand cards. Please be sure to fork this repo, update this readme with any notes on your code.
</p>

- a hand has seven cards
- the winner of the game will be by the amount of pairs a hand has
- each "deal" will create a brand new "game" with new hands
- display those hands
- mark each hand "pairs" with proper border. Be sure to that diff pairs has diff borders
- game has two hands by default
- organized code

### Extra

- option to add or remove hands 2-4
- tests

### Helpers

#### example card

<img src="http://h3h.net/images/cards/diamond_9.svg" />


# Code Design:
***I've decided to use ES instead of TS for faster prototyping*** 

Words about code design:

### Scenes
Place for view composition to place our views across URL-map(if it exists) or design code as it is seen to user. 

### Services
Third-party tools that should provide data to our app. Services can interact with local storage, history, ajax, other browser api... etc.

### Containers
Binded to Services and provide business logic to our visual Components, normalise business logic and state.

### Components
Components renderes HTML. We r using components **keep its own state** and not to mix it with our business logic. U can call em stateless

# Data layer:
To keep flexibility of code i've used FSM as main store. But instead of using XState i've picked rude library to keep close to Redux abstractions.
Each data layer are dessigned by SOLID principles.
# Tests:
Scenes are perfect for BDD test coverage.
Services for TDD.

***Other notes placed in project***
