# Planning Document 

## Basics

Users have screens recorded
Can ask questions during games
Can see questions they've asked, with context taken from the time they asked them.



## React + typescript + Tailwind




## Database

We need someway of storing users questions to the coach we are building. 
*Note:* We dont really need a database here, we could use the users file system, mainly for learning
[https://supabase.com/](supabase)


```javascript
table Replays
PRIMARY_KEY id: unique
LocationOfScreenShotFilePath: string
LocationOfAudioClip: string
aiBotResponse: string
```


## Electron

1. screenshots
2. Record Audio
3. Listen for keybinds


## OpenAi API

1. https://openai.com/api/


## TODO FIRST 
replayObject = {
    id: "asdfasdf",
    locationOf....: "c:/asdfasdfr"


}, {
    another one....
}

const [replays, setReplays]  = hardcodedReplays()


DISPLAY IMAGES RESPONSE, LET PLAY AUDIO CLIPS FOR EACH REPLAY


Electron needs to get audio/images from disk

## TODO SECOND

Capturing audio, and screen shotting portion of screen, for subscription, put in a useEffect! 



## Actually asking OpenAI Api

read docs
import OpenAI from "openai";
const client = new OpenAI();

const response = await client.responses.create({
    model: "gpt-5-nano",
    input: "Write a one-sentence bedtime story about a unicorn."
});

console.log(response.output_text);

https://platform.openai.com/docs/quickstart?input-type=file-url


## Database stuff












getReplaysFromTheDatabase() 



