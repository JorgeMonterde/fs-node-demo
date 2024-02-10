import fs from "node:fs/promises"

const folderName = "./logs"
const data = {
    "hello": "world"
}

async function setLogsFolder (path) {
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
const day = date.getUTCDate()
const month = date.getUTCMonth()
const year = date.getUTCFullYear()

const subFolderName = `${day}_${month}_${year}`

async function saveLog (folderName, timestamp, data) {
    const filePath = `${folderName}/${timestamp}.json`
    await setLogsFolder(folderName)
    await createLogFile(filePath, data)
}

await saveLog(`./${subFolderName}`, now, data)

