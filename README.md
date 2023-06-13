# DM Buddy - Revisited

This project aims to improve the overall quality of the app for both user and developer.

The biggest setback of the last iteration of dm-buddy was it used a cloud database. The thought was to be able to access your world building tools from anywhere. It involved account creation and database management, which began to greatly increase the scope and steer the project into a direction I wasn't happy with. The whole idea of DM-buddy is to be a lightweight tool, so I am going to achieve that with this project.

# About this product

This is a personal project of mine aimed to help me be a more effective and efficient dungeon master (or game master). I'm completely overhauling my app (again) in hopes to create an effective and lightweight tool. Now that I am a more experienced developer and dungeon master, I feel like I can create useful tools to do just that.

When creating new campaigns or oneshots for my players, I find myself diving into world building. From creating settlements, points of interest, and characters, to writing plots and meaningful interactions for my players to enjoy. I like to be very flexible when it comes to building campaigns for my players as I like to accommodate their play styles.

ChatGPT is a strong companion when creating new content for table top role playing games (TTRPG). I started using it to generate things for my world such as characters and items. Access to open ai's API costs money so this app does not use it. Instead a prompt is generated that can be copy and pasted to get what you need. These prompts are generated in such a way that you should almost always get the data you need back.

# Tools

## Character Builder:

A Character builder that uses 5th edition ruleset character sheets. Use the prompt generator to create random characters. If a sheet is completely empty, a completely random character will be generated. Any fields that are filled out prior to prompt generation are taken into account when generating. Alternatively, you may enter any additional info about the character into the notes and that works as well.

For example lets create a criminal NPC for a campaign. This is what that process would look like:

1. In the character sheet, we fill out "criminal" in the background input.
2. Press the generate prompt button and copy the prompt
3. Paste the prompt into ChatGPT and it gives us the generated character in JSON format with a convenient copy button
4. In the character builder, we paste the code into the parse results input 5. Press the apply prompt button

The JSON is parsed and applied to the character sheet.

# The furture of this app

As of now, DM-Buddy v3 only has character generation.

In the near future, you will be able to save characters onto your local storage or in a file. Further enhancements will be made to support monsters sheets.

Later, there will be tools for world building, lore keeping, and campaign managment. These tools will be interconnected if they wish to be used that way.
