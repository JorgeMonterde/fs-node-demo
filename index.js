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

async function createLogFile (filePath, data) {
    try {
        // create new file with data
        const updatedFileContentStr = JSON.stringify(data)
        await fs.writeFile(filePath, updatedFileContentStr, { encoding: "utf8", flag: "a"})

    } catch (error) {
        console.log(error)
        
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

async function saveLog (folderName, timestamp, data) {
    const mainFolderPath = "./logs"
    await setFolder(mainFolderPath)
    const subFolderPath = `${mainFolderPath}/${folderName}`
    await setFolder(subFolderPath)
    const filePath = `${subFolderPath}/${timestamp}.json`
    await createLogFile(filePath, data)
}

await saveLog(subFolderName, now, data)
