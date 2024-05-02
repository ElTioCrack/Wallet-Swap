import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function CreateWalletPage() {
  const totalWords = 12;
  const [recoveryPhrase, setRecoveryPhrase] = useState([]);
  const [copied, setCopied] = useState(false);
  const [step, setStep] = useState(1);

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

  const downloadRecoveryPhrase = () => {
    const phraseToDownload = recoveryPhrase.join(" ");
    const element = document.createElement("a");
    const file = new Blob([phraseToDownload], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "recovery_phrase.txt";
    document.body.appendChild(element);
    element.click();
  };

  const handleConfirm = () => {
    alert("Recovery phrase confirmed:", recoveryPhrase);
    console.log("Recovery phrase confirmed:", recoveryPhrase);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Wallet</h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-center select-none">Step {step} of 3:</h2>
        <div>
          <p className="text-gray-700 mb-4 select-none">
            Write down your recovery phrase. You'll need it in the next step.
          </p>

          <div className="bg-gray-200 p-4 rounded-md mb-4 grid grid-cols-3 gap-4 ">
            {recoveryPhrase.map((word, index) => (
              <div key={index} className="flex text-sm text-gray-600">
                <p className="select-none">{index + 1}.&nbsp;</p>
                <p>{word}</p>
              </div>
            ))}
          </div>

          <div className="select-none">
            <div className="flex justify-center my-3">
              <button
                className="text-sm font-semibold text-indigo-600 border border-indigo-600 hover:text-indigo-800 hover:border-indigo-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
                onClick={generateRecoveryPhrase}
              >
                Generate New Recovery Phrase
              </button>
            </div>
            <div className="flex justify-between items-center mb-4">
              <button
                className="bg-indigo-100 text-indigo-600 font-bold py-2 px-4 rounded-md mr-2 focus:outline-none hover:bg-indigo-300"
                onClick={copyToClipboard}
                style={{ width: "130px" }}
              >
                {copied ? "Copied" : "Copy Phrase"}
              </button>
              <button
                className="bg-indigo-100 text-indigo-600 font-bold py-2 px-4 rounded-md mr-2 focus:outline-none hover:bg-indigo-300"
                onClick={downloadRecoveryPhrase}
                style={{ width: "130px" }}
              >
                Download
              </button>
            </div>
          </div>
        </div>
        <button
          className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-md w-full focus:outline-none hover:bg-indigo-800 select-none"
          onClick={handleConfirm}
        >
          Confirm
        </button>
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
    </div>
  );
}

export default CreateWalletPage;
