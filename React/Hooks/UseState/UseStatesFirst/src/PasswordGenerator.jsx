import React, { useState, useRef, useCallback } from "react";

const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeCharacters, setIncludeCharacters] = useState(true);

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numSet = "0123456789";
    const charSet = "!@#$%^&*()_-+=<>?";

    let finalSet = charset;

    if (includeNumbers) {
      finalSet += numSet;
    }

    if (includeCharacters) {
      finalSet += charSet;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * finalSet.length);
      newPassword += finalSet[randomIndex];
    }

    setPassword(newPassword);
  }, [length, includeNumbers, includeCharacters]);

  const copyToClipboard = () => {
    // console.log(passwordRef.current.select());
    // console.log(document.execCommand("copy"));
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand("copy");
    }
  };

  return (
    <div>
      <label>
        Password Length:
        <input
          type="number"
          value={length}
          onChange={(e) => setLength(e.target.value)}
          min={4}
        />
      </label>
      <br />
      <label>
        Include Numbers:
        <input
          type="checkbox"
          checked={includeNumbers}
          onChange={() => setIncludeNumbers(!includeNumbers)}
        />
      </label>
      <br />
      <label>
        Include Special Characters:
        <input
          type="checkbox"
          checked={includeCharacters}
          onChange={() => setIncludeCharacters(!includeCharacters)}
        />
      </label>
      <br />
      <button onClick={generatePassword}>Generate Password</button>
      <br />
      {password && (
        <>
          <textarea ref={passwordRef} value={password} readOnly />
          <button onClick={copyToClipboard}>Copy to Clipboard</button>
        </>
      )}
    </div>
  );
};

export default PasswordGenerator;