# My Portfolio:

## Learning Objectives:
- Continue learning HTML and CSS, building on my knowledge from CSCI 201
- Incorporate cool 3D effects and animations into my portfolio
- Learn how to use JavaScript to make my portfolio interactive
- Learn TypeScript
- Learn about how to set up a project in WebStorm with Node.js and npm
- Practice using GitHub for version control

### Day 1:
- Created a new repository on GitHub
- Set up the project structure with dist, src (html and typescript)
- Created a README.md file
- Imported many modules such as webpack, webpack-cli, webpack-dev-server, typescript, ts-loader, html-webpack-plugin, and clean-webpack-plugin
- Started a server to test my website
- Created a basic HTML file with a header and a paragraph
- Created a basic TypeScript file 
- Debugged errors around webpack.config.json and directory issues in my src files
- SUCCESS: Managed to get a three.js cube up and running on localhost!

In CSCI 201 we learned about Eclipse and Tomcat. We used Java - based on my understanding, Node.js seems to similar except we use Javascript for the backend too instead of just dynamically updating frontend, and we use Node for launching a server. Just a preliminary hypothesis though. 

### Day 2:
- Explored the Three.js library to create a particle system in my portfolio.
- Learned about BufferGeometry and PointsMaterial in Three.js.
- Created a particle system with blue particles and added it to the scene.
- Implemented a click event listener to add red particles to the scene at the mouse click position.
- Learned about Raycaster and used it to calculate the intersection point of the mouse click with a plane.
- Updated the BufferGeometry of the red particles with the new positions after each click.
- Implemented a simple gravity effect in the animation loop to make the particles fall down.
- Reset the y-position of the particles to a random position above 1 when they fall below -1 to create a continuous falling effect.
- Learned about the `needsUpdate` property and used it to update the positions of the particles in the BufferGeometry.
- Implemented a setInterval function to log the number of blue and red particles every 10 seconds.
- Debugged errors related to accessing properties of undefined by ensuring the position attribute is set for the BufferGeometry before using it.
- Successfully got the red particles to spawn appropriately and updated the animation to operate on all particles.