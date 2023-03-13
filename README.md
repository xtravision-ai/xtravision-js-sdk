# xtravision-js-sdk


Using browserify module, we have converted `@xtravision/xtravision-react` module to a browser friendly version of the CommonJS module.

## 1. How to use JS-SDK in any web-page?  (documentation in-progress) 
 (See `demo-app` for reference )  
 ### 1.1 Setup ###
 - Load JS-SDK with absolute path.
    ```javascript
    <script src="/xtravision-js-sdk.js"> </script>
    ```

 - All required things are available under the `XtraVision` namespace which is available globally after adding JS SDK. 
    ```javascript
    const ReactDOM = XtraVision.ReactDOM;
    const React = XtraVision.React;
    const XtraVisionAssessmentPage = XtraVision.AssessmentPage
    ```
### 1.2 Configuration  (TODO) ###
- (TODO)

## 2. How to convert xtravision-react module to CommonJs/VanillaJS module. 
2.1. Clone this repo and install all required dependencies using `yarn install`.  
2.2. Build SDK using `yarn build:sdk`.  
2.3. New updatedSDK will be created at `demo-app` folder with name `xtravision-js-sdk.js`   