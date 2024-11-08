# xniu0541_9103_TUT3_GroupA

## Interaction Instructions

- 
Simply load the webpage, and the animation will begin automatically. Click the “Play” button to start the jazz music Two Cigarettes Pleas. As the music plays, the visual elements on the screen will change dynamically. The animation is influenced by audio levels, which drive changes in the visual elements over time. as the music plays, the visual elements on the screen will change dynamically.

## Individual Approach to Animation

- 
In this project, I focused on making the animation react to the audio. Specifically, I used a combination of frequency analysis and amplitude-based effects to create dynamic visuals that reflect the changing nature of the music. This is more in line with the inspiration for Mondrian's work, where the car moves along the yellow road at random speeds and dynamically generates vibrations based on the jazz audio spectrum.

## Animation Driven by Audio

- 
I chose to use audio input to drive the animation. The animation responds to different frequencies and the size, shape and behavior of certain visual elements are directly related to specific ranges of the audio spectrum. In this way, the visuals bounce and move to the rhythm of the music, providing an immersive experience.

## Unique Properties of the Animated Elements

- 
- Subitem 4.1
Scaling effect: The size of the visual elements scales according to the audio amplitude. This allows the animation effect to “breathe” along with the music.
- Subitem 4.2
Motion Paths: I used Perlin noise to create a natural and unpredictable motion pattern for certain elements, adding a unique dynamic effect that made it very different from the panelists' animations.

## References and Inspiration

- 
My inspiration came from my knowledge of Mondrian's paintings and from teaching the content. Combining urban space and jazz, and observations of music visualization animations, such as those used in Spotify or YouTube music videos. I was particularly influenced by the following works. This one inspired me to use fluid movement and evolving patterns https://electricsheep.org/

## Technical Explanation of the Code

- 
- Subitem 6.1
Audio Analysis: The p5.FFT() library is used to perform frequency analysis on the music. The analysis generates an array of values that represent different frequencies in the audio signal.
- Subitem 6.2
Dynamic Scaling and Coloring: The values from the fft.analyze() function are used to adjust the scaling (scale()) and color properties (fill()) of different visual components. For instance, lower frequencies impact the size of certain elements, while higher frequencies control color changes.
- Subitem 6.3
Perlin Noise for Movement: I used noise() from the p5.js library to create smooth, flowing movement paths for some components. The Perlin noise ensures that the elements move in a natural, unpredictable manner, enhancing the organic feel of the animation.

## Changes to Group Code
I made several changes to enhance the group code:
- Subitem 5.1
Integrated the p5.FFT() function to make the animation driven by audio.
- Subitem 5.2
Added Perlin noise to control the movement of specific visual elements, which was not originally part of the group concept.

## External Tools and Techniques

- p5.js Audio Visualization: The tutorial from Coding Train provided insight into the use of the fft object. I adapted these techniques to create my unique approach to scaling and color manipulation. I chose this because it allowed me to leverage existing knowledge in audio visualizers while adding my own twist through color manipulation and movement.