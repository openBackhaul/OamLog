/**
 * <p>This file provides functionality to decode a authorization code</p>  
 * @author      prathiba.jeevan.external@telefonica.com
 * @since       08.11.2021
 * @version     1.0
 * @copyright   Telefónica Germany GmbH & Co. OHG
 * @module FileOperation
 **/

 
 /**
  * @description To decode base64 authorization code from authorization header<br>
  * @param {string} authorizationCode base64 encoded authorization code<br>
  * @returns {Promise} returns user name based on the decoded authorization code
  * <b><u>Procedure :</u></b><br>
  * <b>step 1 :</b> Get the authorization code from the header<br>
  * <b>step 2 :</b> split the authorization code with delimiter "space" to ignore the prefix "basic" from the authorization code<br>
  * <b>step 3 :</b> decode the encoded string (which will result in the format username:password)<br>
  * <b>step 3 :</b> split the text with delimiter ":" to get the username<br>
  **/
 exports.decodeAuthorizationCodeAndExtractUserName = function(authorizationCode) {
     try {
         let base64EncodedString = authorizationCode.split(" ")[1];
         let base64BufferObject = Buffer.from(base64EncodedString, "base64");
         let base64DecodedString = base64BufferObject.toString("utf8");
         let userName = base64DecodedString.split(":")[0];
         console.log("Authorization code : " + authorizationCode);
         console.log("decoded user name: " + userName);
         return userName;
     } catch (error) {
         return undefined;
     }
 }