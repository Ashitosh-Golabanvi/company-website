/**
 * Vercel Serverless Function: API Contact Proxy
 * 
 * Securely proxies contact form requests from the frontend Angular application to Web3Forms.
 * This prevents the Web3Forms Access Key from being exposed to the client browser.
 */

export default async function handler(req, res) {
  // 1. Enforce POST requests only
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({
      success: false,
      message: `Method ${req.method} Not Allowed. Use POST instead.`
    });
  }

  try {
    const { name, email, company, phone, projectType, budget, timeline, message } = req.body || {};

    // 2. Trim whitespace and sanitize inputs
    const cleanName = (name || '').trim();
    const cleanEmail = (email || '').trim();
    const cleanCompany = (company || '').trim();
    const cleanPhone = (phone || '').trim();
    const cleanProjectType = (projectType || '').trim();
    const cleanBudget = (budget || '').trim();
    const cleanTimeline = (timeline || '').trim();
    const cleanMessage = (message || '').trim();

    // 3. Validation: Reject missing required fields
    if (!cleanName) {
      return res.status(400).json({ success: false, message: 'Full Name is required.' });
    }
    if (!cleanEmail) {
      return res.status(400).json({ success: false, message: 'Email address is required.' });
    }
    if (!cleanProjectType) {
      return res.status(400).json({ success: false, message: 'Project Type is required.' });
    }
    if (!cleanMessage) {
      return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    // 4. Validation: Verify email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ success: false, message: 'Invalid email address format.' });
    }

    // 5. Validation: Prevent spam/overflow with extremely long messages (> 5000 chars)
    if (cleanMessage.length > 5000) {
      return res.status(400).json({
        success: false,
        message: 'Message is too long. Maximum allowed length is 5000 characters.'
      });
    }

    // 6. Retrieve secret from environment variable
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      console.error('[Error] WEB3FORMS_ACCESS_KEY environment variable is not configured.');
      return res.status(500).json({
        success: false,
        message: 'Server configuration error. Submission could not be processed.'
      });
    }

    // 7. Construct Web3Forms payload with custom formatted headers for premium email presentation
    const web3FormsPayload = {
      access_key: accessKey,
      subject: `🚨 [CLIENT REQUIREMENT] ${cleanProjectType} - ${cleanName}`,
      from_name: 'Client Requirement Alert',
      replyto: cleanEmail, // Clicking reply in your email client will automatically reply to the user
      'Client Name': cleanName,
      'Client Email': cleanEmail,
      'Company Name': cleanCompany || 'Not Provided',
      'Phone Number': cleanPhone || 'Not Provided',
      'Project Type': cleanProjectType,
      'Estimated Budget': cleanBudget || 'Not Provided',
      'Desired Timeline': cleanTimeline || 'Not Provided',
      'Requirements Details': cleanMessage,
    };

    // 8. Forward request to Web3Forms API
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(web3FormsPayload),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        message: data.message || `Web3Forms endpoint responded with error: ${response.statusText}`
      });
    }

    // 9. Forward exact response from Web3Forms
    return res.status(200).json(data);
  } catch (error) {
    console.error('[Inquiry Serverless Proxy Error]', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error. Please try again later.'
    });
  }
}
