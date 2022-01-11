import React from "react";
import "./index.css";
import { ScrollRotate } from "react-scroll-rotate";

const AboutMeApp = () => {
  /*

  * FUNCTIONS

  */
    // const Animation = () => (
    //   <ScrollAnimation animateBounce="bounceIn">
    //     <p>Textb</p>
    //   </ScrollAnimation>
    // );
    return (
      <div className="wrapinfocard">
        <div className="aboutMeInfoWrapper mob-ov-hid">
          <div className="aboutMeInfo mob-ov-hid">
            <ul>
              <li>
                <b>About me</b>
              </li>
              <li className="AMwrapper">
                <div className="AMtitle">Student</div>
                <div className="AMinfo">Studying in SPŠ Electrotechnical in Olomouc in ČR</div>

              </li>
              <li className="AMwrapper">
                <div className="AMtitle">Programmer</div>
                <div className="AMinfo">Programing &amp; coding for almost 3 years</div></li>
            </ul>
          </div>
        </div>
        <ScrollRotate
          from={0}
          to={40}
          animationDuration={0.2}
          method={"perc"}
          loops={0}
        >
          <div className="aboutMeInfoBackcard2 ov-hid"></div>
        </ScrollRotate>

        <ScrollRotate
          from={0}
          to={60}
          animationDuration={0.2}
          method={"perc"}
          loops={0}
        >
          <div className="aboutMeInfoBackcard ov-hid"></div>
        </ScrollRotate>
      </div>
    );
  }

export default AboutMeApp;
