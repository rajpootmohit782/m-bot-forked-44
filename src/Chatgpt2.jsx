import { useState } from "react";

import "./styles.css";

function ChatGPT() {
  const apiUrl = "process.env.REACT_APP_API_URL";
  const aaa = "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";

  console.log(apiUrl);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello from MohiT! How can I help you today? ***Imp-otification: Takes 1minutes , if no answer provider re-search it***",
    },
  ]);

  const [inputValue, setInputValue] = useState("");

  const handleUserInput = async () => {
    const formattedInput = inputValue
      .trim()
      .split("\n")
      .map((line, index) => (
        <div key={index} className="message user">
          {line}
        </div>
      ));
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: formattedInput },
    ]);
    setInputValue("");

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${aaa}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: inputValue }],
      }),
    });

    const data = await response.json();
    console.log(data);
    const output = data.choices[0].message.content;
    const formattedOutput = output.split("\n").map((line, index) => (
      <div key={index} className="message assistant">
        {line}
      </div>
    ));
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "assistant", content: formattedOutput },
    ]);
  };

  return (
    <div>
      <div className="chat-container">
        <div className="chat-history">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.role}`}>
              {message.content}
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleUserInput();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ChatGPT;

// import { useState } from "react";
// //import Homepage from "./Header";
// import Header from "./Header";
// import "./styles.css";
// function ChatGPT() {
//   const [messages, setMessages] = useState([
//     {
//       role: "assistant",
//       content: "Hello from MohiT ! How can I help you today?"
//     }
//   ]);
//   const [messages1, setMessages1] = useState([
//     {
//       role: "assistant",
//       content: "Hello1 from MohiT ! How can I help you today?"
//     }
//   ]);

//   const handleUserInput = async (text) => {
//     const formattedOutput1 = text.split("\n").map((line, index) => (
//       <div key={index} className="message assistant">
//         {line}
//       </div>
//     ));
//     setMessages([...messages, { role: "user", content: formattedOutput1 }]);
//     setMessages1([...messages1, { role: "user", content: formattedOutput1 }]);

//     const response = await fetch("https://api.openai.com/v1/chat/completions", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer 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`
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         messages: [{ role: "user", content: text }]
//       })
//     });

//     //   const data = await response.json();
//     //   console.log(data.choices[0].message);
//     //   setMessages([
//     //     ...messages,
//     //     { role: "assistant", content: data.choices[0].message.content }
//     //   ]);
//     // };

//     const data = await response.json();
//     console.log(data);
//     const output = data.choices[0].message.content;
//     console.log(output);
//     const formattedOutput = output.split("\n").map((line, index) => (
//       <div key={index} className="message assistant">
//         {line}
//       </div>
//     ));
//     setMessages1([
//       ...messages1,
//       { role: "assistant", content: formattedOutput }
//     ]);
//   };

//   console.log(messages);
//   return (
//     <div>
//       <div className="chat-container">
//         <div className="chat-history">
//           {messages1.map((message, index) => (
//             <div key={index} className={`message ${message.role}`}>
//               {message.content}
//             </div>
//           ))}
//         </div>
//         <div className="chat-input">
//           <input
//             type="text"
//             placeholder="Type a message..."
//             onKeyPress={(event) => {
//               if (event.key === "Enter") {
//                 handleUserInput(event.target.value);
//                 event.target.value = "";
//               }
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ChatGPT;
