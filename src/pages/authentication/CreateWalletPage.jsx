import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import PasswordInput from "../../components/inputs/PasswordInput";

function CreateWalletPage() {
  const totalWords = 12;
  const [recoveryPhrase, setRecoveryPhrase] = useState([]);
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(1);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  useEffect(() => {
    generateRecoveryPhrase();
  }, []);

  const generateRandomPhrase = () => {
    const phraseOptions = [
      "apple",
      "banana",
      "cat",
      "dog",
      "elephant",
      "fish",
      "grape",
      "horse",
      "iguana",
      "jellyfish",
      "koala",
      "lion",
    ];
    const randomWords = Array.from({ length: totalWords }, () => {
      const randomIndex = Math.floor(Math.random() * phraseOptions.length);
      return phraseOptions[randomIndex];
    });
    return randomWords;
  };

  const generateRecoveryPhrase = () => {
    const randomWords = generateRandomPhrase();
    setRecoveryPhrase(randomWords);
    setCopied(false);
  };

  const copyToClipboard = () => {
    const phraseToCopy = recoveryPhrase.join(" ");
    navigator.clipboard
      .writeText(phraseToCopy)
      .then(() => setCopied(true))
      .catch((error) => console.error("Error copying to clipboard:", error));
  };

  const pasteToClipboard = () => {
    navigator.clipboard.readText().then((text) => {
      const words = text.split(" ");
      const inputs = document.querySelectorAll('input[type="text"]');
      inputs.forEach((input, index) => {
        if (words[index]) {
          input.value = words[index];
        }
      });
    });
  };

  const downloadRecoveryPhrase = () => {
    const phraseToDownload = recoveryPhrase.join(" ");
    const element = document.createElement("a");
    const file = new Blob([phraseToDownload], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "recovery_phrase.txt";
    document.body.appendChild(element);
    element.click();
  };

  const uploadRecoveryPhrase = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const words = text.split(" ");
      const inputs = document.querySelectorAll('input[type="text"]');
      inputs.forEach((input, index) => {
        if (words[index]) {
          input.value = words[index];
        }
      });
    };
    reader.readAsText(file);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleNext = () => {
    setCopied(false);
    setStep(step + 1);
  };

  const compareInputs = () => {
    const inputs = document.querySelectorAll('input[type="text"]');
    const userWords = Array.from(inputs).map((input) => input.value);

    const match = userWords.every(
      (word, index) => word === recoveryPhrase[index]
    );

    if (match) {
      setStep(step + 1);
    } else {
      alert("Las palabras no coinciden con la frase de recuperación.");
    }
  };

  const compareValues = () => {
    const passwordValue = passwordRef.current.getValue();
    const confirmPasswordValue = confirmPasswordRef.current.getValue();

    if (passwordValue === confirmPasswordValue) {
      alert("Passwords match!");
    } else {
      alert("Passwords do not match!");
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div
        className=" my-6 p-6 rounded-xl shadow-md bg-white"
        style={{ width: "400px" }}
      >
        <h1 className="text-center rounded-xl text-4xl font-bold select-none">
          Create Wallet
        </h1>
        <h2 className="my-3 text-center text-2xl font-bold select-none">
          Step {step} of 3:
        </h2>

        {/* Start div cambiante */}
        {step === 1 && (
          <>
            <p className="text-center select-none">
              Write down your recovery phrase. You'll need it in the next step.
            </p>

            <div className="my-3 p-4 flex flex-col justify-center rounded-md bg-gray-200">
              <button
                className="p-2 border border-indigo-600 rounded-xl font-semibold select-none text-indigo-600 hover:text-indigo-800"
                onClick={generateRecoveryPhrase}
              >
                Generate New Recovery Phrase
              </button>
              <hr className="border-t-2 border-white my-4" />

              <div className="grid grid-cols-3 gap-3">
                {recoveryPhrase.map((word, index) => (
                  <div className="flex">
                    <p className="select-none">{index + 1}.&nbsp;</p>
                    <p className="font-semibold">{word}</p>
                  </div>
                ))}
              </div>

              <hr className="border-t-2 border-white my-4" />

              <div className="col-span-3 flex justify-around select-none">
                <button
                  className="font-bold p-2 rounded-md border border-white bg-indigo-100 hover:bg-indigo-300 text-indigo-600"
                  style={{ width: "120px" }}
                  onClick={copyToClipboard}
                >
                  {copied ? "Copied" : "Copy Phrase"}
                </button>
                <button
                  className="font-bold p-2 rounded-md border border-white bg-indigo-100 hover:bg-indigo-300 text-indigo-600"
                  style={{ width: "120px" }}
                  onClick={downloadRecoveryPhrase}
                >
                  Download
                </button>
              </div>
            </div>

            <div className="mt-2 flex justify-evenly select-nsone bg-white">
              <Link className="p-2 rounded-xl border border-indigo-500" to="/">
                Back
              </Link>
              <button
                className="p-2 rounded-xl bg-indigo-500 text-white"
                onClick={handleNext}
              >
                Next Step
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-center select-none">
              Confirm your recovery phrase This is to verify that you have the
              recovery phrase in a safe place
            </p>

            <div className="my-3 p-4 flex flex-col justify-center rounded-md bg-gray-200">
              <div className="col-span-3 flex justify-around select-none">
                <button
                  className="font-bold p-2 rounded-md border border-white bg-indigo-100 hover:bg-indigo-300 text-indigo-600"
                  style={{ width: "120px" }}
                  onClick={pasteToClipboard}
                >
                  Paste Phrase
                </button>
                <label
                  className="p-2 font-bold text-center rounded-md border border-white bg-indigo-100 hover:bg-indigo-300 text-indigo-600"
                  style={{ width: "120px" }}
                  htmlFor="fileInput"
                >
                  Upload
                </label>
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  onChange={uploadRecoveryPhrase}
                />
              </div>

              <hr className="border-t-2 border-white my-4" />

              <div className="grid grid-cols-3 gap-2">
                {Array.from({ length: totalWords }).map((_, index) => (
                  <div key={index} className="flex justify-between">
                    <label
                      htmlFor={`word-${index + 1}`}
                      className="w-8 select-none"
                    >
                      {index + 1}.
                    </label>
                    <input
                      type="text"
                      id={`word-${index + 1}`}
                      className=" p-1 font-semibold border-b border-gray-400 focus:outline-none focus:border-indigo-500 w-full"
                      placeholder={`Word ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-2 flex justify-evenly select-nsone bg-white">
              <button
                className="p-2 rounded-xl border border-indigo-500"
                onClick={handlePrevious}
              >
                Back
              </button>
              <button
                className="p-2 rounded-xl bg-indigo-500 text-white"
                onClick={compareInputs}
              >
                Next Step
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <p className="text-center select-none">
              Set a passcode for your wallet
            </p>

            <div className="my-3 p-4 flex flex-col justify-center rounded-md bg-gray-200">
              <PasswordInput
                ref={passwordRef}
                label="Password"
                placeholder="Enter your password"
                validateRegex={true}
              />
              <PasswordInput
                ref={confirmPasswordRef}
                label="Confirm Password"
                placeholder="Confirm your password"
              />
            </div>

            <div className="mt-2 flex justify-evenly select-nsone bg-white">
              <button
                className="p-2 rounded-xl border border-indigo-500"
                onClick={handlePrevious}
              >
                Back
              </button>
              <button
                className="p-2 rounded-xl bg-indigo-500 text-white"
                onClick={compareValues}
              >
                Create Wallet
              </button>
            </div>
          </>
        )}
        {/* End div cambiante */}
      </div>

      <div className="select-none">
        Already have a wallet?{" "}
        <Link
          to="/accesswallet"
          className="underline font-bold text-indigo-500 hover:text-indigo-800"
        >
          Access it here
        </Link>
      </div>
    </main>
  );
}

export default CreateWalletPage;
