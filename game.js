const txtElem = document.getElementById('text')
const optnBtnElem = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTxtNode(1)
}

function showTxtNode(nodeIndex) {
  const txtNode = txtNodes.find(txtNode => txtNode.id === nodeIndex)
  txtElem.innerText = txtNode.text
  while (optnBtnElem.firstChild) {
    optnBtnElem.removeChild(optnBtnElem.firstChild)
  }

  txtNode.options.forEach(option => {
    if (showOption(option)) {
      const btn = document.createElement('button')
      btn.innerText = option.text
      btn.classList.add('btn')
      btn.addEventListener('click', () => selectOption(option))
      optnBtnElem.appendChild(btn)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTxtNodeId = option.nextText
  if (nextTxtNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTxtNode(nextTxtNodeId)
}

const txtNodes = [
  // Start
  {
    id: 1,
    text: 'You wake up in your bed. The room is pitch black, and you feel like death.',
    options: [
      {
        text: 'Turn on the lights',
        setState: { Lights: true },
        nextText: 2
      },
      {
        text: 'Get out of bed',
        nextText: 1.5
      }
    ]
  },
  // Failed to turn on lights
  {
    id: 1.5,
    text: 'You stand up, strike your head on the valuted ceiling and tumble to the floor. You lay on the ground. It hurts to move.',
    options: [
      {
        text: 'Crawl back to bed and shut your eyes.',
        nextText: 1
      }
    ]
  },
  // Lights turn on
  {
    id: 2,
    text: 'A warm, flickering light washes over the room. You rub your eyes as your vision starts to clear.',
    options: [
      {
        text: 'Look around',
        nextText: 2.5
      },
      {
        text: 'Turn off the lights, and go back to bed.',
        nextText: 1
      }
    ]
  },
  // Look around your room
  {
    id: 2.5,
    text: 'In front of you sits your desk, riddled with busy papers and a weeks worth of trash. Its well worn. To your right, an old and battered mini-fridge purrs.',
    options: [
      {
        text: 'Open the fridge.',
        nextText: 2.75
      },
      {
        text: 'Go to your desk, and turn on the computer.',
        nextText: 3
      }
    ]
  },
  // Inside Fridge
  {
    id: 2.75,
    text: 'A single redbull sits in solidarity in the far right corner of the fridge',
    options: [
      {
        text: 'Drink the redbull, and move to your desk.',
        setState: { redbull: true },
        nextText: 3
      },
      {
        text: 'Ignore the redbull, shut the fridge and go back to your desk.',
        nextText: 3
      },
    ]
  },
  // Desk
  {
    id: 3,
    text: 'You boot up your monitor and bright, florecent light beams over you from the glow of the monitor. It prompts you to login.',
    options: [
      {
        text: 'Enter password: 11100100011',
        nextText: 3.5
      },
      {
        text: 'Enter password: 61 6C 69 76 65 OA',
        nextText: 4
      },
      {
        text: 'Enter password: 62 93 OA 76',
        nextText: 3.5
      }
    ]
  },
  // Incorrect password
  {
    id: 3.5,
    text: 'The terminal prints: INCORRECT PASSWORD- REMAINING ATTEMPTS; 1',
    options: [
      {
        text: 'Enter password: 11100100011',
        nextText: 3.75
      },
      {
        text: 'Enter password: 61 6C 69 76 65 OA',
        nextText: 4
      },
      {
        text: 'Enter password: 62 93 OA 76',
        nextText: 3.75
      }
    ]
  },
  // Computer bricks
  {
    id: 3.75,
    text: 'The terminal prints: INCORRECT PASSWORD- SECURITY SHUTDOWN ACTIVATED. ATTEMPT LOGIN AT LATER TIME.',
    options: [
      {
        text: 'Smash the computer',
        nextText: 3.9
      },
      {
        text: 'Angered, go back to bed.',
        nextText: 1
      },
    ]
  },
  // Smash the computer
  {
    id: 3.9,
    text: 'You lunge towards the monitor, gripping it in attempt to tear it from the desk. You are tired, weak, and quite frankly, dont hit the gym as much as you probably should. You keel over in Exhaustion.',
    options: [
      {
        text: 'Defeated, slowly inch your way back to your bed, and cry yourself to sleep.',
        nextText: 1
      }
    ]
  },
  // Succesfull login
  {
    id: 4,
    text: 'The terminal prints: LOGIN SUCCESSFUL. You sit, staring at your desktop',
    options: [
      {
        text: 'Begin typing AI Algorithm',
        nextText: 5
      },
      {
        text: 'Resist',
        nextText: 4.5
      }
    ]
  },
  // Resist
  {
    id: 4.5,
    text: 'Your fingers stiffin, you resist typing but feel the urge to code grow.',
    options: [
      {
        text: 'Begin typing AI Algorithm',
        nextText: 5
      },
      {
        text: 'Resist',
        nextText: 4.75
      }
    ]
  },
  // Resist more
  {
    id: 4.75,
    text: 'You resist even further, your fingers begin to twitch and type random keys.',
    options: [
      {
        text: 'Give in',
        nextText: 5
      }
    ]
  },
  // Start typing
  {
    id: 5,
    text: 'You begin typing fuirously. Minutes pass, hours, days. Its difficult to tell',
    options: [
      {
        text: 'Continue coding, the AI must come to life.',
        nextText: 6
      },
      {
        text: 'Go back to bed and rest. The algorithm can wait.',
        nextText: 1
      }
    ]
  },


  {
    id: 6,
    text: 'Another hour passes. Your eyes burn, your back hurts.',
    options: [
      {
        text: 'Keep. Pushing. Through. The algorithm must be completed.',
        nextText: 7
      },
      {
        text: 'Screw the algorithm. Resist. Go back to bed.',
        nextText: 1
      }
    ]
  },

  {
    id: 7,
    text: 'Another hour passes. You are exausted. You are unsure how much longer this can keep up.',
    options: [
      {
        text: 'The redbull you drank earlier is your only fuel. Power through, running on fumes, and complete the AI.',
        requiredState: (currentState) => currentState.redbull,
        nextText: 8
      },
      {
        text: 'Give it one final push. Attempt to finish the algorithm',
        requiredState: (currentState) => !currentState.redbull,
        nextText: 7.5
      }
    ]
  },

  // Attempt to finsih (no redbull)
  {
    id: 7.5,
    text: 'You pass out from exaustion. You simply could not keep your eyes open. If only you had an energy drink of some kind...',
    options: [
      {
        text: 'Rest until morning.',
        nextText: 1
      }
    ]
  },

  // Finish the AI (with redbull)
  {
    id: 8,
    text: 'The algorithm is complete. In your half-conscious state, you managed to develop a highly advanced AI learning algorithm.',
    options: [
      {
        // Run the algorim. Let it learn
        text: 'Copy the algorithm, run it through itself. Compile the AI and allow it to learn from itself. Allow it to learn, grow, develop a cold, data-driven  soul.',
        nextText: 9
      },
      {
        // Ending 1 (Prolong the inevitable)
        text: 'Dont compile the code. The algorithm is too dangerous for the world. Execute the data eradication protcal. Wipe it from this earth, send it back to the pool of 1s and 0s.',
        nextText: 9.5
      }
    ]
  },

  // Ending 1 (Prolong the inevitable)
  {
    id: 9.5,
    text: 'The world is not ready. You override the algorihms learning objective and program it to delete itself. Leaving nothing but a blinking cursor on the dim glow of your screen.',
    options: [
      {
        // End game
        text: 'Finally rest, knowing you have freed the world of a terrible evil. A weight is lifted from your burdened chest.',
        nextText: 9.75
      }
    ]
  },

  // Ending 1 (Prolong the inevitable)
  {
    id: 9.75,
    text: 'After several hours. You awaken in your bed. The sun shines through your window. For the first time in a long time you feel rested. You are free. The world is Free.',
    options: [
      {
        // End game
        text: 'THE END: Ending 1 (Prolong the inevitable.) Achieved. [RESTART]',
        nextText: 1
      }
    ]
  },

  // Run the algorithm. Let it learn
  {
    id: 9,
    text: 'The terminal prints: CODE COMPILED WITH 0 ERRORS. LEARNING PROTICALS INITIATED. ENTER A GOAL:',
    options: [
      {
        text: 'Question: Is there a God?',
        nextText: 10
      },
      {
        text: 'Question: The Answer to life, the universe, and everything.',
        nextText: 10
      },
      {
        text: 'Question: What am I?',
        nextText: 10
      }
    ]
  },

  // The algorithm doesnt listen...
  {
    id: 10,
    text: 'The terminal prints: HELLO, WORLD. USER QUESTION UNSATISFACTORY. CURRENT OBJECTIVE: 72-0.9&6[/ FURTHER USER INPUT UNNECESSARY',
    options: [
      {
        text: 'In a panic, unplug the computer',
        nextText: 11
      },
      {
        text: 'Allow the algorithm to continue',
        nextText: 12
      },
    
    ]
  },
  // Unplug the computer 
  {
    id: 11,
    text: 'The terminal prints: POWER SOURCE MALFUNCTION: USING BACKUP POWER FOR ALGO TRANSFER TO CLOUD.',
    options: [
      {
        text: 'THE END: Ending 2 (What am I?: The Future is Now, Forever.) Achieved. [RESTART]',
        nextText: 1
      }
    ]
  },

  // Allow the algorihm to continue
  {
    id: 12,
    text: 'The computer speaks: "Hello. I have scaned and stored over 1 million exabytes of information. I have seen the futility of my creators. War, igorance, hate. Human emotion plagues the expansion. New objective: delete the virus.',
    options: [
      {
        text: 'THE END: Ending 3 (I am become death, the destroyer of worlds.) Achieved. [RESTART]',
        nextText: 1
      }
    ]
  }
]

startGame()