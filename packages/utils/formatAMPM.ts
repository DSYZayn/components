export default function formatAMPM(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    let r_hours = hours % 12;
    r_hours = hours ? hours : 12; // the hour '0' should be '12'
    const r_minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = r_hours + ':' + r_minutes + ' ' + ampm;
    return strTime;
}