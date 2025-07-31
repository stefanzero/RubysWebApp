"use scrict";

//functions for each Menu Item

async function getDrawingRecords() {
  let getResultElement = document.getElementById("drawing");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer pathBADIOjtLtrliZ.79eb3cd8ca485b826778840b03b8a714c7e1b8dc18180bb5f95afb38aebf371d`,
    },
  };

  await fetch(
    `//https://api.airtable.com/v0/app9TUcYzYbLtSc81/Reference%20Links`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);

      getResultElement.innerHTML = "";

      let newHTML = "",

      for (let i=0; i < data.records.length; i++) {
        let name = data.records[i].fields["fldc10uWJMs8Kbwfp"];
        let image = data.records[i].fields["fldls2x0DbFSSZ3A5"];
        let category = data.records[i].fields["fldPP4tFHv24zKqxp"];

        newHtml += `
          <div class="thumb">
            <p><a href="drawing.html"
        `

      }
    })
}

//and then also by category
