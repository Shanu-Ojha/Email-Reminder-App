  <h1>Yaad Dila Do ⌚ | Email-Reminder-WebApplication</h1>
    <p>A MERN (MongoDB, Express.js, React, Node.js) stack application for setting reminders that sends scheduled email notifications to users.</p>
    <h2>Features</h2>
    <ul>
        <li>Create reminders with a message, email, and date.</li>
        <li>Receive email notifications for scheduled reminders.</li>
        <li>View all reminders in a dynamic, responsive dashboard.</li>
        <li>Delete reminders once they are no longer needed.</li>
    </ul>
    <h2>Tech Stack</h2>
    <ul>
        <li><strong>Frontend:</strong> React.js</li>
        <li><strong>Backend:</strong> Node.js with Express.js</li>
        <li><strong>Database:</strong> MongoDB</li>
        <li><strong>Email Service:</strong> Nodemailer</li>
        <li><strong>Scheduling:</strong> Node-schedule</li>
    </ul>
    <h2>How It Works</h2>
    <ol>
        <li>Users can add reminders with a message, email address, and date using the web interface.</li>
        <li>Reminders are stored in a MongoDB database.</li>
        <li>The server schedules email notifications using <code>node-schedule</code> and sends them via Nodemailer.</li>
        <li>Once a reminder is sent, it is automatically marked as reminded and deleted from the database.</li>
    </ol>
    <h2>Installation</h2>
    <pre>
    git clone &lt;repository-url&gt;
    cd &lt;frontend&gt;
    npm install
    npm install react-router-dom axios node-mailer
    npm install -D tailwindcss postcss autoprefixer
    npx tailwindcss init -p
    mkdir backend
    cd backend
    npm init -y
    npm install express cors body-parser nodemailer mongoose bcrypt jsonwebtoken dotenv nodemon
    </pre>
    <h2>Running the Project</h2>
    <ol>
        <li>Set up a MongoDB database and update the connection URI in the <code>.env</code> file.</li>
        <li>Configure the <code>.env</code> file with your email credentials for Nodemailer.</li>
        <li>Run the backend server:</li>
        <pre>nodemon server.js</pre>
        <li>Run the frontend:</li>
        <pre>npm run dev</pre>
    </ol>
    <h2>Contributing</h2>
    <p>Contributions are welcome! Please fork the repository and create a pull request with your enhancements.</p>
    <h2>License</h2>
    <p>This project is licensed under the MIT License. See the LICENSE file for more information.</p>
    <h2>Contact</h2>
    <p>If you have any questions or suggestions, feel free to reach out!</p>

