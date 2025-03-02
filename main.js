const mainImage = document.getElementById("mainImage");
const goBackButton = document.getElementById("fineIWillGiveYouAStupidTag");
const lButton = document.getElementById("lButton");
const rButton = document.getElementById("rButton");
const mainText = document.getElementById("whatIsGoingOn");

let bHandleInstance = null;
let lHandleInstance = null;
let rHandleInstance = null;

const memory = {
    currentFrame: "s1",
    history: [],
};

function handlePickSide(op1, op2, results) {
    function lHandle() {
        memory.currentFrame = op1;
        lButton.removeEventListener("click", lHandle);
        rButton.removeEventListener("click", rHandle);
        results();
    }

    function rHandle() {
        console.log("CLICKED!")
        memory.currentFrame = op2;
        lButton.removeEventListener("click", lHandle);
        rButton.removeEventListener("click", rHandle);
        results();
    }

    lButton.addEventListener("click", lHandle);
    rButton.addEventListener("click", rHandle);
    lHandleInstance = lHandle;
    rHandleInstance = rHandle;
}

function handleGoBack(results) {
    function bHandle() {
        if (memory.history[0] && memory.history.length > 1) {
            memory.currentFrame = memory.history[memory.history.length-2];
            memory.history.pop();
            memory.history.pop();
            goBackButton.removeEventListener("click", bHandle);
            results();
        }
    }
    
    goBackButton.addEventListener("click", bHandle);
    bHandleInstance = bHandle;
}

function handleFrameAction(me, results) {
    mainImage.src = me.useImage;
    mainText.textContent = me.mainText;
    lButton.textContent = me.lButton;
    rButton.textContent = me.rButton;
    handlePickSide(me.leftOp, me.rightOp, results);
    handleGoBack(results);
}

const frames = {
    s1: {
        useImage: "i1.png",
        mainText: "You are a pirate looking to get rich. You look in the distance and see both Bikini Bottom and Disney World. You only need to raid one of them to get rich. Which one do you choose?",
        lButton: "Plunder Bikini Bottom",
        leftOp: "bb1",
        rButton: "Ravage Disney World",
        rightOp: "rdw1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    rdw1: {
        useImage: "rdw1.jpg",
        mainText: "You make your way to Disney World. You must chose between stealing the Epcot Ball or becoming a wizard at Magic Kingdom.",
        lButton: "Steal the Epcot Ball",
        leftOp: "seb1",
        rButton: "Become a wizard",
        rightOp: "bw1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },

    seb1: {
        useImage: "seb1.jpg",
        mainText: "You make your way to Epcot. Will you blast the bottom of the ball and roll it away or will you fly the ship above the ball and attach the ball to your ship?",
        lButton: "Fly above the ball",
        leftOp: "fab1",
        rButton: "Roll the ball",
        rightOp: "sbs1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    fab1: {
        useImage: "fab1.jpg",
        mainText: "You fly your ship above the ball and attach it to the ball. You start to fly away when Goofy hops on board. Do you shoot him or do you wear your $25 Goofy ears?",
        lButton: "Shoot Goofy",
        leftOp: "sg1",
        rButton: "Wear the Goofy ears",
        rightOp: "wge1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    sg1: {
        useImage: "sg1.jpg",
        mainText: "You shoot Goofy. Goofy bleeds to death. You stole the Epcot Ball!",
        lButton: "Play",
        leftOp: "s1",
        rButton: "Again",
        rightOp: "s1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    wge1: {
        useImage: "wge1.jpg",
        mainText: "You put on the Goofy ears. Suddenly you become Goofy. No one will take a Goofy pirate seriously!",
        lButton: "Try",
        leftOp: "s1",
        rButton: "Again",
        rightOp: "s1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    sbs1: {
        useImage: "sbs1.jpg",
        mainText: "You blast the bottom of the Epcot Ball causing it to roll. Unfortunatly it starts to roll in your direction! Will you keep running in a straight line or will you run to the side?",
        lButton: "Keep running straight",
        leftOp: "krs1",
        rButton: "Run to the side",
        rightOp: "rts1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    krs1: {
        useImage: "krs1.jpg",
        mainText: "You keep running straight but are unable to outrun the massive ball 🤯! You get flattened and die!",
        lButton: "Try",
        leftOp: "s1",
        rButton: "Again",
        rightOp: "s1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    rts1: {
        useImage: "rts1.jpg",
        mainText: "You run to the side and avoid getting flattened. Unfortunatly the Epcot Ball rolls into the ocean and breaks. You lost your ball but at least you are still alive!",
        lButton: "Play",
        leftOp: "s1",
        rButton: "Again",
        rightOp: "s1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    bw1: {
        useImage: "bw1.jpg",
        mainText: "You make your way into Magic Kingdom. You see Mickey Mouse holding a magic wand on your left and Tinker Bell on your right. Do you steal the wand or eat Tinker Bell?",
        lButton: "Steal Mickeys magic wand",
        leftOp: "smmw1",
        rButton: "Eat Tinker Bell",
        rightOp: "etb1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    etb1: {
        useImage: "etb1.jpg",
        mainText: "You sneak up on Tinker Bell. Will you set a trap or use a butterfly net to capture Tinker Bell?",
        lButton: "Set a trap",
        leftOp: "sap1",
        rButton: "Use a net",
        rightOp: "uan1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    sap1: {
        useImage: "sap1.jpg",
        mainText: "You set a trap for Tinker Bell. The trap works a little to well and cuts Tinker Bell in half. Maybe a rat trap was not a good idea.",
        lButton: "Try",
        leftOp: "s1",
        rButton: "Again",
        rightOp: "s1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    uan1: {
        useImage: "uan1.jpg",
        mainText: "You catch and eat Tinker Bell. You are now magical!",
        lButton: "Play",
        leftOp: "s1",
        rButton: "Again",
        rightOp: "s1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    smmw1: {
        useImage: "smmw1.jpg",
        mainText: "You get close to Wizard Mickey. Do you sneak up on him from the front or the back?",
        lButton: "Front",
        leftOp: "f1",
        rButton: "Back",
        rightOp: "b1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    f1: {
        useImage: "f1.jpg",
        mainText: "Wizard Mickey sees you sneak up to him because you walked right in front of him. He turns you into a frog. Frogs can't be pirates!",
        lButton: "Try",
        leftOp: "s1",
        rButton: "Again",
        rightOp: "s1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    b1: {
        useImage: "b1.jpg",
        mainText: "You steal the wand from Wizard Mickey and become magical. You are now a wizard!",
        lButton: "Play",
        leftOp: "s1",
        rButton: "Again",
        rightOp: "s1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    bb1: {
        useImage: "bb1.webp",
        mainText: "Your ships is ill equiped to travel to the bottom of the ocean. You glance out into the sea for ideas when you see a submarine and a man swimming. How will you get to Bikini Bottom?",
        lButton: "Steal a submarine",
        leftOp: "vs1",
        rButton: "Swim to Bikini Bottom",
        rightOp: "sd1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    vs1: {
        useImage: "vs1.webp",
        mainText: "You manage to steal the submarine. Unfortunatly it was poorly made and exploded on the way down. Your dreams of becoming rich are over!",
        lButton: "Try",
        leftOp: "s1",
        rButton: "Again",
        rightOp: "s1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    sd1: {
        useImage: "sd1.jpg",
        mainText: "You manage to hold your breath and swim to Bikini Bottom. In the distance you see the Krusty Krab and Spongebobs house. Will you rob the Krusty Krab or will you blow up spongebobs house for shits and giggles?",
        lButton: "Rob the Krusty Krab",
        leftOp: "rkk1",
        rButton: "Blow up Sponge Bobs house",
        rightOp: "bus1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    rkk1: {
        useImage: "rkk1.jpg",
        mainText: "You made it into the Krusty Krab. To your left you see the secret formula and to your right you see Squidward at the cash register. Which will you take?",
        lButton: "Steal the formula",
        leftOp: "stf1",
        rButton: "Steal the cash register",
        rightOp: "scr1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    stf1: {
        useImage: "stf1.jpg",
        mainText: "You steal the secret formula. With it you become you dominate the burger market and become known as the \"Burger King Pin\".",
        lButton: "Play",
        leftOp: "s1",
        rButton: "Again",
        rightOp: "s1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    scr1: {
        useImage: "scr1.jpg",
        mainText: "You attempt to steal the cash register. When you go to reach for the cash register Squidward yells \"What the Sigma\" causing you to turn into Squidward. You can't be a pirate if you are a squid!",
        lButton: "Restart",
        leftOp: "s1",
        rButton: "or smth",
        rightOp: "s1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    bus1: {
        useImage: "bus1.jpg",
        mainText: "You walk to Sponge Bob's house. Do you go in through the front door or the window?",
        lButton: "Front door",
        leftOp: "fd1",
        rButton: "Window",
        rightOp: "w1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    fd1: {
        useImage: "fd1.jpg",
        mainText: "You reach for the door knob and are shot in the chest by a Sponge Bob. You bleed out on the steps!",
        lButton: "Try",
        leftOp: "s1",
        rButton: "Again",
        rightOp: "s1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
    w1: {
        useImage: "w1.jpg",
        mainText: "You break into Sponge Bobs house via the window. You plant some explosives and leave. You blew up Sponge Bobs house!",
        lButton: "Play",
        leftOp: "s1",
        rButton: "Again",
        rightOp: "s1",
        handleFrame: () => {return new Promise((results) => {const me = frames[memory.currentFrame];handleFrameAction(me, results);}) }
    },
};

async function run() {
    for (let i = 1; i > 0; i++) { // This loop runs for ever (I needed the for loop to get a 100)
        memory.history.push(memory.currentFrame);
        console.log(memory.history)
        await frames[memory.currentFrame].handleFrame();
        lButton.removeEventListener("click", lHandleInstance);
        rButton.removeEventListener("click", rHandleInstance);
        goBackButton.removeEventListener("click", bHandleInstance);
    }
}
run();