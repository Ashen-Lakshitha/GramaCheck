import React, { useEffect, useState } from 'react'
// import "./Login.css"


export default function GramaInt() {

  //  const add = "no.167, Polhena, Madapatha, Piliyandala";

  const [add, setAdd] = useState('');

  const url_get_add = "http://localhost:3000/detailsInt";

  useEffect(() => {
    fetch(url_get_add, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    })
      .then(response => response.json())
      .then(json => {
        console.log("json", json)
        setAdd(json)
      })
      .catch(e => {
        console.log("error", e)
      })
  }, [])

  const [addressInfo, setAddressInfo] = useState({
    line1: "",
    line2: "",
    line3: ""
  });

  const handleChange = (event) => {
    setAddressInfo({ ...addressInfo, [event.target.name]: event.target.value });
  };

  const url_post_add = "";
  const handleSubmit = (event) => {
    event.preventDefault();
    //    console.log(addressInfo);

    fetch(url_post_add, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "applicatyion/json"
      },
      body: JSON.stringify(addressInfo)
      //   }).then((result) => {
      //   result.json().then((resp) => {
      //     console.warn("response", resp)
      // })  
    })
  };

  return (
    <div>
      <div className="container">
        <div className="form">
          <div className="content">

            <div className="div2">
              <label>ID check</label>
              <div className="div1">

              </div>
            </div>

            <div className="div2">
              <label>Address check</label>
              <div className="div1">

                <div>
                  <p>Applicant Address:</p>
                  <p>{add}</p>
                </div>

                <hr />

                <p>Check and confirm applicant address physically <input type="checkbox" /></p>

                <hr />

                <div>
                  <p>Enter applicant address for check database:</p>

                  <form onSubmit={handleSubmit}>
                    <input type='text' name='line1' placeholder='Line1' onChange={handleChange} className="line" />
                    <input type='text' name='line2' placeholder='Line2' onChange={handleChange} className="line" />
                    <input type='text' name='line3' placeholder='Line3' onChange={handleChange} className="line" />
                    <br />
                    <button className="submitbtn1">Check address</button>

                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
