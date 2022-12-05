import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export default function formatTime(time) {
  return dayjs.duration(time, 'seconds').format(time >= 3600 ? 'HH:mm:ss' : 'mm:ss')
}
