1 Personally to me the hardest parts of my code to read are the two controllers as they are the longest pieces of code that I have and to me reading them in vs once they reach a certain length I feel like I begin to skim over it more and may miss certain small mistakes


2 My duplicated logic shows up mainly in three areas "not found" error handling, repeating ID parsing using parseInt(req.params...) that shows up on nearly every route, and repeated string validation checks for fields such as title, content, and name.


3 the biggest naming improvments I made was in categoriescontroller where I gave the helper functions added clear descriptive names such as validateName and createError, this makes it so their purpose is immeditaely clear and helps make my code more readable overall


4 Most of the documentation that was missing was added in through this such as the readme explaining the purpose and the way to start the server alongside how to start lint.


5 I honestly think the thing that would be the most confusing would be the structure of the folders and how the package.json and other required things are not sorted but instead are just sitting at the bottom, i tried to rearrange it to look better but I cant without causing errors. I also think they may get confused by the screenshots folder as in vs cod you can see the screenshots but they are present on the GIT repos page as it was easier to upload them there instead of fighting vs.

