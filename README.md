# Harrington-Tools

Tools for Harrington Core Project, to manage and fill a mongoBDD with Poker hands Equity

## What's can we do with it ?

### - CreateEncounterFile.js

Dependency : 

- using the native fs. module

Start : `node CreateEncounterFile.js`

Generate File :`encounter.csv`

Content : `Hero Hands` - `Vilain Hands`

If the execution is fill succesfully, you will generate a file with `1821144` lines, containing each possible confrontation between
each Hero Hands (Player 1) against each possible Vilain Hands (Player 2) in Poker NoLimit Texas Holdem. 

### - SplitLargeEncounterFile.js

Dependency : 

- Using the native fs. module
- Using the `split-file-stream` library
  - Install : `npm install --save split-file-stream`
  - Documentation : https://github.com/dannycho7/split-file-stream
  
Start : `node SplitLargeEncounterFile.js`

Generate File : `encounter.csv` split in 20 files of 1MB

NamingPattern : `Encounter-file.split-[0-9][0-9]`
`
Node.js have RAM issue with large data sample, i made the choice to split the data sample to be more flexible during the Equity Calculation process

### - CreateEquityFileFromEncounterFile.js

(WIP)

### - pushEquityResultIntoBDD.js

(WIP)
