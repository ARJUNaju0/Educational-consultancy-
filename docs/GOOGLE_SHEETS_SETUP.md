# Google Sheets and email setup

Do these steps while signed in to the **consultancy's own Google account**, so the sheet and script belong to the agency.

## 1. Create the sheet

1. Go to https://sheets.google.com and create a blank spreadsheet. Name it, for example, "Student Enquiries".
2. Leave it private. Do **not** use "Share > Anyone with the link".

## 2. Add the script

1. In the sheet, open **Extensions > Apps Script**.
2. Delete the sample code, then paste in the full contents of `apps-script/Code.gs` from this project.
3. Click **Save**.

## 3. Set the script properties

1. In Apps Script, open **Project Settings** (gear icon) and scroll to **Script properties**.
2. Add two properties:
   - `NOTIFY_EMAIL`: the address that should receive new-enquiry emails.
   - `SHARED_SECRET`: a long random string, at least 32 characters. A password manager can generate one. Keep a copy, you need it in step 6.

## 4. Create the headings and authorise

1. In the editor, choose the function `setupSheet` in the toolbar and click **Run**.
2. Google asks for permission. Click **Review permissions**, choose the agency account, then **Advanced > Go to (project name) (unsafe)** and **Allow**. This screen appears because the script is your own and has not been through Google's review. It is expected.
3. The permissions requested are: view and manage your spreadsheets (to save enquiries) and send email as you (to send notifications).
4. Check the sheet: a tab named **Enquiries** with the ten column headings should now exist.

## 5. Deploy as a Web App

1. Click **Deploy > New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set **Execute as: Me** and **Who has access: Anyone**.
   "Anyone" is needed so the website server can reach the script. The `SHARED_SECRET` stops anyone else from using it, and the sheet itself stays private.
4. Click **Deploy** and copy the **Web app URL**. It ends in `/exec`.

## 6. Connect the website

Local development, in `.env.local`:

```
GOOGLE_APPS_SCRIPT_URL=<the Web app URL>
APPS_SCRIPT_SECRET=<the same value as SHARED_SECRET>
```

Production: add the same two variables in Netlify under **Site configuration > Environment variables**, then redeploy. `.env.local` is not uploaded to Netlify.

Never put these two values in any file that starts with `NEXT_PUBLIC_`, and never commit `.env.local`.

## 7. Test

1. Run the site, submit the enquiry form.
2. A new row should appear in the **Enquiries** tab and an email should arrive at `NOTIFY_EMAIL` (check spam the first time).

## Changing the script later

If you edit `Code.gs`, use **Deploy > Manage deployments > Edit (pencil) > Version: New version > Deploy**. The Web app URL stays the same. Saving alone does not update the live version.

## Download as Excel

In the sheet: **File > Download > Microsoft Excel (.xlsx)**.

## Limits to know about

- Gmail accounts can send about 100 emails a day through the script, and Google Workspace accounts about 1,500. Enquiries are still saved if the limit is reached, but the email will fail and the visitor will see an error.
- If saving works but the email fails, the visitor sees an error. When they press Send again, the row is not duplicated and the email is retried.
- Do not rename the column headings or move the **Enquiries** tab without updating `Code.gs`.
