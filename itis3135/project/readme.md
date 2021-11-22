# Read Me

Hey! This web app gets all its data from using the **Flickr API.** If you want to learn how to use this template and what you need in your Flickr account, please continue reading.

Created by Ryan Hull for ITIS 3135
Web App Design and Development
UNC at Charlotte
Fall 2021

Flickr will hold all of your user information, pictures, links, and liked photos. I reccomend [creating an account](https://www.cleverbox.co.uk/blog/top-tips/set-flickr-account/) and looking around before continuing.

## Make the most out of your account

Below is a list of all aspects of Flickr that the web app makes use of:

- Profile
  - Username
  - Real name
  - Description
  - Outstide Links (at least one)
    - Website
    - Facebook
    - Instagram
    - Pinterest
    - Twitter
    - Tumblr
- Albums (Your photos)
  - Album name
  - Album description
  - Album cover
- Galleries (Others photos)
  - Gallery name
  - Gallery description
  - Gallery cover
- Photo
  - Title
  - Description
  - Background Tag (as many as you like)

Please note that the above are requirements for the page, and things will be missing from your pages if left absent. At least one Album and one Collection is reccomended to make first. A photo with the tag "background" is necessary to have the main page's background, the page will pick one randomly on each load.

## How to change Flickr information

There are two main settings panels in Flickr, and you'll need to use them both.

The first is accessed by clicking on your "buddy icon" on the top right of your screen, and clicking settings.
Here, you'll be able to change your _Real Name_

- You can access the settings by first clicking _You_, then _About_ on your Flickr homescreen once signed in.
- Here you can change your:
  - _Real Name_
  - _Profile Description_
  - _Outside Links/ Social Medias_

### After setting up your information, the next step is _Photos!_

- You can click the cloud icon on the top right of your page to upload photos
  - Keep in mind:
    - Galleries tend to look best with themes or aesthetics in mind
    - While you can put as little or many photos as you like, 5-10 is reccomended per album
- Choose your page backgrounds
  - In the _Photostream_ section, click any photo you think would look good large
  - Scroll down until you find the _Tags_ and add a tag with the text: **background**
  - That photo will now be the pool of backgrounds that the web app will randomly select on each load
    - If you would like only one background, only add a **background** tag to one photo

### Now lets create some _Albums!_

These are referred to as _galleries_ on the web app.

- Heading back to your _Photostream_, find a photo you want in an album and hover over the image
- An _Add to: Album_ pop up should appear, where you can create a new album or add to an existing one
  - Make sure you add a title and a description for your album
- After making your albums, you can view them by clicking on the _Album_ tab
  - Here you can change the _Cover Photo_, to pick which image shows as the cover for the gallery on the web app

### Now on to creating some _Galleries!_

These are under the _photos I like_ section on the web app.

- For this part, wander around Flickr until you find photos that you like that aren't yours
- Once you find some, repeat the process from making an _album_, by clicking the square and creating or adding to a gallery
- These will hold photos you like from other people, but you can't mix photos that are yours or others in your collections

## Plugins used

- W3.js
  - For including html components in pages
- Font Awesome
  - For icons
- Vibrant.js
  - For dynacally extracting colors from images
- lightGallery.js
  - For image gallery

## How it works

To use this template with your own Flickr account and information, you will need to find your user id and to get an API key

- To find this, go to your _Photostream_, once there, it will be the entire text in the url of the page between the last two slashes
  - Example from my account: flickr.<span></span>com/photos/192658515@N08/
  - My user id would be **192658515@N08**
- Next is to get your very own Flickr API key from [here](https://www.flickr.com/services/apps/create/noncommercial/?)

Now just replacing the current API key and user id varibles in the profile.js in the scripts folder is all that is needed to make your information shine on your web app