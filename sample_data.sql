/*random sample data for testing purposes*/

insert into devices (devicename, deviceyear, devicetype) values ('device1', 1993, 1);
insert into devices (devicename, deviceyear, devicetype) values ('device2', 1999, 1);
insert into devices (devicename, deviceyear, devicetype) values ('device3', 2005, 2);
insert into devices (devicename, deviceyear, devicetype) values ('device4', 2010, 3);
insert into devices (devicename, deviceyear, devicetype) values ('device5', 2020, 4);

insert into tasks (device, importance, taskdescription, taskstatus, submitted) values ('device1', 'minor', 'jotain meni rikki', 'open', current_timestamp);
insert into tasks (device, importance, taskdescription, taskstatus, submitted) values ('device1', 'minor', 'mittari epäkunnossa', 'open', current_timestamp);
insert into tasks (device, importance, taskdescription, taskstatus, submitted) values ('device2', 'critical', 'täysin hajalla', 'solved', '2019-02-06T14:27:46.584Z');
insert into tasks (device, importance, taskdescription, taskstatus, submitted) values ('device3', 'critical', 'pumppu hajalla', 'open', current_timestamp);
insert into tasks (device, importance, taskdescription, taskstatus, submitted) values ('device4', 'important', 'sähkövika', 'open', current_timestamp);
insert into tasks (device, importance, taskdescription, taskstatus, submitted) values ('device5', 'important', 'vaatii kausihuoltoa', 'open', current_timestamp);
insert into tasks (device, importance, taskdescription, taskstatus, submitted) values ('device5', 'minor', 'tuntematon vika', 'open', '2020-02-06T14:27:46.584Z');