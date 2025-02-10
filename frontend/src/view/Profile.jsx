import { useState } from "react";

import TableData from "../components/Table";
import {
  Box,
  Tabs,
  Tab,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
const sensorColumns = [
  { id: "timestamp", label: "Timestamp" },
  { id: "temperature", label: "Temperature (°C)" },
  { id: "humidity", label: "Humidity (%)" },
];

const sensorData = [
  { timestamp: "2025-02-10 10:00", temperature: 25, humidity: 60 },
  { timestamp: "2025-02-10 11:00", temperature: 26, humidity: 58 },
];

const deviceLogsColumns = [
  { id: "logId", label: "Log ID" },
  { id: "device", label: "Device" },
  { id: "status", label: "Status" },
  { id: "timestamp", label: "Timestamp" },
];

const deviceLogsData = [
  {
    logId: "001",
    device: "Smart TV",
    status: "On",
    timestamp: "2025-02-10 09:00",
  },
  {
    logId: "002",
    device: "WiFi",
    status: "Off",
    timestamp: "2025-02-10 10:30",
  },
];

function Profile() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSelectedDevice("");
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <Box>
      <p className="uppercase font-[700] text-[2rem] my-5">table data</p>

      {/* Filter */}
      <Box className="flex gap-[4rem] my-[2rem] filter__modal items-center ">
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Filter:
        </Typography>
        <FormControl sx={{ width: "20rem" }} disabled={activeTab === 0}>
          <InputLabel sx={{ fontSize: 12, fontWeight: "700" }}>
            Device
          </InputLabel>
          <Select
            value={selectedDevice}
            onChange={(e) => setSelectedDevice(e.target.value)}
            label="Device"
            sx={{ fontSize: "1rem" }}
          >
            <MenuItem value="">All Devices</MenuItem>
            <MenuItem value="Smart TV">Smart TV</MenuItem>
            <MenuItem value="WiFi">WiFi</MenuItem>
          </Select>
        </FormControl>

        <Box className="inputs-datetime-group">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              className="date-time_from"
              label="Start Date"
              value={startDate}
              onChange={setStartDate}
              disabled={activeTab === 0}
              renderInput={(params) => <TextField {...params} fullWidth />}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: { fontSize: "1.4rem" },
                  InputLabelProps: {
                    sx: {
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                    },
                  },
                },
              }}
            />
            <Box className="next-icon">
              <KeyboardArrowRightIcon sx={{ fontSize: 24 }} />
            </Box>
            <DateTimePicker
              className="date-time_to"
              label="End Date"
              value={endDate}
              onChange={setEndDate}
              disabled={activeTab === 0}
              renderInput={(params) => <TextField {...params} fullWidth />}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: { fontSize: "1.4rem" },
                  InputLabelProps: {
                    sx: {
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>
        </Box>
      </Box>

      {/* content */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        indicatorColor="#fff"
        textColor="primary"
        variant="fullWidth"
      >
        <Tab
          sx={{
            fontSize: "16px",
            color: activeTab === 0 ? "#09006F" : "gray",
            textDecoration: activeTab === 0 ? "underline" : "none",
            "&:hover": {
              backgroundColor: "#f0f4ff",
              color: "#09006F",
            },
            fontWeight: "bold",
          }}
          label="Sensor Data"
        />
        <Tab
          sx={{
            fontSize: "16px",
            color: activeTab === 1 ? "#09006F" : "gray",
            textDecoration: activeTab === 1 ? "underline" : "none",
            fontWeight: "bold",
            "&:hover": {
              backgroundColor: "#f0f4ff",
              color: "#09006F",
            },
          }}
          label="Device Logs"
        />
      </Tabs>

      {activeTab === 0 && (
        <TableData columns={sensorColumns} data={sensorData} />
      )}
      {activeTab === 1 && (
        <TableData columns={deviceLogsColumns} data={deviceLogsData} />
      )}
    </Box>
  );
}

export default Profile;
