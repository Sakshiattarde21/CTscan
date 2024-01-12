'use client';
import { useState } from 'react';

export default function Home() {
  const [data, setData] = useState('');
  const [result, setResult] = useState(null);
  const [msg, setMsg] = useState('Check Toxicity');

 async function query(data) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/Hate-speech-CNERG/indic-abusive-allInOne-MuRIL",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer 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",
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    const resul = await response.json();


    if (resul[0][0].label && resul[0][0].score) {
setResult(
  <div>
    Toxicity Label: {resul[0][0].label}, Score: {resul[0][0].score.toFixed(5)} <br />
    Toxicity Label: {resul[0][1].label}, Score: {resul[0][1].score.toFixed(5)}
  </div>
);

    } else {
      setResult("Undefined Result");
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

  const handleChange = (event) => {
    setData(event.target.value);
  };

  const handleClick = async () => {
    setResult("Loading");
    setMsg("Checking Toxicity ...");

    try {
      await query(data);
    } catch (err) {
      console.log(err);
    }

    setMsg("Check Toxicity");
  };

  const submitForm = async () => {
    try {
      setResult("Loading");
      setMsg("Checking Toxicity ...");

      await query(data);

      setMsg("Check Toxicity");
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
      <div className='flex justify-center mt-8'>
        <div className='text-4xl font-bold'>Comment Toxicity Detector</div>
      </div>
      <div className="flex flex-row items-center justify-around h-screen align-center -mt-12">
        <div className="flex flex-col items-center w-full">
          <textarea
            id="textInput"
            className="w-3/4 h-96 border p-2 rounded-lg text-black"
            placeholder="Enter text"
            onChange={handleChange}
          ></textarea>

          <button
            className="mt-4 p-3 bg-teal-800 text-white rounded-md bttn"
            onClick={submitForm}
            disabled={msg === "Checking Toxicity ..."}
          >
            {msg}
          </button>
        </div>

        <div className='flex flex-row justify-center w-full text-white'>
          <div>
            {result === "Loading" ? (
              <div className='cssload-loader'>
                <div className='cssload-inner cssload-one'></div>
                <div className='cssload-inner cssload-two'></div>
                <div className='cssload-inner cssload-three'></div>
              </div>
            ) : (
              result
            )}
          </div>
        </div>
      </div>
    </>
  );
}
