import React from "react";
import { useState } from "react"

function TextTOSpeech() {
    function speak() {
        const speech = new SpeechSynthesisUtterance();
        const textElements = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, span, li, td, th, label, button, a, input[type='button'], input[type='submit'], input[type='reset'], [aria-label]");
        const text = Array.from(textElements).map(el => el.innerText).join(". ");
        speech.text = text;
        speech.lang = "en-US";
        window.speechSynthesis.speak(speech);
      }

  return (
        <button className = 'btn-dark' onClick={speak}>Text-To-Speech!</button>
  )
}

export default TextTOSpeech