# TODO LIST (subject to change)

## Current Overarching Goal

- For a given navier stokes differential equation, generate a velocity field onto a 2D array. Then, be able to change that velocity field and 2D array with respect to time. This would hopefully lead to a visual result. Finally, modularize the different components and turn that into a library

## Coding Targets (no specific order)

- make function that takes velocity field/equation as input, maps it to 2D array as output (with given initial conditions and time)

- make function that generates streamlines (or instructions to create streamlines such as direction and magnitude) for a given velocity field and 2D array

- make function that generates pathlines

- make function that generates streaklines

- Create a Demo.html file alongside css and js to demonstrate using this library

- Make visual solution of 2D plates ASAP, then work from there to generalize (**prolly do this first**)

- Make a vector class

- Be able to "put dye"/do experiments in a velocity field solution

## What do I not understand?

- For inviscid flows, how do different mini fluid elements interact with one another? Specifically, where in 

    ```rho\*a = -nabla\*p + rho\*g ```

  does it account for interactions between other elements? Or is that literally what viscosity is?

- Am I going to be putting a solved equation in as my velocity, or am I putting in an unsolved differential that is solved some other way?

- Am I doing an empty space where fluid is generated (divergence equals zero), or am I just using the library to show solutions to simple 2D diagrams (two plates for example)?

## Potential Features

- Non inviscid flow
- Color changes with respect to velocity at that point?
