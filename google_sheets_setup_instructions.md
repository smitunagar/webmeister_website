# 📊 Google Sheets Integration - Setup Instructions

## ✅ What I've Done

I've already updated your waitlist forms to integrate with Google Sheets. Now you just need to complete these 5 simple steps:

---

## 🚀 Step-by-Step Setup (20 minutes)

### **Step 1: Create Your Google Sheet** (5 minutes)

1. Go to **https://sheets.google.com**
2. Click **"Blank"** to create a new spreadsheet
3. **Name it**: `WebMeister360 - Waitlist`
4. **Add these column headers in Row 1** (copy and paste this row):

```
Timestamp	Name	Email	Phone	Company	Customer Type	Product Interest	Industry	Business Size	Country	City	Message	Newsletter	Language	Source
```

Or add them individually:
- **A1**: Timestamp
- **B1**: Name
- **C1**: Email
- **D1**: Phone
- **E1**: Company
- **F1**: Customer Type
- **G1**: Product Interest
- **H1**: Industry
- **I1**: Business Size
- **J1**: Country
- **K1**: City
- **L1**: Message
- **M1**: Newsletter
- **N1**: Language
- **O1**: Source

5. **Optional**: Make headers bold and add background color

---

### **Step 2: Create Google Apps Script** (10 minutes)

1. In your Google Sheet, click **Extensions → Apps Script**
2. You'll see a code editor with some default code
3. **Delete all the existing code**
4. **Copy the entire script from below** and paste it:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    var data = JSON.parse(e.postData.contents);
    
    // Create a new row with the data
    var newRow = [
      new Date(),                    // Timestamp
      data.name || '',               // Name
      data.email || '',              // Email
      data.phone || '',              // Phone
      data.company || '',            // Company
      data.customer_type || '',      // Customer Type
      data.product_interest || '',   // Product Interest
      data.industry || '',           // Industry
      data.business_size || '',      // Business Size
      data.country || '',            // Country
      data.city || '',               // City
      data.message || '',            // Message
      data.newsletter ? 'Yes' : 'No', // Newsletter
      data.language || 'en',         // Language
      data.source || 'waitlist_page' // Source
    ];
    
    // Append the new row to the sheet
    sheet.appendRow(newRow);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({
        'success': true,
        'message': 'Data saved successfully'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({
        'success': false,
        'message': error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function (optional - for testing in Apps Script editor)
function testPost() {
  var testData = {
    postData: {
      contents: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        phone: '+49 123 456 7890',
        company: 'Test Company',
        customer_type: 'business',
        product_interest: 'ioms_business',
        industry: 'restaurant',
        business_size: 'small',
        country: 'Germany',
        city: 'Reutlingen',
        message: 'This is a test message',
        newsletter: true,
        language: 'en',
        source: 'test'
      })
    }
  };
  
  var result = doPost(testData);
  Logger.log(result.getContent());
}
```

5. **Click the Save icon** (💾) or press `Ctrl+S` / `Cmd+S`
6. **Name your project**: `Waitlist Integration`

---

### **Step 3: Deploy the Script** (5 minutes)

1. **Click "Deploy" button** (top right) → Select **"New deployment"**
2. Click the **gear icon** ⚙️ next to "Select type"
3. Select **"Web app"**
4. Configure the deployment:
   - **Description**: `Waitlist Form Handler`
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone**
5. **Click "Deploy"**
6. **Authorize the app**:
   - Click **"Authorize access"**
   - Choose your **Google account**
   - You'll see a warning screen:
     - Click **"Advanced"**
     - Click **"Go to [Project Name] (unsafe)"** (this is safe, it's your own script)
     - Click **"Allow"**
7. **Copy the Web App URL** - It will look like:
   ```
   https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXXXXXXXXXXXX/exec
   ```
8. **SAVE THIS URL** - You'll need it in the next step!

---

### **Step 4: Update Your Code** (2 minutes)

1. Open these two files in your code editor:
   - `waitlist.html`
   - `waitlist-de.html`

2. In **BOTH files**, find this line (around line 617):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```

3. **Replace** `'YOUR_GOOGLE_SCRIPT_URL_HERE'` with your actual URL from Step 3:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXX/exec';
   ```

4. **Save both files**

---

### **Step 5: Test the Integration** (3 minutes)

#### **Option A: Test in Apps Script Editor (Recommended First)**

1. Go back to your Apps Script editor
2. In the toolbar, select **"testPost"** from the function dropdown
3. Click the **"Run"** button (▶️)
4. Check your Google Sheet - you should see a new row with test data!

#### **Option B: Test on Your Website**

1. Deploy your changes to Netlify (or run locally)
2. Go to `http://your-site.com/waitlist.html`
3. Fill out the form (you can leave fields empty since they're all optional)
4. Click "Join the Waitlist"
5. Check your Google Sheet - you should see a new row with your data!

---

## 🎉 What Happens When Someone Submits

1. User fills out waitlist form
2. Clicks "Join the Waitlist"
3. Form shows loading spinner
4. Data is sent to Google Apps Script
5. Script adds a new row to your Google Sheet
6. User sees success message
7. You can view all submissions in your Google Sheet!

---

## 📊 Managing Your Data

### **View Submissions**
- Just open your Google Sheet anytime to see all waitlist signups

### **Export Data**
- **File → Download → CSV** or any other format

### **Filter & Sort**
- Use Google Sheets built-in filters
- Sort by timestamp, product interest, etc.

### **Share with Team**
- Click "Share" button to give access to team members

---

## 🔧 Troubleshooting

### **Problem: Form submits but no data appears in sheet**

**Solution:**
1. Check that you copied the correct Web App URL
2. Make sure you deployed the script as "Anyone" can access
3. Check the Apps Script "Executions" tab for errors

### **Problem: "Authorization required" error**

**Solution:**
1. Go back to Apps Script
2. Re-deploy the script
3. Make sure to authorize when prompted

### **Problem: Data appears but columns are mixed up**

**Solution:**
1. Check that your column headers exactly match the names in the instructions
2. The order matters! A1 should be "Timestamp", B1 should be "Name", etc.

---

## 📈 Pro Tips

### **1. Set up Email Notifications**
In your Google Sheet:
1. **Tools → Notification rules**
2. Select "Notify me when... A user submits a form"
3. Get emails when someone joins the waitlist!

### **2. Create a Dashboard**
Use Google Sheets charts to visualize:
- Total signups over time
- Most popular products
- Geographic distribution
- Customer type breakdown

### **3. Export Regularly**
Download a backup CSV weekly to keep your data safe

### **4. Monitor Usage**
Check Apps Script:
- Go to **"Executions"** tab
- See how many times your script ran
- Check for any errors

---

## 🚀 Next Steps (Optional)

Once you're comfortable with this setup:

1. **Add Email Automation**: Use Google Apps Script to send confirmation emails
2. **Migrate to Supabase**: When you need more advanced features
3. **Add Analytics**: Track conversion rates
4. **Create Follow-up Workflows**: Segment users by product interest

---

## 📞 Need Help?

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the Apps Script "Executions" tab for error logs
3. Make sure the Web App URL is correctly copied to both HTML files

---

## ✅ Checklist

- [ ] Created Google Sheet with correct column headers
- [ ] Copied Apps Script code into Google Apps Script editor
- [ ] Deployed script as Web App
- [ ] Copied Web App URL
- [ ] Updated `waitlist.html` with the URL
- [ ] Updated `waitlist-de.html` with the URL
- [ ] Tested with testPost() function
- [ ] Tested with actual form submission
- [ ] Verified data appears in Google Sheet

---

**Last Updated**: October 14, 2025
**Setup Time**: ~20 minutes
**Cost**: $0 (FREE forever!)


