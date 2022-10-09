const { DateTime } = require('luxon')

module.exports = (userTimezone) => {
  const userStartOfDayToUTC = DateTime.now()
    .setZone(`${userTimezone}`).startOf('day')
    .toUTC()
    .toISO();
  const userEndOfDayToUTC = DateTime.now()
    .setZone(`${userTimezone}`).endOf('day')
    .toUTC()
    .toISO();
  return {
    userStartOfDayToUTC,
    userEndOfDayToUTC,
  }
}
