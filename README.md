# Factory maintenance api

This api is meant to help schedule maintenance tasks for factory devices.

Each device has a unique name, a year of installation, and a type. Devices can have several maintenance tasks scheduled for them. Each task contains description of the issue, the device it's issued for, time and date of submission, degree of importance (minor, important, critical) and status (open, solved). Tasks also have their unique, automatically generated id.

## Installation

First you need to install <code>node v10.15.3</code> or higher, <code>npm 6.4.1</code> or higher, and <code>PostgreSQL 12</code> or higher.

Clone or download the repository, and run <code>npm install</code> in the root directory of the project. Next, you need to have a Postgres database up and running. Put your database name, user, password, host and port details in the .env file in the root directory. To start the server, run <code>npm run start</code> in the root directory.

You can test the API after running sample_data.sql in your database, which populates it with some sample data. You can also populate it by api queries, if you want to (much more tedious).

## Use

Replace variables shown here with their actual value, for example <code>/tasks/{id}</code> would be <code>/tasks/5</code> etc.

* <code>GET</code> all devices: <code>/devices</code>
* <code>GET</code> all maintenance tasks: <code>/tasks</code>
* <code>GET</code> specific task by id: <code>/tasks/{id}</code>
* <code>GET</code> all tasks related to specific device: <code>/tasks?device={device name}</code>
* <code>GET</code> all tasks related to devices of specific type: <code>/tasks?devicetype={device type}</code>
* <code>GET</code> Filter by partial or full match of the task description: <code>/tasks?description={some text}</code>

* <code>POST</code> new task in JSON format (example values):
<code>
{
"device" : "device1",
"importance" : "critical",
"description" : "electrical problem",
"status" : "open"
}
</code>

Importance and status are case sensitive, for example <code>"importance" : "CRITICAL"</code> would result in error. Device has to point to an existing device name, otherwise you get an error.

* <code>PUT</code> for modifying existing task information works exactly the same way as <code>POST</code>, and the same restrictions apply. Submission time and id can't be modified.
* <code>DELETE</code> a task by specific id: <code>/tasks/{id}</code>

More examples of post, put and delete requests can be found in <code>postman_samples.json</code>
