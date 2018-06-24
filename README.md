# Japari Parkman

My Pacman mod themed after the 4th episode of Kemono Friends.
http://seedmanc.github.io/japari-parkman/

![main](https://pp.userapi.com/c840426/v840426427/6ea58/kbRxc9yxt08.jpg)

### Description

You play as Tsuchinoko in her Underground Labyrinth, collecting Sandstar and occasionally eating blue Japari buns as the colourful ceruleans pursue you. There are two modes in the game - the main one, "**Japari Mode**" and a classic mode for training which is closer to the original Pacman.

Among the new mechanics in the main more is the "fog of war" which limits visibility to direct sight. Playing the game in such conditions might prove challenging even to experienced Pacman players, because the game tactics are about predicting the enemy movements based on their color. Fortunately, as we remember from the anime Tsuchinoko can sense Ceruleans through the walls.

![infrared vision](https://pp.userapi.com/c840426/v840426427/6ea60/HrhoyfgUjHc.jpg)

There are also vantage points and overpasses in the labyringth, providing oversight and protection.

![](https://pp.userapi.com/c840426/v840426427/6ea6b/t1tf82GmQE4.jpg)

![vantage point](https://pp.userapi.com/c840426/v840426427/6ea74/k0XYMyh_4A0.jpg)

People familiar with Pacman might recognize this area, it provides a certain degree of safety even in the original game, since the ghosts can't access it from below.

Another innovation is the ability to summon Friend to aid you. Kaban reveals the map for a while, while Serval can fight off cerulean attacks for as long as you have Japari buns. In order to summon Friends you need to have their items (Hat for Kaban and Japari bun for Serval) and keep in mind that summoning costs one Japari coin and some points.

![Kaban being summoned](https://pp.userapi.com/c840426/v840426427/6ea80/14W_okcT32c.jpg)

The amount of coins and items per level is limited but grows as the level number progresses, up to 3 coins and buns per map. You can summon both Friends at once.

However the Ceruleans also have some tricks up their sleeve. As you might remember from the anime, they can seep through the barred walls and there will be more of those unexpected passages for them with every level. Although that kind of walls is see-through for you if you stop by close.

![Serval being careless](https://pp.userapi.com/c840426/v840426342/6dbd3/22-mM1PtmUY.jpg)

For every 10000 points collected you're given extra life (up to 9). Accumulated points and progress are stored in database, allowing you to compete with other players if you enter your nickname when asked. The leaderboards become available after passing level 4.

Usually the winning strategy is exploiting the periodic patterns in enemy behavior (they switch between the scatter and pursue modes, as denoted by changing music). Take the positions near blue Japari buns to quickly take out the ceruleans converging on you and earn extra points.
At the later levels seek shelter at vantage points and be sure to have Serval summoned to get your out of a pinch. Remembering the map well might save you coins on summoning Kaban, leaving more for Serval.

### Settings and interface

The main screen displays the selected mode and the controls info. At the bottom are the performance options - "low fps fix" disables some effects and lowers others to improve it, while "cap to 60fps" ensures proper game speed on high-fps displays. Note that having it enabled on regular 60fps monitors is not recommended as it might impact performance.

At the right panel you can see the amount of points collected, lives, progress until the next extra life and the amount of collected Japari coins. There are also Boss messages and the Japari mode switch.

Left panes displays the summon status and their items.

![panel design is taken from the original KF game](https://pp.userapi.com/c840426/v840426342/6dc2c/i3tUHVU9lEM.jpg)

### Development insights

One of my goals when making this mod was to introduce new game mechanics changing the gameplay so that it would actually become a mod rather than just a reskin with new sounds. The main innovation is the visibility system, some games call it "TrueSight".

The underground labyrinth from the 4th episode of Kemono Friends wouldn't me a maze if you could see it all at once like the player sees the map in the original Pacman. As such I needed to conceal parts not directly visible from player's position, and I did that by tracing rays from it to the nearest walls.

![raytracing](https://pp.userapi.com/c840426/v840426342/6dbed/Rs46s-ne2gY.jpg)

Such severe limitation had to be compensated, so I introduced the vantage points, giving oversight. This is where I got the idea of adding the height dimension to the otherwise 2D game of Pacman. I used the negative value of a tile type as the Z-value. Raytracing in this case compared the height of the player tile with the wall height.

![initial implementation](https://pp.userapi.com/c840426/v840426342/6dbfe/cnt-7DYDgzw.jpg)

However that meant having unlimited vision from the vantage points which was unrealistic. Therefore I decreased the ray height as it travels farther from the player. That way taking the vantage point provided limited circular view area and extra vision down the halls.

![final version](https://pp.userapi.com/c840426/v840426342/6dc0d/3P-jHR24UXQ.jpg)

## Version history

### March 2018 - update 1.1

This version fixes the most common bugs such as game speedup on high-fps displays, excess difficulty caused by sandstar regeneration upon player's death and some performance problems. Other than that I tried to add the mobile support, allowing the player to control Tsuchinoko by tapping or clicking around her position.

On Chrome, in order to enable sound you would have to go to the chrome://flags and set the Autoplay option to no user gesture required.

Published the updated walkthrough video to Nico with Japanese description: http://www.nicovideo.jp/watch/sm33024499

### November 2017 - first public release

Added an [RSS feed](https://seedmanc.github.io/japari-parkman/feed.xml) to provide news and updates to the players. Recorded the video of my walkthrough.

[![](https://pp.userapi.com/c840421/u5620427/video/y_e8f6b82a.jpg)](https://www.youtube.com/watch?v=APCA6TBMKlE)

### July 2017 - beginning of development

Several existing JS implementations of Pacman were analyzed and one of them was used as a basis, incorporating features from others.



Let's see how well you can do in this reimagined classic, the highscores are tracked and the leaderboards are available after beating level 4. 
