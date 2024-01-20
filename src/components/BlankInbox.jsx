import React from "react";
import Lottie from "lottie-react";
import BlankInboxAnimation from "../assets/blankinbox.json";
import { useLottie } from "lottie-react";
function BlankInbox() {
  const style = {
    height: 320,
  };
  const options = {
    animationData: BlankInboxAnimation,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options, style);
  return View;
}

export default BlankInbox;
