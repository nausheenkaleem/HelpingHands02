import React from "react";
import "./RegistrationModal.css";

export const SignupOption = () => {
  return (
    <div>
      <form id="msform">
        <span>Already a user? </span>
        <br />
        <span>
          <a href="/login">Sign In </a>
        </span>
        <fieldset>
          <h2 className="fs-title">Willing to help?</h2>
          <a href="/donorRegister">
            <input
              type="button"
              name="next"
              className="next action-button"
              value="Sign-up here"
            ></input>
          </a>

          
          <h2 className="fs-title">Looking for help?</h2>
          <a href="/lookingindividualsignupstep1">
            <input
              type="button"
              name="next"
              className="next action-button"
              value="Sign-Up here"
            ></input>
          </a>
         
        </fieldset>
      </form>
    </div>
  );
};
