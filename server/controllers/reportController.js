const fs = require("fs");
const Table = require("../models/tableSchema");

const formatDistrobutors = (distrobutors, maxEntries = 5) => {
  const filledEntries = distrobutors.map(
    (distro) => `${distro.DistrobutorName}: ${distro.DistrobutorID}`
  );
  const emptyEntries = Array(maxEntries - filledEntries.length).fill(
    "Unknown Distrobutor: Unknown ID"
  );
  return filledEntries.concat(emptyEntries).join("; ");
};

const formatDocuments = (documents, maxEntries = 10) => {
  const filledEntries = documents.map(
    (doc) => `${doc.DocumentType}: ${doc.DocumentLocation}`
  );
  const emptyEntries = Array(maxEntries - filledEntries.length).fill(
    "Unknown Document: Unknown Location"
  );
  return filledEntries.concat(emptyEntries).join("; ");
};

exports.exportToCSV = async (req, res) => {
  try {
    const tableName = req.session.table;
    const table = await Table.findOne({ name: tableName }).populate("products");

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    const productsData = table.products.map((product) => {
      return {
        ProductID: product.ProductID,
        ProductName: product.ProductName,
        Description: product.Description,
        BuyMake: product.BuyMake,
        Manufacturer: product.Manufacturer,
        ManufacturerID: product.ManufacturerID,
        Distrobutor: formatDistrobutors(product.Distrobutor),
        Document: formatDocuments(product.Document),
        TreeAvailable: product.TreeAvailable,
      };
    });
    const titles =
      "ProductID;Name;Description;BuyMake;Manufacturer;ManufacturerID;DistrobutorName1;DistrobutorID1;DistrobutorName2;DistrobutorID2;DistrobutorName3;DistrobutorID3;DistrobutorName4;DistrobutorID4;DistrobutorName5;DistrobutorID5;DocumentName1;DocumentID1;DocumentName2;DocumentID2;DocumentName3;DocumentID3;DocumentName4;DocumentID4;DocumentName5;DocumentID5;DocumentName6;DocumentID6;DocumentName7;DocumentID7;DocumentName8;DocumentID8;DocumentName9;DocumentID9;DocumentName10;DocumentID10;TreeAvailable\n";
    const csvData = productsData
      .map((product) => {
        return `${product.ProductID};${product.ProductName};${product.Description};${product.BuyMake};${product.Manufacturer};${product.ManufacturerID};${product.Distrobutor};${product.Document};${product.TreeAvailable};`;
      })
      .join("\n");

    fs.writeFile("products.csv", titles + csvData, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to export to CSV" });
      }
      console.log("CSV file created successfully"); 
      // Hi eran :) idk what res.download() does but it works so now i can download the file from the browser.
      return res.download("products.csv");
      return res.status(200).json({ message: "Data exported to CSV file" }); // idk if this needed anymore
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
