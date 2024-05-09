type message = {
    type: 'chatbot' | 'person',
    timestamp: string,
    message: string
}
export default async function getResponse(): Promise<message> {
    const response = await fetch('https://www.boredapi.com/api/activity')
    const res = await response.json()
    await new Promise(resolve => setTimeout(resolve, getRandomNumber()))
    return {
        type: 'chatbot',
        timestamp: formatAMPM(new Date()),
        message: res.activity
    }
}


function getRandomNumber() {
    return Math.floor(Math.random() * (200 - 100 + 1)) + 100;
}

function formatAMPM(date: Date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    let r_hours = hours % 12;
    r_hours = hours ? hours : 12; // the hour '0' should be '12'
    const r_minutes = minutes < 10 ? '0' + minutes : minutes;
    const strTime = r_hours + ':' + r_minutes + ' ' + ampm;
    return strTime;
}