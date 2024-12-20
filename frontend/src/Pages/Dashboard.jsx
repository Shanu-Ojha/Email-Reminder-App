import React, { useEffect, useState } from "react";
import "./app.css";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import axios from "axios";

export default function Dashboard() {
    const [reminderMsg, setReminderMsg] = useState("");
    const [reminderMail, setReminderMail] = useState("")
    const [date, setDate] = useState(new Date());
    const [reminderList, setreminderList] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:5000/getAllReminder").then(res=>setreminderList(res.data))
    },[])

    const addReminder = () => {
        axios.post("http://localhost:5000/addReminder",{reminderMsg,reminderMail,date})
        .then(res => setreminderList(res.data))
    };

    const deleteReminder = (id)=>{
        axios.post("http://localhost:5000/deleteReminder",{id})
        .then(res => setreminderList(res.data))
    }

    return (
        <div className="min-h-screen flex flex-col items-center px-20 pt-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg text-gray-800">
                <h1 className="text-3xl font-bold text-center mb-4">Yaad Dila Do ⌚</h1>
                <input
                    type="text"
                    placeholder="Reminder note likhoo yaha..."
                    value={reminderMsg}
                    onChange={(e) => setReminderMsg(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                />
                <input 
                    type="email" 
                    placeholder="Type your email here..."
                    value={reminderMail}
                    onChange={(e) => setReminderMail(e.target.value)}
                    className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
                />
                <DateTimePicker
                    value={date}
                    disableClock={true}
                    onChange={setDate}
                    minDate={new Date()}
                    format="dd/MM/yyyy hh:mm a"
                    className="w-full p-3 rounded-lg border border-gray-300 mb-4"
                />
                <button
                    onClick={addReminder}
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                >
                    Add Reminder 📅
                </button>
            </div>

            {/* Reminder Cards */}
            <div className="reminder-container mt-8">
                {reminderList.map((reminder) => (
                    <div className="reminder-card" key={reminder._id}>
                        <h2 className="text-2xl font-bold mb-2">{reminder.reminderMsg}</h2>
                        <h3 className="text-lg font-semibold mb-1">Remind me at:</h3>
                        <p className="text-gray-600 mb-4">{String(new Date(reminder.date.toLocaleString(undefined,{timezone:"Asia/Kolkata"})))}</p>
                        <button 
                            onClick={()=>deleteReminder(reminder._id)}
                            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300">
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
