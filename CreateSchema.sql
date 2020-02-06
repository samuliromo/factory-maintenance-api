/*initialize the database schema*/

DROP TABLE IF EXISTS Devices, Tasks;

CREATE TYPE IMP AS ENUM ('minor', 'important', 'critical');
CREATE TYPE TSTATUS AS ENUM ('solved', 'open');

CREATE TABLE Devices( 
  DeviceName VARCHAR PRIMARY KEY,
  DeviceYear INT,
  DeviceType INT NOT NULL
); 

CREATE TABLE Tasks(
  TaskID SERIAL PRIMARY KEY,
  Submitted TIMESTAMP NOT NULL,
  Device VARCHAR NOT NULL REFERENCES Devices(DeviceName),
  Importance IMP NOT NULL,
  TaskDescription VARCHAR,
  TaskStatus TSTATUS NOT NULL
);