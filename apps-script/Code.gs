/**
 * Education Consultancy - enquiry receiver
 *
 * Paste this whole file into the Apps Script editor that is attached to the
 * consultancy's Google Sheet (Extensions > Apps Script).
 * Full steps are in docs/GOOGLE_SHEETS_SETUP.md.
 *
 * Script Properties to set (Project Settings > Script properties):
 *   NOTIFY_EMAIL   the address that receives new-enquiry emails
 *   SHARED_SECRET  a long random string; the same value goes in APPS_SCRIPT_SECRET
 *                  on the website
 */

var SHEET_NAME = "Enquiries";
var TIMEZONE = "Asia/Kolkata";
var HEADERS = [
  "Submission ID",
  "Submission Date and Time",
  "Student Name",
  "Mobile Number",
  "Email Address",
  "Preferred Course",
  "Preferred Location",
  "Preferred College",
  "Additional Message",
  "Enquiry Status",
];

/** Run this once by hand to create the sheet tab and headings. */
function setupSheet() {
  var sheet = getSheet_();
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
}

/** Receives a form submission from the website server. */
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var props = PropertiesService.getScriptProperties();

    // Reject requests that do not carry the shared secret
    var secret = props.getProperty("SHARED_SECRET");
    if (!secret || data.secret !== secret) {
      return jsonResponse_({ ok: false, error: "unauthorized" });
    }

    var problem = validate_(data);
    if (problem) {
      return jsonResponse_({ ok: false, error: problem });
    }

    // Only one submission is processed at a time, so duplicates cannot slip in
    var lock = LockService.getScriptLock();
    lock.waitLock(15000);
    try {
      var sheet = getSheet_();
      var submittedAt = Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd HH:mm:ss");

      // The website reuses the same Submission ID when a visitor retries,
      // so a retry never creates a second row
      if (!isAlreadySaved_(sheet, data.submissionId)) {
        saveRow_(sheet, data, submittedAt);
      }
      sendEmailOnce_(data, submittedAt);
    } finally {
      lock.releaseLock();
    }

    return jsonResponse_({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse_({ ok: false, error: "server_error" });
  }
}

function getSheet_() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function isAlreadySaved_(sheet, submissionId) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  var found = sheet
    .getRange(2, 1, lastRow - 1, 1)
    .createTextFinder(submissionId)
    .matchEntireCell(true)
    .findNext();
  return found !== null;
}

function saveRow_(sheet, data, submittedAt) {
  var rowNumber = sheet.getLastRow() + 1;
  var range = sheet.getRange(rowNumber, 1, 1, HEADERS.length);

  // Plain-text format: values such as "=1+1" stay text and are never run as
  // formulas, and mobile numbers keep their exact digits
  range.setNumberFormat("@");
  range.setValues([
    [
      data.submissionId,
      submittedAt,
      data.name,
      data.mobile,
      data.email,
      data.course,
      data.location,
      data.college,
      data.message,
      "New",
    ],
  ]);
}

function sendEmailOnce_(data, submittedAt) {
  var cache = CacheService.getScriptCache();
  var cacheKey = "emailed_" + data.submissionId;
  if (cache.get(cacheKey)) return; // already notified for this submission

  var recipient = PropertiesService.getScriptProperties().getProperty("NOTIFY_EMAIL");
  if (!recipient) throw new Error("NOTIFY_EMAIL script property is not set.");

  var rows = [
    ["Student name", data.name],
    ["Mobile number", data.mobile],
    ["Email", data.email],
    ["Preferred course", data.course],
    ["Preferred location", data.location],
    ["Preferred college", data.college || "Not given"],
    ["Message", data.message || "Not given"],
    ["Submitted", submittedAt],
  ];

  var textBody = "New Student Enquiry\n\n" + rows
    .map(function (row) { return row[0] + ": " + row[1]; })
    .join("\n");

  var htmlRows = rows
    .map(function (row) {
      return (
        '<tr><td style="padding:6px 16px 6px 0;color:#555;vertical-align:top">' +
        escapeHtml_(row[0]) +
        '</td><td style="padding:6px 0;white-space:pre-wrap">' +
        escapeHtml_(row[1]) +
        "</td></tr>"
      );
    })
    .join("");

  var htmlBody =
    '<div style="font-family:Arial,sans-serif;font-size:15px;color:#14153b">' +
    '<h2 style="margin:0 0 12px">New Student Enquiry</h2>' +
    "<table>" + htmlRows + "</table></div>";

  MailApp.sendEmail({
    to: recipient,
    subject: "New student enquiry: " + data.name,
    body: textBody,
    htmlBody: htmlBody,
    replyTo: data.email,
  });

  cache.put(cacheKey, "1", 21600); // remember for 6 hours
}

/** Second line of defence. The website has already validated these values. */
function validate_(data) {
  var uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  var fields = ["submissionId", "name", "mobile", "email", "course", "location"];
  for (var i = 0; i < fields.length; i++) {
    if (typeof data[fields[i]] !== "string" || data[fields[i]] === "") {
      return "missing_" + fields[i];
    }
  }
  if (!uuid.test(data.submissionId)) return "bad_submission_id";
  if (data.name.length < 2 || data.name.length > 80) return "bad_name";
  if (!/^[6-9]\d{9}$/.test(data.mobile)) return "bad_mobile";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email) || data.email.length > 120) {
    return "bad_email";
  }
  if (String(data.college || "").length > 120) return "bad_college";
  if (String(data.message || "").length > 1000) return "bad_message";
  data.college = String(data.college || "");
  data.message = String(data.message || "");
  return "";
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function jsonResponse_(object) {
  return ContentService.createTextOutput(JSON.stringify(object)).setMimeType(
    ContentService.MimeType.JSON
  );
}
