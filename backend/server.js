const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const mongoose = require("mongoose");
const schedule = require("node-schedule"); // Import node-schedule
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

connectDB();

// Reminder Schema
const reminderSchema = new mongoose.Schema({
    reminderMsg: { type: String, required: true },
    reminderMail: { type: String, required: true },
    date: { type: String, required: true },
    isReminded: { type: Boolean, required: true },
});
const Reminder = mongoose.model("Reminder", reminderSchema);

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

transporter.verify((error) => {
    if (error) {
        console.error("Error setting up email transporter:", error);
    } else {
        console.log("Email transporter is ready.");
    }
});

// Schedule Email Logic
const scheduleEmail = (reminder) => {
    const reminderDate = new Date(reminder.date);
    schedule.scheduleJob(reminderDate, async () => {
        try {
            const mailOptions = {
                from: process.env.EMAIL,
                to: reminder.reminderMail,
                subject: "Scheduled Reminder",
                text: `Hello, this is your reminder: ${reminder.reminderMsg}`,
            };

            await transporter.sendMail(mailOptions);
            console.log(`Email sent to ${reminder.reminderMail}`);

            // Update isReminded status in the database
            await Reminder.findByIdAndUpdate(reminder._id, { isReminded: true });
            await Reminder.findByIdAndDelete(reminder._id);
            console.log(`Reminder with ID ${reminder._id} deleted successfully.`);
        } catch (error) {
            console.error("Error sending email:", error);
        }
    });
};

// Get All Reminders
app.get("/getAllReminder", async (req, res) => {
    try {
        const reminderList = await Reminder.find({});
        res.send(reminderList);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error fetching reminders");
    }
});

// Add Reminder
app.post("/addReminder", async (req, res) => {
    const { reminderMsg, reminderMail, date } = req.body;

    try {
        const reminder = new Reminder({
            reminderMsg,
            reminderMail,
            date,
            isReminded: false,
        });

        const savedReminder = await reminder.save();

        // Schedule the email after saving the reminder
        scheduleEmail(savedReminder);

        const reminderList = await Reminder.find({});
        res.send(reminderList);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error adding reminder");
    }
});

// Delete Reminder
app.post("/deleteReminder", async (req, res) => {
    try {
        await Reminder.deleteOne({ _id: req.body.id });
        const reminderList = await Reminder.find({});
        res.send(reminderList);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting reminder");
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
