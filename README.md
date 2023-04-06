# xtravision-js-sdk


Using browserify module, we have converted `@xtravision/xtravision-react` module to a browser friendly version of the CommonJS module.

---

### How to Setup and Configure JS-SDK in your web-page?  
 (See `demo-app` for reference )  

 1. Load JS-SDK with absolute path. (Download `xtravision-js-sdk..min.js` file)
    ```javascript
    <script src="xtravision-js-sdk..min.js"> </script>
    ```
    OR use `jsdelivr` CDN Service:
    
    ```javascript
    <script src="https://cdn.jsdelivr.net/gh/xtravision-ai/xtravision-js-SDK@1.2.0/xtravision-js-sdk.min.js"> </script>
    ```

   
 2. All required things are available under the `XtraVision` namespace which is available globally after adding JS SDK. 

    ```javascript
    const ReactDOM = XtraVision.ReactDOM;
    const React = XtraVision.React;
    const XtraVisionAssessmentPage = XtraVision.AssessmentPage
    ```
3. Configure all required variable

   ```javascript
    // enter your assessment name here
    const assessment_name = "SQUATS"; 
    // Get Auth Token from Your Server
    const auth_token =  "__AUTH-TOKEN__"; 

    // Put assessment specific configuration. Check documentation for further details
    let assessment_config = {} 
    let user_config = {} 

    // adjust these as per time based assessment requirement 
    assessment_config = {
        reps_threshold: 5,
        grace_time_threshold: 20,
    }
    
    // IMP: handle Xtra-Vision response here
    const onServerResponse = function(response) {
        // Handle server response here. It will call in every second in ideal situation.
        console.log("response", response);
    }
    
    // CSS: which will be applied on video element
    // Write CSS which is compatible for ReactJS
    const videoElementCSS = {
        position: "fixed",
        right: 0,
        bottom: 0,
        minWidth: "100vw",
        minHeight: "100vh"
    }

    // IMP: modify canvas CSS which fit your video element for proper alignment
    const canvasElementCSS = {
      height: "99%",
      width: "65%", 
      transform: "rotateY(180deg)",
      position: "absolute",
      padding:'0 17%'
    };


    // prepare required data object
    const connectionData = {
        assessment_name,
        auth_token,
        assessment_config,
        user_config,
        session_id: null
    }
    const requestData = {
        isPreJoin: false   // if you need to configure education screen then use this, else set to False
    }

    const libData = {
        onServerResponse, 
        videoElementCSS,
        canvasElementCSS,
        isSkeletonEnabled: true // if you need to draw skeleton, else false
    }

    const props = {
        connectionData, 
        requestData,
        libData
    }

    // Render XtraVision React Component
    ReactDOM.render(
        React.createElement(XtraVisionAssessmentPage, props),
        // XtraVisionAssessmentID => id of element
        document.getElementById('XtraVisionAssessmentID') 
    );
   ```

4. Add element to show XtraVision Video

   ```html
   <div id="XtraVisionAssessmentID"></div>
   ```

**IMP**: Once you load script file and do above steps, video automatically start after loading. 


Note: You can get XtraVision server response into callback method `onServerResponse`. Kindly configure it as per your demand

----

### (For Developer) How to convert xtravision-react module to CommonJs/VanillaJS module. 

   1. Clone this repo and install all required dependencies using `yarn install`.  
   2. Build SDK and run demo app using `yarn start:demo`.  
   3. New updatedSDK will be created at root folder with name `xtravision-js-sdk.min.js`   



----


### Known-Issues:
- Skeleton-view does not draw the head
- Skeleton-view sometimes seems to be a bit slow.