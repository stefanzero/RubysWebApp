"use scrict";

//constants
const token = `pathBADIOjtLtrliZ.79eb3cd8ca485b826778840b03b8a714c7e1b8dc18180bb5f95afb38aebf371d`;
const baseId = "app9TUcYzYbLtSc81";
const tableId = "tblQjuvCaEFjawQYE";

function getAllQueryParams() {
  const params = new URLSearchParams(window.location.search);
  const queryParams = {};
  for (const [key, value] of params.entries()) {
    queryParams[key] = value;
  }
  return queryParams;
}
const fetchTable = async (baseId, tableId, token) => {
  console.log("fetchTable");
  let response;
  try {
    response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(JSON.stringify(data.records, null, 2));
    return data;
  } catch (error) {
    console.error("Error fetching table:", error);
  }
};

const filterData = (data, subject, category) => {
  const filteredData = data.records.filter((record) => {
    return (
      record.fields.Subject.toLowerCase() === subject &&
      record.fields.Category.toLowerCase() === category
    );
  });
  return filteredData;
};

const renderDrawings = (rows, category) => {
  let innerHTML = "";
  /*
	best practice to change field (column) names to "snake_case"
	Name -> name
	Additional Info -> additional_info
	*/
  rows.forEach((row) => {
    const article = `
	  <article>
	    <h2>${row.fields["Name"]}</h2>
	    <p>${row.fields["Additional Info"]}</p>
	  </article>`;
    innerHTML += article;
  });
  return innerHTML;
};

const renderGeneral = (rows, category) => {};

const renderWorldbuilding = (rows, category) => {};

//main function
document.addEventListener("DOMContentLoaded", async () => {
  const queryParams = getAllQueryParams();
  console.log(`queryParams: ${queryParams}`);

  if (queryParams.subject && queryParams.category) {
    const subject = queryParams.subject;
    const category = queryParams.category;
    const data = await fetchTable(baseId, tableId, token);
    const filteredData = filterData(data, subject, category);
    const container = document.getElementById("container");
    let innerHTML = "";
    switch (subject) {
      case "drawing":
        innerHTML = renderDrawings(filteredData, category);
        break;
      case "general":
        innerHTML = renderGeneral(filteredData, category);
        break;
      case "worldbuilding":
        innerHTML = renderWorldbuilding(filteredData, category);
        break;
    }
    container.innerHTML = innerHTML;
  }
});

class Grid {
  constructor(title, thumb, type) {
    this.title = title;
    this.thumb = thumb;
    this.type = type;
  }
}

let gridItems = [];

const getAllData = async () => {
  const apiKey = `pathBADIOjtLtrliZ.79eb3cd8ca485b826778840b03b8a714c7e1b8dc18180bb5f95afb38aebf371d`;
  // const baseId = `tblQjuvCaEFjawQYE`;
  const baseId = "app9TUcYzYbLtSc81";
  // const tableName = `Reference Links`;
  const tableName = "tblQjuvCaEFjawQYE";

  const url = `https://api.airtable.com/v0/${baseId}/${tableName}`;
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Failed to fetch data from Airtable.");
    }

    const data = await response.json();
    if (!data.records) {
      throw new Error("Failed to fetch data from Airtable.");
    }

    // const container = document.getElementById("drawing");
    const container = document.getElementById("Data");

    let content = "";

    // const record = data.records[0];
    for (const record of data.records) {
      const name = record.fields.name || "Title not available";
      const thumb = record.fields.fldls2x0DbFSSZ3A5 || "Image not available";
      const type = record.fields.type || "Type not available";

      //get image url
      const thumbUrl = thumb ? thumb : record.fields.fldls2x0DbFSSZ3A5[0]?.url;

      content += `
				<div>
					<h3>${name}</h3>
					<img src="${thumbUrl}" />
					<p>${type}</p>
				</div>
			`;
    }

    container.innerHTML = content;
  } catch (error) {
    console.log("Error:", error);
    container.innerHTML =
      "<p>Failed to fetch data. Please try again later.</p>";
  }
};

// getAllData();

/* Old code that I have no idea if it works. didn't for me but its incomplete

async function getAllRecords() {
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
        let thumb = data.records[i].fields["fldls2x0DbFSSZ3A5"];
        let category = data.records[i].fields["fldPP4tFHv24zKqxp"];

        newHtml += `
          <div class="thumb">
            <p><a href="drawing.html"
        `

      }
    })
}

*/
