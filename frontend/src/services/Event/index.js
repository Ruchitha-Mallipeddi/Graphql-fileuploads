import { urls } from "../../constants";
import axios from "axios";

// export const fetchAllEventsApi = async (queryParams) => {
//   const url = urls.getAllEvents + queryParams;
//   try {
//     const resp = await axios.get(url);
//     if (resp.status === 200) {
//       if (resp.data.length > 0) {
//         resp.data.map((whiteBoardEvent) => {
//           var taskId = whiteBoardEvent["task_id"];
//           whiteBoardEvent["task_id"] = window.localStorage.getItem(taskId);
//           var status = whiteBoardEvent["status"];
//           whiteBoardEvent["status"] = statusContants[status];
//           var dateTime = whiteBoardEvent["scheduled"];
//           whiteBoardEvent["scheduled"] = `${moment(dateTime).format("L")} ${moment(dateTime).format("LT")}`;
//         });
//       }
//       return resp.data;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

export const createEventApi = async (payload) => {
  try {
    await axios.post(urls.eventBase, payload);
  } catch (err) {
    console.log(err);
    // TODO: Add a modal or something to notify user regarding the issue here
  }
};

export const updateEventApi = async (eventId, payload) => {
  try {
    await axios.put(`${urls.eventBase}/${eventId}`, payload);
  } catch (error) {
    console.warn(error);
    // TODO: Show user the error message
  }
};

export const fetchEventDetails = async (eventId) => {
  try {
    const response = await axios.get(`${urls.eventBase}/${eventId}`);
    return response.data;
  } catch {
    console.log("error");
  }
};
