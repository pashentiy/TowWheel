const Config = require('../config')
const fs = require('fs');
const path = require('path')
const {
    HandleSuccess, HandleServerError
} = require('../controllers/BaseController');

var isMigrated = Config.environment == 'DEV' ? true : false

/*
 * Edit ENV and change environment to MIGRATE for migration then change back to DEV
 */

const MigrateSchema = async (req, res, next) => {
    try {
        // Run migration only once on node restart. 
        if(isMigrated == true)
            return next()
            
        let rootdir = path.resolve('./')
        let schemaVersion = 1
        try{
            const data = fs.readFileSync(rootdir+'/schemaVersion.json', 'utf8')
            schemaVersion = JSON.parse(data).schema_version
        }
        catch(err){
            const data = fs.writeFileSync(rootdir+'/schemaVersion.json', JSON.stringify({"schema_version": "1"}))
        }
        
        const migrationFiles = fs.readdirSync(rootdir+'/migrations')
        let migrationOccurred = false
        let latestSchemaVersion = schemaVersion
        for(let file of migrationFiles){
            let file_version = file.split('-v-')[1].split('.js')[0]
            if(file_version > schemaVersion){
                const migrate = require(rootdir+'/migrations/'+file)
                const migrationStatus = await migrate()
                console.log('migrationStatus >>> ',migrationStatus)
                if(!migrationStatus){
                    throw new Error('Migration failed.');
                }
                migrationOccurred = true
                if(latestSchemaVersion < file_version)
                    latestSchemaVersion = file_version
            }
        }

        isMigrated = true

        if(migrationOccurred){
            const data = fs.writeFileSync(rootdir+'/schemaVersion.json', JSON.stringify({"schema_version": latestSchemaVersion}))
            //return HandleSuccess(res, 'Migration Completed.')
        }

        //return HandleSuccess(res, 'Schema is up to date.')
        return next()
    }
    catch (err) {
        HandleServerError(res, req, err)
    }

}

exports.MigrateSchema = MigrateSchema

