// //initial code for saving the received mqtt topics
// client.on("message", (receivedTopic, message) => {
//   // Check if the received topic is one of the subscribed topics
//   if (topics.includes(receivedTopic)) {
//     try {
//       // Parse the received JSON data
//       const jsonData = JSON.parse(message.toString());
//       // console.log(jsonData.modbusRTU);
//       console.log(jsonData);
//       const newData = new DataModel(jsonData);
//       newData.topic = receivedTopic;
//       // Save the document to the database
//       newData
//         .save()
//         .then(() => {
//           console.log("Data saved successfully");
//         })
//         .catch((error) => {
//           console.error("Error saving data:", error);
//         });
//     } catch (error) {
//       console.error("Error parsing JSON data:", error.message);
//     }
//   }
// });

// //Not correct

// const tempDataStorage = {};

// client.on("message", (receivedTopic, message) => {
//   // Check if the received topic is one of the subscribed topics
//   if (topics.includes(receivedTopic)) {
//     try {
//       // Parse the received JSON data
//       const jsonData = JSON.parse(message.toString());
//       const machineName = "3wayobc";

//       if (jsonData.hasOwnProperty(machineName)) {
//         const machineData = JSON.parse(jsonData[machineName]);

//         // Initialize the storage for the machine if not already done
//         if (!tempDataStorage[machineName]) {
//           tempDataStorage[machineName] = {
//             Good_Part: undefined,
//             Bad_part: undefined,
//             Total_parts: undefined,
//             IDEAL_TIME_IN_min: undefined,
//             MAC_ON_OFF_TIME: undefined,
//           };
//         }

//         // Update the storage with the new data
//         for (let key in machineData) {
//           if (machineData.hasOwnProperty(key)) {
//             tempDataStorage[machineName][key] = machineData[key][0];
//           }
//         }

//         // Check if all expected keys are present
//         const isComplete = Object.values(tempDataStorage[machineName]).every(
//           (val) => val !== undefined
//         );

//         if (isComplete) {
//           // Print the aggregated data to the console
//           console.log("Machine Name:", machineName);
//           console.log("Good_Part:", tempDataStorage[machineName].Good_Part);
//           console.log("Bad_part:", tempDataStorage[machineName].Bad_part);
//           console.log("Total_parts:", tempDataStorage[machineName].Total_parts);
//           console.log(
//             "IDEAL_TIME_IN_min:",
//             tempDataStorage[machineName].IDEAL_TIME_IN_min
//           );
//           console.log(
//             "MAC_ON_OFF_TIME:",
//             tempDataStorage[machineName].MAC_ON_OFF_TIME
//           );

//           // Save the document to the database
//           const newData = new DataModel({
//             machineName,
//             Good_Part: tempDataStorage[machineName].Good_Part,
//             Bad_part: tempDataStorage[machineName].Bad_part,
//             Total_parts: tempDataStorage[machineName].Total_parts,
//             IDEAL_TIME_IN_min: tempDataStorage[machineName].IDEAL_TIME_IN_min,
//             MAC_ON_OFF_TIME: tempDataStorage[machineName].MAC_ON_OFF_TIME,
//             topic: receivedTopic,
//           });

//           newData
//             .save()
//             .then(() => {
//               console.log("Data saved successfully");
//             })
//             .catch((error) => {
//               console.error("Error saving data:", error);
//             });

//           // Clear the storage for the next set of data
//           tempDataStorage[machineName] = {
//             Good_Part: undefined,
//             Bad_part: undefined,
//             Total_parts: undefined,
//             IDEAL_TIME_IN_min: undefined,
//             MAC_ON_OFF_TIME: undefined,
//           };
//         }
//       }
//     } catch (error) {
//       console.error("Error parsing JSON data:", error.message);
//     }
//   }
// });

// //latest and correct
// const tempDataStorage = {};

// client.on("message", (receivedTopic, message) => {
//   // Check if the received topic is one of the subscribed topics
//   if (topics.includes(receivedTopic)) {
//     try {
//       // Parse the received JSON data
//       const jsonData = JSON.parse(message.toString());
//       // Assuming jsonData has only one key which is the machine name
//       const machineName = Object.keys(jsonData)[0];

//       if (machineName) {
//         const machineData = JSON.parse(jsonData[machineName]);

//         // Initialize the storage for the machine if not already done
//         if (!tempDataStorage[machineName]) {
//           tempDataStorage[machineName] = {
//             Good_Part: undefined,
//             Bad_part: undefined,
//             Total_parts: undefined,
//             IDEAL_TIME_IN_min: undefined,
//             MAC_ON_OFF_TIME: undefined,
//           };
//         }

//         // Update the storage with the new data
//         for (let key in machineData) {
//           if (machineData.hasOwnProperty(key)) {
//             tempDataStorage[machineName][key] = machineData[key][0];
//           }
//         }

//         // Check if all expected keys are present
//         const isComplete = Object.values(tempDataStorage[machineName]).every(
//           (val) => val !== undefined
//         );

//         if (isComplete) {
//           // Print the aggregated data to the console
//           console.log("Machine Name:", machineName);
//           console.log("Good_Part:", tempDataStorage[machineName].Good_Part);
//           console.log("Bad_part:", tempDataStorage[machineName].Bad_part);
//           console.log("Total_parts:", tempDataStorage[machineName].Total_parts);
//           console.log(
//             "IDEAL_TIME_IN_min:",
//             tempDataStorage[machineName].IDEAL_TIME_IN_min
//           );
//           console.log(
//             "MAC_ON_OFF_TIME:",
//             tempDataStorage[machineName].MAC_ON_OFF_TIME
//           );

//           // Save the document to the database
//           const newData = new DataModel({
//             machineName,
//             Good_Part: tempDataStorage[machineName].Good_Part,
//             Bad_part: tempDataStorage[machineName].Bad_part,
//             Total_parts: tempDataStorage[machineName].Total_parts,
//             IDEAL_TIME_IN_min: tempDataStorage[machineName].IDEAL_TIME_IN_min,
//             MAC_ON_OFF_TIME: tempDataStorage[machineName].MAC_ON_OFF_TIME,
//             topic: receivedTopic,
//           });

//           newData
//             .save()
//             .then(() => {
//               console.log("Data saved successfully");
//             })
//             .catch((error) => {
//               console.error("Error saving data:", error);
//             });

//           // Clear the storage for the next set of data
//           tempDataStorage[machineName] = {
//             Good_Part: undefined,
//             Bad_part: undefined,
//             Total_parts: undefined,
//             IDEAL_TIME_IN_min: undefined,
//             MAC_ON_OFF_TIME: undefined,
//           };
//         }
//       }
//     } catch (error) {
//       console.error("Error parsing JSON data:", error.message);
//     }
//   }
// });

////////////////////////////////////
//charts -> apex chart -> spline area
