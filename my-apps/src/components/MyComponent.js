import React, { useState, useEffect } from "react";
import { message } from 'antd';



function RegistrationPage() {
  
  const [dept_name, setDept_name] = useState("");
  const [emp_Name, setEmp_Name] = useState("");
  const [role, setRole] = useState("");
  const [dept_Id, setDept_Id] = useState("");
  const [branch, setBranch] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [doj, setDoj] = useState("");
  const [dob, setDob] = useState('');
  const [age, setAge] = useState('');


  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    setAge(age);
  };

  const handleDateChange = (e) => {
    setDob(e.target.value);
    calculateAge(e.target.value);
  };


  const [autoCode, setAutoCode] = useState('');

  const emplo = () => {
    const firstChar = emp_Name.charAt(0).toUpperCase();
    const storedCode = localStorage.getItem("lastCode");
  
   
    let lastCode = 0;
    if (storedCode) {

      lastCode = parseInt(storedCode);
    }
    const codeNumber = (lastCode + 1).toString().padStart(3, '0');
    const code = `${firstChar}${codeNumber}`;
    setAutoCode(code);
    localStorage.setItem("lastCode", codeNumber);
  };


  useEffect(() => {
    const emp_Code = localStorage.getItem('emp_Code');
    if (emp_Code) {
      message.warning(`Successfully Submitted...! Your receipt number is: ${emp_Code}`);
      localStorage.removeItem('emp_Code'); // Remove the receipt number from local storage
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('emp_Code',autoCode)
    const firstChar = emp_Name.charAt(0).toUpperCase();
    const storedCode = localStorage.getItem("lastCode");
    let lastCode = 0;
    if (storedCode) {
      lastCode = parseInt(storedCode);
    }
    const codeNumber = (lastCode + 1).toString().padStart(3, '0');
    const code = `${firstChar}${codeNumber}`;
    setAutoCode(code);
    localStorage.setItem("lastCode", codeNumber);
    const data = {
      dept_name,emp_Name,role,emp_Code:autoCode,dept_Id,dob,branch,mobile,email,doj
    };


   
    //for data inputnpm

    fetch("http://localhost:8778/employee/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  const handleClearClick = () => {
    window.location.reload(); // Reload the page when the button is clicked
  };
  
  return (

  
    <main style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  <h1 style={{ textAlign: "center", margin: "2rem 0" }}>Employee Registration</h1>

  <div style={{ width: "50%" }}>
    <form onSubmit={handleSubmit}>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="emp-name" style={{ display: "block" }}>Employee Name:</label>
        <input
          type="text"
          id="emp-name"
          className="form-control"
          value={emp_Name}
          onChange={(e) => setEmp_Name(e.target.value)}
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="role" style={{ display: "block" }}>Employee Role:</label>
        <input
          type="text"
          id="role"
          className="form-control"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="dob" style={{ display: "block" }}>Date Of Birth:</label>
        <input
          type="date"
          id="dob"
          className="form-control"
          value={dob}
          onChange={handleDateChange}
          style={{ width: "100%", padding: "0.5rem" }}
        />
        {age && <p>Your age is: {age}</p>}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="mobile" style={{ display: "block" }}>Contact Number:</label>
        <input
          type="text"
          id="mobile"
          className="form-control"
          onChange={(e) => setMobile(e.target.value)}
          value={mobile}
          name="mobile"
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="email" style={{ display: "block" }}>Email Id:</label>
        <input
          type="email"
          id="email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          name="email"
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="dept-id" style={{ display: "block" }}>Department Id:</label>
        <input
          type="text"
          id="dept-id"
          className="form-control"
          onChange={(e) => setDept_Id(e.target.value)}
          value={dept_Id}
          name="dept_id"
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="dept-name" style={{ display: "block" }}>Department Name:</label>
        <input
          type="text"
          id="dept-name"
          className="form-control"
          onChange={(e) => setDept_name(e.target.value)}
          value={dept_name}
          name="dept_name"
          />
        </div>

        <div>
        Date Of Joining: <input style={{textAlign:"center"}}
            type="date"
            className="form-control"
            onChange={(e) => setDoj(e.target.value)}
            value={doj}
            name="DOJ"
          />
        </div>

        <div>
        Branch: <select
            type="Branch"
            className="form-control"
            onChange={(e) => setBranch(e.target.value)}
            value={branch}
            name="Branch">
            <option>-select-</option>
            <option>Chennai</option>
            <option>Delhi</option>
            <option>Mumbai</option>
            <option>Kolkata</option>
            </select>
        </div>

        {/* to view data */}


        
        <button type="submit">Register</button>
        <button onClick={handleClearClick} >Clear</button>
      </form>
    </div>
    </main>
    
  
  );
}

export default RegistrationPage

