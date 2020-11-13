# What is FluidJS2D?

FluidJS2D is a library aiding in the visualization of two dimensional web fluid simulations

# How does it work?

FluidJS2D uses html canvas elements to draw the visual components, while uses JavaScript classes and functions to run the
necessary back end calculations. This library does **NOT** calculate vector field equations, and needs the user to 
code in their own equations. This library simply helps in visualizing the vectors and "experiments" done in the vector
field.

# How can I use it?

This library is split into two directories: **Visual** tools (in the visual directory) and **Calculation** tools (in the calc directory)

## Visual Tools

These files all focus on the visual components needed to bridge the gap between JS calculations and
canvas element manipulations. The file ```interface.js``` is responsible for doing this connection between visual html and
calculation JavaScript, whereas the file ```styles.css``` holds the css properties and attributes, all modifiable, useful for 
setting visual elements to appropriate values.

```styles.css``` also holds classes useful for the demonstration built into the library. These classes are not fundemental parts
of the library.

## Calculation Tools

These files focus instead on the calculation components of the library. ```particles.js``` contains the ```Particle``` class used to
simulate particles placed into the fluid simulation. ```vectors.js``` contains the ```pVector``` class (position vector) used to create
and draw vectors visualizing the behavior of the fluid simulation at specific points.

## Putting Them All Together

Included in this library is a demonstration of how to use the library, located in the ```demo``` directory under ```public```. The ```index.html``` file demonstrates how to set up an html environment suitable to interact with the library, while the ```entry.js``` file shows a potential
way to use the library to create a simulation, while showing how to properly use all of the library's components.

# How can I help?

Submit issues if you find any, use suggestions.md to add suggestions and submit a PR.