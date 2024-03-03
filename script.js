//openai whisper??
/*import {config} from "dotenv" //loads .env 
setup config
config()
import {Configuration, OpenAIApi} from "openai" //connection
import readline from "readline" //allow user to send input 
const openAi =new OpenAIApi( //set up openai
    new Configuration({
    apiKey: process.env.API_KEY //pass in key 
    })
)
const userInterface = readline.createInterface({ //user interface, inputing information
    input: process.stdin,
    output: process.stdout,
})
    userInterface.prompt() //prompt the user for input 
    userInterface.on("line", async input => { //listener...when they give us input ...
        const help = `Can you walk me through one example, according to DBT, that can help me with ${input}?`; //using input in our question. Input: distress
        //have buttons. If this button then feeling = distressed and ${feeling}
        const res = await openAi.createChatCompletion({ //send input to chatgpt 
            model: "gpt-3.5-turbo",
            messages:[{ role: "user", content: help}], //user sends message and we want to send input 
        })
        console.log(res.data.choices[0].message.content) //show the output, content from gpt
        console.log("\nI hope that helped! Would you like to go through another exercise?\n");
        //If yes button selected then.. 
        userInterface.prompt() //ask for input again and keep looping
    })
*/


import {Configuration,OpenAIApi} from "openai"; //import ai 
import express from "express"; //add to web server, so we can open in browser 
import bodyParser from "body-parser";
import cors from "cors";

const configuration = new Configuration({ //set up configuration
    organization:"org-5CnHNoLfekxGbnPsaPvER9fd", //set organization and api key 
    apiKey: "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",
});

const openai = new OpenAIApi(configuration); //initialize the configuation
const app = express(); //initialize express
const port = 3000;
app.use(bodyParser.json());
app.use(cors());

app.post("/", async (req, res)=> { //post request for when the browser accesses port
    const { message } = req.body; //listen for messages that get sent as part of that post request
    const completion = await openai.createChatCompletion({ //query openai, query chat model
        model: "gpt-3.5-turbo",
        messages:[{ role: "user", content: `${message}`}] //user sends message and we want to send input 
    });
    res.json({ //have response as json object
        completion: completion.data.choices[0].message
    })        
});

app.listen(port,()=> {
  console.log(`Example app listening at http://localhost:${port}`);
});


