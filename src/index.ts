import axios from "axios";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

const pageSize = 25;

app.get("/", async (_: Request, res: Response) => {
  if (process.env.NODE_ENV === "production") {
    console.log("Please run this script in development mode");
    return res.send("Please run this script in development mode");
  }

  let currentPage = 1;

  console.log("Fetching data from API");

  const response = await axios.get(
    `${process.env.BASE_URL}/api/ivf-centers?&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}&populate=*`,
    {
      headers: {
        Authorization: "Bearer " + process.env.TOKEN,
      },
    }
  );

  const data = response?.data?.data;

  const metaData = response?.data?.meta;

  const totalPages = metaData?.pagination?.total;

  const numberOfRounds = Math.ceil(totalPages / pageSize);

  const totalData = [...data];

  console.log("Fetching data from API from first page");

  while (currentPage <= numberOfRounds) {
    currentPage++;
    const response = await axios.get(
      `${process.env.BASE_URL}/api/ivf-centers?&pagination[page]=${currentPage}&pagination[pageSize]=${pageSize}&populate=*`,
      {
        headers: {
          Authorization: "Bearer " + process.env.TOKEN,
        },
      }
    );
    const data = response?.data?.data;

    console.log(`Fetching data from API from page ${currentPage}`);
    totalData.push(...data);
  }

  console.log("Data fetched successfully");

  const allCity = [
    ...new Set(totalData.map((e) => e.attributes.city.data.attributes.name)),
  ];

  // write xml in public folder
  const updatedResponse = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allCity
        .map((city) => {
          return `
          <url>
            <loc>https://gynoveda.com/pages/ivf-centers/${city.toLowerCase()}</loc>
          </url>
        `;
        })
        .join("")}
    </urlset>`;

  // write xml in public folder

  // create public folder if not exist
  if (!fs.existsSync("./public")) {
    fs.mkdirSync("./public");
  }

  fs.writeFileSync("./public/sitemap.xml", updatedResponse, {});

  // sitemap
  res.send(`done`);
});

app.get("/sitemap.xml", (req, res) => {
  return res.sendFile(
    path.join(__dirname, "..", "./public/sitemap.xml"),
    {},
    (err) => {
      if (err) {
        res.status(404).send("File not found");
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
