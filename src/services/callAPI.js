import config from "../config/config.json";
import axios from "axios";
import { firebase } from "../config/firebase-config";
import date from "date-and-time";

let activeEmail = "";
let activeName = "";
let activity = "";
let activeAdmin = false;

let appToken = config.APPToken;

let token = "";

export function deleteUser() {}

export async function getDetails() {
  const { data } = await axios({
    method: "get",
    url: `${config.comAPI}/auth/getUserDetails`,
    headers: { "x-auth-token": token },
  });
  return data;
}

export async function addUserDetails(email, name) {
  const res = await axios({
    method: "put",
    url: `${config.comAPI}/auth/addUser`,
    headers: { "x-auth-token": token },
    data: { email, name },
  });
  if (res.status === 200) {
    return true;
  } else {
    return false;
  }
}

export async function delUser(email) {
  await axios({
    method: "put",
    url: `${config.comAPI}/auth/delUser`,
    headers: { "x-auth-token": token },
    data: { email },
  });
}

export function getUserDetails() {
  return [activeEmail, activeName, activeAdmin];
}

export function setToken(t) {
  token = t;
}

export async function getStatus() {
  const { data } = await axios({
    url: `${config.comAPI}/devices`,
    method: "get",
    headers: { "x-auth-token": token },
  });
  return data;
}

export async function getToken(email) {
  let a = { email: email };
  try {
    const res = await axios({
      url: `${config.comAPI}/auth/getToken`,
      method: "put",
      headers: { "x-auth-token": appToken },
      data: a,
    });
    if (res.status === 200) return res.data;
  } catch (ex) {
    return false;
  }
}

export async function verifyLogin(logintoken) {
  const res = await axios({
    url: `${config.comAPI}/auth/verifyLogin`,
    method: "put",
    headers: { "x-auth-token": logintoken },
  });
  if (res.status === 200) {
    activeEmail = res.data.email;
    activeName = res.data.Name;
    activeAdmin = res.data.admin;
    return res.data;
  }
}

export async function setStatus(values, timer = false) {
  if (timer) {
    let { data } = await axios({
      method: "put",
      url: `${config.comAPI}/devices/timer`,
      headers: { "x-auth-token": token },
      data: values,
    });
    return data;
  } else {
    activity = values;
    WriteUserData();
    let { data } = await axios({
      method: "put",
      url: `${config.comAPI}/devices`,
      headers: { "x-auth-token": token },
      data: values,
    });
    return data;
  }
}

function WriteUserData() {
  const now = new Date();
  let logTime = date.format(now, "hh:mm A, ddd DD MMM");
  let postListRef = firebase.database().ref("Activities");
  let newPostRef = postListRef.push();

  newPostRef.set({
    Email: activeEmail,
    Name: activeName,
    id: activity.device.id,
    State: activity.device.isOn,
    Time: logTime,
  });
}

export function setActiveClient(activeEmail1, activeName1) {
  activeEmail = activeEmail1;
  activeName = activeName1;
}
