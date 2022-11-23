import { Duration, IANAZone, DateTime } from 'luxon'
import { Select } from '@chakra-ui/react'

const timezones = [
  'Africa/Algiers',
  'Africa/Cairo',
  'Africa/Casablanca',
  'Africa/Harare',
  'Africa/Nairobi',
  'America/Argentina/Buenos_Aires',
  'America/Belize',
  'America/Bogota',
  'America/Boise',
  'America/Caracas',
  'America/Chicago',
  'America/Chihuahua',
  'America/Dawson',
  'America/Detroit',
  'America/Godthab',
  'America/Juneau',
  'America/Los_Angeles',
  'America/Mexico_City',
  'America/Montevideo',
  'America/Phoenix',
  'America/Regina',
  'America/Santiago',
  'America/Sao_Paulo',
  'America/St_Johns',
  'America/Tijuana',
  'Asia/Almaty',
  'Asia/Baghdad',
  'Asia/Baku',
  'Asia/Bangkok',
  'Asia/Colombo',
  'Asia/Dhaka',
  'Asia/Dubai',
  'Asia/Irkutsk',
  'Asia/Jerusalem',
  'Asia/Kabul',
  'Asia/Kamchatka',
  'Asia/Karachi',
  'Asia/Kathmandu',
  'Asia/Kolkata',
  'Asia/Krasnoyarsk',
  'Asia/Kuala_Lumpur',
  'Asia/Kuwait',
  'Asia/Magadan',
  'Asia/Rangoon',
  'Asia/Seoul',
  'Asia/Shanghai',
  'Asia/Taipei',
  'Asia/Tehran',
  'Asia/Tokyo',
  'Asia/Vladivostok',
  'Asia/Yakutsk',
  'Asia/Yekaterinburg',
  'Atlantic/Azores',
  'Atlantic/Canary',
  'Atlantic/Cape_Verde',
  'Australia/Adelaide',
  'Australia/Brisbane',
  'Australia/Darwin',
  'Australia/Hobart',
  'Australia/Perth',
  'Australia/Sydney',
  'Europe/Amsterdam',
  'Europe/Athens',
  'Europe/Belgrade',
  'Europe/Brussels',
  'Europe/Bucharest',
  'Europe/Dublin',
  'Europe/Helsinki',
  'Europe/Lisbon',
  'Europe/London',
  'Europe/Moscow',
  'Europe/Sarajevo',
  'Pacific/Auckland',
  'Pacific/Fiji',
  'Pacific/Guam',
  'Pacific/Honolulu',
  'Pacific/Midway',
  'Pacific/Tongatapu',
]

const TimezoneSelect = ({ handleSelectChange }) => {
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const getUTCOffsetString = (ianaTimezone) => {
    const utcOffsetHours = new IANAZone(ianaTimezone).offset(DateTime.utc()) / 60
    const formattedHours = Duration.fromObject({ hours: utcOffsetHours }).toFormat('h:mm')
    return utcOffsetHours > 0 ? `UTC+${formattedHours}` : `UTC${formattedHours}`
  }

  return (
    <Select onChange={(e) => handleSelectChange(e)}>
      <option selected={localTimezone}>
        {localTimezone} ({getUTCOffsetString(localTimezone)}
      </option>
      {timezones.map((timezone) => (
        <option value={timezone}>
          {timezone} ({getUTCOffsetString(timezone)})
        </option>
      ))}
    </Select>
  )
}

export default TimezoneSelect
