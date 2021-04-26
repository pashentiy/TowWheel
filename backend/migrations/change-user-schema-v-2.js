const Config = require('../config.js')
const { User } = require('../models')


module.exports = async () => {
	console.log('Migration of change-user-schema started....')
	try {
		/*const migrateStatus = await User.updateMany({}, { $unset: { status: 1, color: 1, crushes: 1 } }, { multi: true, strict: false })
			.exec()
		console.log('Migration of change-user-schema completed.')
		return true*/
		console.log('Migration of change-user-schema completed.')
		return true
	}
	catch (e) {
		console.log('Migration of change-user-schema failed with follwing error ==> ', e)
		return false
	}
}