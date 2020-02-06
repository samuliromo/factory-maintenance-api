DROP TABLE IF EXISTS Devices, Tasks;

CREATE TABLE Devices( 
  DeviceName VARCHAR PRIMARY KEY,
  DeviceYear INT,
  DeviceType INT NOT NULL
); 

CREATE TABLE Tasks(
  TaskID SERIAL PRIMARY KEY,
  Submitted TIMESTAMP NOT NULL,
  Device VARCHAR NOT NULL REFERENCES Devices(DeviceName),
  Importance INT NOT NULL,
  TaskDescription VARCHAR,
  TaskStatus INT NOT NULL
);