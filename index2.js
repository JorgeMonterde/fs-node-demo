import fs from "node:fs/promises"

const folderName = "./logs"
const data = {
    "hello": "world"
}

async function setFolder (path) {
    try {
        // check if folder exists
        const files = await fs.readdir(path)
        console.log("folder exists with files: ", files)
    } catch (error) {
        // create the folder
        await fs.mkdir(path)
    }
}

async function addLogToFile (filePath, timestamp, data) {
    timestamp = `new_log_entry_${timestamp}`
    try {
        // read file
        const fileContentString = await fs.readFile(filePath, { encoding: "utf8"})
        const fileContentJSON = await JSON.parse(fileContentString)

        // add new data to file content
        fileContentJSON[timestamp] = data
        const updatedFileContentStr = JSON.stringify(fileContentJSON)

        // add updated data to file
        await fs.writeFile(filePath, updatedFileContentStr)
    
    } catch (error) {
        // format data
        const fileContentJSON = {
            [timestamp]: data
        }
        const updatedFileContentStr = JSON.stringify(fileContentJSON)

        // create new file with data
        await fs.writeFile(filePath, updatedFileContentStr)
        
    }
}


const now = Date.now()
const date = new Date(now)
let day = date.getUTCDate()
day = day < 10 ? `0${day}` : day
let month = date.getUTCMonth()
month = month < 10 ? `0${month}` : month
const year = date.getUTCFullYear()

const subFolderName = `${year}${month}${day}`

async function saveLog (fileName, timestamp, data) {
    const mainFolderPath = "./logs"
    await setFolder(mainFolderPath)
    const filePath = `${mainFolderPath}/${fileName}.json`
    await addLogToFile(filePath, timestamp, data)
}

await saveLog(subFolderName, now, data)
