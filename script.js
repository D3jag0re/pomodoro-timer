const STORAGE_KEY = "pomodoro-timer-settings";

const defaultSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
};

const state = {
  settings: loadSettings(),
  sessionType: "work",
  timerStatus: "idle",
  completedWorkSessions: 0,
  remainingSeconds: 0,
  intervalId: null,
};

const sessionLabels = {
  work: "Work",
  shortBreak: "Short Break",
  longBreak: "Long Break",
};

const timerDisplay = document.getElementById("timer-display");
const sessionLabel = document.getElementById("session-label");
const completedCount = document.getElementById("completed-count");
const statusBanner = document.getElementById("status-banner");

const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const resumeButton = document.getElementById("resume-button");
const resetButton = document.getElementById("reset-button");

const settingsForm = document.getElementById("settings-form");
const workDurationInput = document.getElementById("work-duration");
const shortBreakInput = document.getElementById("short-break-duration");
const longBreakInput = document.getElementById("long-break-duration");
const longBreakIntervalInput = document.getElementById("long-break-interval");

state.remainingSeconds = getDurationForSession(state.sessionType);

populateForm();
render();

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resumeButton.addEventListener("click", resumeTimer);
resetButton.addEventListener("click", resetCurrentSession);

settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nextSettings = {
    workDuration: getNumericValue(workDurationInput),
    shortBreakDuration: getNumericValue(shortBreakInput),
    longBreakDuration: getNumericValue(longBreakInput),
    longBreakInterval: getNumericValue(longBreakIntervalInput),
  };

  state.settings = nextSettings;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(nextSettings));

  if (state.timerStatus === "idle") {
    state.remainingSeconds = getDurationForSession(state.sessionType);
  }

  render("Settings saved.");
});

function loadSettings() {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return { ...defaultSettings };
  }

  try {
    const parsed = JSON.parse(saved);

    return {
      workDuration: sanitizeNumber(parsed.workDuration, defaultSettings.workDuration),
      shortBreakDuration: sanitizeNumber(parsed.shortBreakDuration, defaultSettings.shortBreakDuration),
      longBreakDuration: sanitizeNumber(parsed.longBreakDuration, defaultSettings.longBreakDuration),
      longBreakInterval: sanitizeNumber(parsed.longBreakInterval, defaultSettings.longBreakInterval),
    };
  } catch {
    return { ...defaultSettings };
  }
}

function sanitizeNumber(value, fallback) {
  const numericValue = Number(value);
  return Number.isFinite(numericValue) && numericValue > 0 ? numericValue : fallback;
}

function getNumericValue(input) {
  return sanitizeNumber(input.value, 1);
}

function getDurationForSession(sessionType) {
  const durationMinutes = {
    work: state.settings.workDuration,
    shortBreak: state.settings.shortBreakDuration,
    longBreak: state.settings.longBreakDuration,
  }[sessionType];

  return durationMinutes * 60;
}

function startTimer() {
  if (state.timerStatus === "running") {
    return;
  }

  if (state.timerStatus === "idle") {
    state.remainingSeconds = getDurationForSession(state.sessionType);
  }

  state.timerStatus = "running";
  state.intervalId = window.setInterval(tick, 1000);
  render(`Started ${sessionLabels[state.sessionType].toLowerCase()} session.`);
}

function pauseTimer() {
  if (state.timerStatus !== "running") {
    return;
  }

  window.clearInterval(state.intervalId);
  state.intervalId = null;
  state.timerStatus = "paused";
  render("Timer paused.");
}

function resumeTimer() {
  if (state.timerStatus !== "paused") {
    return;
  }

  state.timerStatus = "running";
  state.intervalId = window.setInterval(tick, 1000);
  render(`Resumed ${sessionLabels[state.sessionType].toLowerCase()} session.`);
}

function resetCurrentSession() {
  window.clearInterval(state.intervalId);
  state.intervalId = null;
  state.timerStatus = "idle";
  state.remainingSeconds = getDurationForSession(state.sessionType);
  render(`Reset ${sessionLabels[state.sessionType].toLowerCase()} session.`);
}

function tick() {
  if (state.remainingSeconds > 0) {
    state.remainingSeconds -= 1;
    render();
  }

  if (state.remainingSeconds === 0) {
    completeSession();
  }
}

function completeSession() {
  window.clearInterval(state.intervalId);
  state.intervalId = null;
  playNotificationTone();

  const finishedSession = state.sessionType;

  if (finishedSession === "work") {
    state.completedWorkSessions += 1;
    const shouldUseLongBreak = state.completedWorkSessions % state.settings.longBreakInterval === 0;
    state.sessionType = shouldUseLongBreak ? "longBreak" : "shortBreak";
  } else {
    state.sessionType = "work";
  }

  state.remainingSeconds = getDurationForSession(state.sessionType);
  state.timerStatus = "idle";

  render(`${sessionLabels[finishedSession]} complete. ${sessionLabels[state.sessionType]} is ready.`);
}

function render(customStatusMessage) {
  timerDisplay.textContent = formatTime(state.remainingSeconds);
  sessionLabel.textContent = sessionLabels[state.sessionType];
  completedCount.textContent = String(state.completedWorkSessions);
  updateControlStates();

  if (customStatusMessage) {
    statusBanner.textContent = customStatusMessage;
    return;
  }

  const statusMessages = {
    idle: `${sessionLabels[state.sessionType]} session is ready to start.`,
    running: `${sessionLabels[state.sessionType]} session is in progress.`,
    paused: `${sessionLabels[state.sessionType]} session is paused.`,
  };

  statusBanner.textContent = statusMessages[state.timerStatus];
}

function updateControlStates() {
  const initialDurationForSession = getDurationForSession(state.sessionType);
  const isFreshSession =
    state.timerStatus === "idle" && state.remainingSeconds === initialDurationForSession;

  startButton.disabled = state.timerStatus !== "idle";
  pauseButton.disabled = state.timerStatus !== "running";
  resumeButton.disabled = state.timerStatus !== "paused";
  resetButton.disabled = isFreshSession;
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function populateForm() {
  workDurationInput.value = String(state.settings.workDuration);
  shortBreakInput.value = String(state.settings.shortBreakDuration);
  longBreakInput.value = String(state.settings.longBreakDuration);
  longBreakIntervalInput.value = String(state.settings.longBreakInterval);
}

function playNotificationTone() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;

  if (!AudioContextClass) {
    return;
  }

  const audioContext = new AudioContextClass();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(880, audioContext.currentTime);
  gainNode.gain.setValueAtTime(0.0001, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.12, audioContext.currentTime + 0.03);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.55);

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.55);
  oscillator.addEventListener("ended", () => {
    audioContext.close();
  });
}
