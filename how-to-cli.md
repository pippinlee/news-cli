# Building command line tools for journalist: headline scraper

We're going to build tool where you can type `get-headline canada` and you get headlines from the major Canadian news publications.

## Beginning

Command line tools have existed as long as computers have. Before you could right click to copy a file, you could type `cp afile.txt` into your shell. Command lines look visually different depending on which computer and shell you use, but they all function the same way. You type a command and press enter, and then the computer hopefully knows what you mean and acts out what you've typed in.

Before we build our first command line tool, let's have some fun with someone else's tool. Many people will put their command line online as part of helping the [open source community](http://pippinlee.github.io/open-journalism-project/Open-source/)

First, download this folder of [images](images) to your downloads folder. Next open your terminal.app program. Two important commands that will help you navigate the command line are `pwd` ad `ls`.

`pwd`: (print working directory)  will show you where you are in system's directory.

`ls`: (listings) will show you all the files and folders that exist in the current directory you're in.

The first time you type 'pwd' into your shell it should output something like `/Users/youraccountname`. Let's now move into the photo directory we just downloaded into our Downloads folder. If we type `ls -F` (listings, but filtered to just show folders) you can see your Downloads folder. To go into the `cat-photos` package we just downloaded from our current place which is `/Users/youraccountname`, we'll use the `cd` (change directory) command.

Type `cd Downloads/cat-photos/`. Now when you type `ls` you'll see 5 images. If you type `pwd` you'll also see that you're now in `/Users/pippinlee/Downloads/cat-images`. Remember that if you ever find yourself confused about where in the file structure you are, you can type `cd` and you'll end up back at `/Users/youraccountname`.

Next, we're going to download Zach Holman's command line tool: [gifme](https://github.com/holman/gifme/). But the way we're going to download is not through clicking `save` or `download` button. Zach has made these files of code that make up his tool available on a popular registry call RubyGems. Registries are a lot like a library but for small individual pieces of code. They're usually divided into the language the code is written in. For instance the programming language Python has a package manager called `pip` (hey, that's me!), JavaScript has `npm`, and here Ruby has `gem`.

Ruby's package manager calls the packages of code gems. So when you download something from RubyGems the way you type it into your shell is with `gem install nameofthepackage`.

If you have a Mac, you'll already have Ruby installed, and therefore the ability to install RubyGems. For instance you can check what version of Ruby you're running by typing `ruby --version`.

So, let's download this tool that Zach put out on the internet so we can have some fun with it. We'll type `gem install gifme`. Because we're downloading this package to a general RubyGems folder that's predefined, it doesn't matter if we run the install command from `cat-images`, your `Desktop`, or your `Movies` directory, it will install in the same place.

This will download the gifme package of files, each file filled with an important separate but important piece of code. Part of having the tool divided into multiple files is mostly organizational. One of the most important goals of good programming is to break up your code into very clean and efficient blocks so that they're readable to others. Don't get flustered if "clean" or "efficient" code means little to you right now. Your goal when starting should just be to get things working.

Now we should have Zach's tool downloaded and we can hopefully use it's functionality to make a cute gif with the images in our  current folder.

If we type `gifme --help` we can see it gives us a few tips with what would be an acceptable command to enter. For now let's just combine the 5 images in to a gif. To do this we can type `gifme *.jpg`, which tells the gifme tool to look for all files with the `.jpg` extension. If we had `.png` images, we would use `gifme *.png`.

It should output you a file directory that now hosts a cute cat gif!

The default width that the gifme command uses is 500px, but if we want to make it 1000px we can do that. In our `cat-images` directory, we can type `gifme *.jpg --width 1000`, which will output us a new gif that is 1000px wide. FUN.

This should show you that a command line tool can be just about anything. Building your repertoire of commands allows you to access a powerful and always growing set of tools. From scraping Youtube audio with [youtube-dl](https://rg3.github.io/youtube-dl/), to searching for files on your computer with a specific word with [grep](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/grep.1.html).

I'd suggest getting familiar with many of the basic command line commands as you use the command line tool to replace moving around 'Finder' on your Mac.

If you can do it in `Finder` your can do it in your command line.

[https://github.com/0nn0/terminal-mac-cheatsheet/wiki/Terminal-Cheatsheet-for-Mac-(-basics-)](https://github.com/0nn0/terminal-mac-cheatsheet/wiki/Terminal-Cheatsheet-for-Mac-(-basics-))



## Let's build a small tool

Now let's build a small tool so that you can get some local news headlines in your shell.

Start by opening a new tab in terminal. Let's create a folder called `get-headlines` with the command `mkdir get-headlines`.

We can now `cd get-headlines` to go to the directory. If we type `pwd`, we'll see `/Users/youraccountname/get-headlines`.

This project will be written in JavaScript, but a similar tool could made with Python or Ruby. It will use Node.js so you'll need to make sure you have it before going any further. All new versions of Node.js also include npm, a package manager and registry for small JavaScript packages.

If you have Node and npm properly installed, you'll be able to enter the command `npm --version` and `node --version` and see a version number. If it's not installed properly, your shell will say that those commands aren't available.

## Project setup

The goal of our small tool if for someone to be able to type `get-headline canada` or `get-headline toronto` into their shell and get the headlines that are currently on website.

We'll be getting these headlines by `scraping` these headlines from each news publications website.

**I'll note here in big letters, that scraping is fine when done in moderation. If you setup a sraper to go to xyz.com every second, don't be surprised if that block your IP address. On the servers end, it just looks you're just loading a webpage. Be nice with your new found powers.**

We can setup our project by creating our main file where our code is going into with `touch main.'s` and creating the file where our instructions for the scrapper will go `touch data.json`.

We'll also need a `package.json file that we can create with `npm init` to hold the package dependencies and other info about our tool. The `npm init` command takes you through an interactive setup to get your `package.json` details setup. For now just give it the title `get-headlines` and set the `main` value to `index.js`, everything else can be left as default (if you press enter the default is selected).

Now if you type `ls` in your `get-headlines` directory you'll see two files.

The way our tool will work is, a user types `get-headlines toronto` and our `index.js` file start it's scraper and looks at a few URLs that we've given under the instruction `toronto`. We'll start with the following 3:

[http://www.cbc.ca/news/canada/toronto/headlines](http://www.cbc.ca/news/canada/toronto/headlines)

[http://www.thestar.com/news/gta.html](http://www.thestar.com/news/gta.html)

[http://www.cp24.com/news](http://www.cp24.com/news)

We'll have specified a specific HTML element on the page where the headline is and the words in that HTML element will be what the user sees.

Before writing any code we can grab some packages we'll need for our small tool.

We'll need a package that can take a URL and a query for the DOM and return us the contents. For this we'll use [scraperjs](https://www.npmjs.com/package/scraperjs).

To download this package we'll use the `npm install scraperjs --save` command which will download the package, and save the package in a directory that is automatically created called `node_modules`. Any npm packages you download will end up in this directory.

If we look at the scraperjs docs [here](https://github.com/ruipgil/scraperjs) we can test out the scraperjs library by adapting their example with our [CBC website](http://www.cbc.ca/news/canada/toronto/headlines).

We'll need to give two things to make this work:

1. A URL, which we already specified as [http://www.cbc.ca/news/canada/toronto/headlines](http://www.cbc.ca/news/canada/toronto/headlines), the element on the page where the headline is.

2. We just want the most recent, and most important headline. Looking at the webpage we'll grab this element:

![front page](http://f.cl.ly/items/3M1u2I3g1L353K1o3i0D/screenshot.png)

The scraper uses a jQuery selector to select an element in the DOM. A good trick to getting this element quickly is to open the page in Firefox and use the developer tool's "copy unique selector" like so:

![copy unique selector](http://cl.ly/image/2C0b022x3n2f/Screen%20Recording%202015-06-18%20at%2012.43%20AM.gif)

This will give us the selector `.topstories-firstheadline > a:nth-child(2)`. We can now enter the URL and selector information into the scraperjs call like so:

	var scraperjs = require('scraperjs');
	scraperjs.StaticScraper.create('http://www.cbc.ca/news/canada/toronto/headlines')
    .scrape(function($) {
        return $(".topstories-firstheadline > a:nth-child(2)").map(function() {
            return $(this).text();
        }).get();
    }, function(news) {
        console.log(news);
    })


If you then go back to your shell, and type `node index.js`, it should run and give you an output of the current headline. This is what it looked like when I ran it:

![headline](http://cl.ly/image/2p0X2d1z0P45/Screen%20Recording%202015-06-18%20at%2012.52%20AM.gif)

You should now see how this would work. Before we go any further we need to think through how we'll want to structure our code to take a number of different news sites. To do this we can start using `data.json` file, and add a number of different sites. Each site will need a URL and unique query selector for the headline that you'll grab.

	{
  		"canada" : [
    {"name":"Toronto Star", "url":"http://www.thestar.com/news.html", "query": ".single-top-story .headline a"},
    {"name": "National Post Toronto", "url": "http://www.nationalpost.com/index.html", "query": ".npBlock h1 a"},
    {"name": "CBC Toronto","url": "http://www.cbc.ca/news/canada/toronto","query": ".topstories-firstheadline a"}
  ],
 	 "usa" : [
    {"name": "LA Times", "url": "http://www.latimes.com/local/", "query": "a.trb_outfit_primaryItem_article_title_a"},
    {"name": "LA Daily News", "url": "http://www.dailynews.com/local-news/","query": "#top-story h2 a"},
    {"name": "UT San Deigo ", "url": "http://www.utsandiego.com/news/local-topics/", "query": "div.content h2 a"}
  ]
}

