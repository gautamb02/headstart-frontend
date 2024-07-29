class Config {
  static readonly API_URL: string = import.meta.env.VITE_API_URL;
  static readonly WA_API: string = import.meta.env.VITE_WA_API;
  static readonly WA_SENDER_NUMBER: string = import.meta.env.VITE_WA_SENDER_NUMBER;
  static readonly WA_TEMPLATE_ID: string = import.meta.env.VITE_WA_TEMPLATE_ID;
  static readonly WA_TEMPLATE_NAME: string = import.meta.env.VITE_WA_TEMPLATE_NAME;
  static readonly WA_USERID: string = import.meta.env.VITE_WA_USERID;
  static readonly WA_MSG: string = `नमस्ते ,

  आपल्या शी संवाद साधण्यासाठी हा मेसेज पाठवत आहे 
  
  धन्यवाद 
  आपला`

}

export default Config;
